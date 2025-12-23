import { createStore } from './utils/store.js';
import { gardenReducer, initialState } from './core/reducer.js';
import { renderGarden } from './ui/render.js';

const app = document.getElementById('app');

const playSound = (name) => {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Brak pliku audio lub blokada:", e));
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('my_garden_state_v2');
        if (serializedState === null) return initialState;
        return JSON.parse(serializedState);
    } catch (err) { return initialState; }
};

const store = createStore(gardenReducer, loadState());

let prevBadgesLength = 0;

store.subscribe(() => {
    const state = store.getState();
    app.innerHTML = renderGarden(state);
    
    localStorage.setItem('my_garden_state_v2', JSON.stringify(state));

    if (state.badges.length > prevBadgesLength) {
        playSound('win');
        alert("🏆 Zdobyto nową odznakę! Sprawdź panel.");
        prevBadgesLength = state.badges.length;
    }
});

setInterval(() => {
    store.dispatch({ type: 'TICK' });
}, 3000);

setInterval(() => {
    store.dispatch({ type: 'CHANGE_WEATHER' });
}, 15000);

document.body.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('btn-seed')) {
        store.dispatch({ type: 'SELECT_SEED', payload: target.dataset.type });
    }

    if (target.id === 'btn-plant-action') {
        const state = store.getState();
        const config = state.seedTypes.find(t => t.type === state.selectedSeed);
        if (config) {
            playSound('dig');
            store.dispatch({ type: 'PLANT_SEED', config });
        }
    }

    if (target.id === 'btn-create-species') {
        const nameInput = document.getElementById('new-plant-name');
        const thirstInput = document.getElementById('new-plant-thirst');
        const growthInput = document.getElementById('new-plant-growth');
        if (nameInput.value) {
            store.dispatch({
                type: 'ADD_NEW_SPECIES',
                payload: {
                    name: nameInput.value,
                    thirst: thirstInput.value || 2,
                    growth: growthInput.value || 3
                }
            });
            nameInput.value = '';
        }
    }

    if (target.classList.contains('btn-water')) {
        const id = parseInt(target.dataset.id);
        playSound('water');
        store.dispatch({ type: 'WATER_PLANT', id });
    }

    if (target.classList.contains('btn-remove')) {
        const id = parseInt(target.dataset.id);
        store.dispatch({ type: 'REMOVE_PLANT', id });
    }
});

prevBadgesLength = loadState().badges?.length || 0;
store.dispatch({ type: 'INIT' });
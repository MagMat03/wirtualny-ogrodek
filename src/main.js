import { createStore } from './utils/store.js';
import { gardenReducer, initialState } from './core/reducer.js';
import { AppView } from './ui/view.js';
import { saveState, loadState } from './effects/storage.js';
import { playSound, checkSoundEffect } from './effects/sound.js';
import { startTicker } from './effects/ticker.js';

const appContainer = document.getElementById('app');

const store = createStore(gardenReducer, loadState(initialState));
let prevBadgesCount = store.getState().badges.length;

store.subscribe(() => {
    const state = store.getState();
    appContainer.innerHTML = AppView(state);
});

store.subscribe(() => {
    const state = store.getState();
    
    saveState(state);

    if (state.badges.length > prevBadgesCount) {
        playSound('win');
        alert("🏆 Nowa odznaka!");
        prevBadgesCount = state.badges.length;
    }
});

startTicker(store.dispatch);

document.body.addEventListener('click', (e) => {
    const { target } = e;
    const { id, dataset, classList } = target;

    const dispatch = (action) => {
        store.dispatch(action);
        checkSoundEffect(action.type);
    };

    if (classList.contains('btn-seed')) {
        dispatch({ type: 'SELECT_SEED', payload: dataset.type });
    }
    
    if (id === 'btn-plant-action') {
        const state = store.getState();
        const config = state.seedTypes.find(t => t.type === state.selectedSeed);
        if (config) dispatch({ type: 'PLANT_SEED', config });
    }

    if (classList.contains('btn-water')) {
        dispatch({ type: 'WATER_PLANT', id: parseInt(dataset.id) });
    }

    if (classList.contains('btn-remove')) {
        dispatch({ type: 'REMOVE_PLANT', id: parseInt(dataset.id) });
    }

    if (id === 'btn-create-species') {
        const name = document.getElementById('new-plant-name').value;
        const thirst = document.getElementById('new-plant-thirst').value;
        const growth = document.getElementById('new-plant-growth').value;
        
        if (name) {
            dispatch({ 
                type: 'ADD_NEW_SPECIES', 
                payload: { name, thirst: thirst || 2, growth: growth || 3 } 
            });
            document.getElementById('new-plant-name').value = '';
        }
    }
});

store.dispatch({ type: 'INIT' });
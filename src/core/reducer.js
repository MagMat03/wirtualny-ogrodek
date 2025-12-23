import { processPlantTick, checkAchievements } from './logic.js';
import { plantTypes as defaultPlants } from '../data/plants.js';

export const initialState = {
    plants: [],
    selectedSeed: 'kaktus',
    seedTypes: [...defaultPlants],
    
    weather: 'cloudy',
    stats: {
        totalWatered: 0,
    },
    badges: []
};

export const gardenReducer = (state, action) => {
    let newState = state;

    switch (action.type) {
        case 'SELECT_SEED':
            return { ...state, selectedSeed: action.payload };

        case 'PLANT_SEED':
            const config = state.seedTypes.find(t => t.type === state.selectedSeed);
            const newPlant = {
                id: Date.now(),
                config: config, 
                water: 10,
                growth: 0,
                stage: '🌱',
                isDead: false,
                status: 'Zasadzona'
            };
            newState = { ...state, plants: [...state.plants, newPlant] };
            break;

        case 'ADD_NEW_SPECIES':
            const newSpecies = {
                type: `custom_${Date.now()}`,
                name: action.payload.name,
                thirstRate: parseInt(action.payload.thirst),
                growSpeed: parseInt(action.payload.growth),
                maxWater: 20
            };
            return {
                ...state,
                seedTypes: [...state.seedTypes, newSpecies],
                selectedSeed: newSpecies.type
            };

        case 'WATER_PLANT':
            newState = {
                ...state,
                stats: { ...state.stats, totalWatered: state.stats.totalWatered + 1 },
                plants: state.plants.map(p => {
                    if (p.id !== action.id || p.isDead) return p;
                    const watered = p.water + 5;
                    return { ...p, water: Math.min(watered, p.config.maxWater) };
                })
            };
            break;

        case 'REMOVE_PLANT':
            newState = { ...state, plants: state.plants.filter(p => p.id !== action.id) };
            break;

        case 'CHANGE_WEATHER':
            const weathers = ['sun', 'rain', 'cloudy', 'sun'];
            const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
            return { ...state, weather: randomWeather };

        case 'TICK':
            newState = {
                ...state,
                plants: state.plants.map(p => processPlantTick(p, state.weather))
            };
            break;

        default:
            return state;
    }

    const newBadges = checkAchievements(newState);
    if (newBadges.length > 0) {
        return { ...newState, badges: [...newState.badges, ...newBadges] };
    }

    return newState;
};
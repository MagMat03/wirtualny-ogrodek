import { PlantCard, SeedButton, WeatherPanel, StatsPanel, BadgesBar } from './components.js';

export const AppView = (state) => {
    const seedsHTML = state.seedTypes.map(type => 
        SeedButton(type, state.selectedSeed === type.type)
    ).join('');

    const plantsHTML = state.plants.length 
        ? state.plants.map(PlantCard).join('') 
        : '<p class="empty-msg">Ogródek jest pusty. Zasadź coś!</p>';

    return `
        <div class="dashboard">
            ${WeatherPanel(state.weather)}
            ${StatsPanel(state.stats, state.plants.length)}
        </div>

        ${BadgesBar(state.badges)}

        <div class="controls" style="text-align: center; margin: 20px 0;">
            <span>Wybierz nasiono:</span>
            <div class="seed-list" style="margin: 10px 0; display: inline-block;">
                ${seedsHTML}
            </div>
            <br>
            <button id="btn-plant-action" class="btn-main">Zasadź wybrane 🌱</button>
        </div>

        <main class="garden-grid">
            ${plantsHTML}
        </main>
    `;
};
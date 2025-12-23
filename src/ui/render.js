const BADGE_INFO = {
    'gardener': { icon: '👩‍🌾', title: 'Ogrodnik', desc: '5 roślin' },
    'fireman': { icon: '🧯', title: 'Strażak', desc: '20 podlań' },
    'cactus_lover': { icon: '🌵', title: 'Kaktusiara', desc: '3 kaktusy' },
    'zen_master': { icon: '🧘', title: 'Mistrz Zen', desc: 'Dorosła roślina' }
};

export const renderGarden = (state) => {
    const seedsHTML = state.seedTypes.map(type => `
        <button class="btn-seed ${state.selectedSeed === type.type ? 'active' : ''}" 
                data-type="${type.type}">
            ${type.name}
        </button>
    `).join('');

    const plantsHTML = state.plants.map(plant => {
        const waterPercent = (plant.water / plant.config.maxWater) * 100;
        const color = plant.isDead ? '#555' : (plant.water < 5 ? '#e74c3c' : '#2ecc71');
        
        return `
        <div class="plant-card ${plant.isDead ? 'dead' : ''}">
            <div class="plant-emoji">${plant.stage}</div>
            <h3>${plant.config.name}</h3>
            <div class="status">${plant.status}</div>
            
            <div class="water-bar-container">
                <div class="water-bar" style="width: ${waterPercent}%; background: ${color}"></div>
            </div>
            
            <div class="actions">
                ${plant.isDead 
                    ? `<button class="btn-remove" data-id="${plant.id}">🗑️ Usuń</button>`
                    : `<button class="btn-water" data-id="${plant.id}">💧 Podlej</button>`
                }
            </div>
        </div>
        `;
    }).join('');

    let weatherIcon = '☁️';
    let weatherName = 'Pochmurno';
    if (state.weather === 'sun') { weatherIcon = '☀️'; weatherName = 'Słonecznie'; }
    if (state.weather === 'rain') { weatherIcon = '🌧️'; weatherName = 'Pada Deszcz'; }

    const badgesHTML = state.badges.map(id => {
        const info = BADGE_INFO[id];
        return `<div class="badge" title="${info.desc}">${info.icon} <span>${info.title}</span></div>`;
    }).join('');

    return `
        <div class="dashboard">
            <div class="weather-panel ${state.weather}">
                <div class="weather-icon">${weatherIcon}</div>
                <div>
                    <strong>Pogoda:</strong> ${weatherName}<br>
                    <small>${state.weather === 'rain' ? '+ Woda za darmo!' : (state.weather === 'sun' ? 'Szybki wzrost!' : 'Normalnie')}</small>
                </div>
            </div>

            <div class="stats-panel">
                <div>💧 Podlań łącznie: <strong>${state.stats.totalWatered}</strong></div>
                <div>🌱 Roślin teraz: <strong>${state.plants.length}</strong></div>
            </div>
        </div>

        ${state.badges.length > 0 ? `<div class="achievements-bar">🏆 Twoje Odznaki: ${badgesHTML}</div>` : ''}

        <div class="controls" style="text-align: center; margin: 20px 0;">
            <span>Wybierz nasiono:</span>
            <div class="seed-list" style="margin: 10px 0; display: inline-block;">
                ${seedsHTML}
            </div>
            <br>
            <button id="btn-plant-action" class="btn-main">Zasadź wybrane 🌱</button>
        </div>

        <main class="garden-grid">
            ${state.plants.length === 0 ? '<p class="empty-msg">Ogródek jest pusty. Zasadź coś!</p>' : plantsHTML}
        </main>
    `;
};
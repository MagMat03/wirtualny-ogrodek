export const PlantCard = (plant) => {
    const waterPercent = (plant.water / plant.config.maxWater) * 100;
    const color = plant.isDead ? '#555' : (plant.water < 5 ? '#e74c3c' : '#2ecc71');
    const btnAction = plant.isDead 
        ? `<button class="btn-remove" data-id="${plant.id}">🗑️ Usuń</button>` 
        : `<button class="btn-water" data-id="${plant.id}">💧 Podlej</button>`;

    return `
    <div class="plant-card ${plant.isDead ? 'dead' : ''}">
        <div class="plant-emoji">${plant.stage}</div>
        <h3>${plant.config.name}</h3>
        <div class="status">${plant.status}</div>
        <div class="water-bar-container">
            <div class="water-bar" style="width: ${waterPercent}%; background: ${color}"></div>
        </div>
        <div class="actions">${btnAction}</div>
    </div>
    `;
};

export const SeedButton = (type, isSelected) => `
    <button class="btn-seed ${isSelected ? 'active' : ''}" data-type="${type.type}">
        ${type.name}
    </button>
`;

export const WeatherPanel = (weather) => {
    const icons = { sun: '☀️', rain: '🌧️', cloudy: '☁️' };
    const labels = { sun: 'Słonecznie', rain: 'Pada Deszcz', cloudy: 'Pochmurno' };
    return `
    <div class="weather-panel ${weather}">
        <div class="weather-icon">${icons[weather] || '❓'}</div>
        <div><strong>Pogoda:</strong> ${labels[weather]}</div>
    </div>`;
};

export const StatsPanel = (stats, plantCount) => `
    <div class="stats-panel">
        <div>💧 Podlań: <strong>${stats.totalWatered}</strong></div>
        <div>🌱 Roślin: <strong>${plantCount}</strong></div>
    </div>
`;

const BADGE_INFO = {
    'gardener': { icon: '👩‍🌾', title: 'Ogrodnik' },
    'fireman': { icon: '🧯', title: 'Strażak' },
    'cactus_lover': { icon: '🌵', title: 'Kaktusiara' },
    'zen_master': { icon: '🧘', title: 'Mistrz Zen' }
};

export const BadgesBar = (badges) => {
    if (!badges.length) return '';
    const html = badges.map(id => {
        const info = BADGE_INFO[id] || { icon: '🏆', title: '???' };
        return `<div class="badge" title="${info.title}">${info.icon} <span>${info.title}</span></div>`;
    }).join('');
    return `<div class="achievements-bar">🏆 Twoje Odznaki: ${html}</div>`;
};
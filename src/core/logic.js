export const processPlantTick = (plant, weather) => {
    if (plant.isDead) return plant;

    let thirstMod = 1;
    let growthMod = 1;
    let waterChange = -plant.config.thirstRate;

    if (weather === 'rain') {
        waterChange = 2;
        thirstMod = 0;
    } else if (weather === 'sun') {
        growthMod = 2;
        thirstMod = 1.5;
    }

    const currentWaterChange = weather === 'rain' ? 2 : -(plant.config.thirstRate * thirstMod);
    const newWater = Math.min(plant.water + currentWaterChange, plant.config.maxWater);

    if (newWater <= 0) {
        return { ...plant, water: 0, isDead: true, status: '💀 Uschła' };
    }

    const newGrowth = plant.growth + (plant.config.growSpeed * growthMod);
    
    let newStage = '🌱';
    if (newGrowth > 30) newStage = '🌿';
    if (newGrowth > 80) newStage = plant.config.name.split(' ')[1] || '🌳';

    let status = 'Rośnie...';
    if (weather === 'rain') status = 'Moknie 🌧️';
    if (weather === 'sun') status = 'Opala się ☀️';
    if (newWater < 5) status = 'Chce pić! 💧';

    return {
        ...plant,
        water: newWater,
        growth: newGrowth,
        stage: newStage,
        status
    };
};

export const checkAchievements = (state) => {
    const newBadges = [];
    const { plants, stats, badges } = state;

    const has = (id) => badges.includes(id);

    if (!has('gardener') && plants.length >= 5) newBadges.push('gardener');

    if (!has('fireman') && stats.totalWatered >= 20) newBadges.push('fireman');

    const cactusCount = plants.filter(p => p.config.name.toLowerCase().includes('kaktus')).length;
    if (!has('cactus_lover') && cactusCount >= 3) newBadges.push('cactus_lover');

    if (!has('zen_master') && plants.some(p => p.growth >= 100)) newBadges.push('zen_master');

    return newBadges;
};
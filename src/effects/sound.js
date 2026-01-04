export const playSound = (name) => {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(() => {});
};

export const checkSoundEffect = (actionType) => {
    switch (actionType) {
        case 'WATER_PLANT': return playSound('water');
        case 'PLANT_SEED': return playSound('dig');
        default: break;
    }
};
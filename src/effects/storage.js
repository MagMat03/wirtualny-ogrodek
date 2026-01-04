export const saveState = (state) => {
    try {
        localStorage.setItem('my_garden_state_v3', JSON.stringify(state));
    } catch (e) { console.error('Save failed', e); }
};

export const loadState = (initialState) => {
    try {
        const loaded = localStorage.getItem('my_garden_state_v3');
        if (!loaded) return initialState;
        const parsed = JSON.parse(loaded);
        return { ...initialState, ...parsed };
    } catch (e) { return initialState; }
};
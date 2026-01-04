export const startTicker = (dispatch) => {
    setInterval(() => dispatch({ type: 'TICK' }), 5000);
    
    setInterval(() => dispatch({ type: 'CHANGE_WEATHER' }), 15000);
};
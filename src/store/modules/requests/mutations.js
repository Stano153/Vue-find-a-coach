export default{
    addRequest(state, payload) {
        state.requests.unshift(payload);
    },
    setRequest(state, payload) {
        state.requests = payload;
    }
}
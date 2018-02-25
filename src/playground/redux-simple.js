import { createStore, combineReducers } from 'redux';


// ACTIONS
const SAMPLE_ACTION_TYPE = 'gd:SAMPLE_ACTION_TYPE';
const sampleAction = (payload) => ({
    type: SAMPLE_ACTION_TYPE,
    payload
});


// REDUCER
const sampleReducer = (state={}, action) => {
    return state;
};
const sampleTwoReducer = (state=[],action) => {
    return state;
}

// STORE
const store = createStore(
    combineReducers({
        sample:sampleReducer,
        sampleTwo:sampleTwoReducer
    })
);

// SUBSCRIBE
store.subscribe(() => {
    console.log("STORE STATE", store.getState());
});

// DISPATCH SOME ACTIONS
store.dispatch(sampleAction());

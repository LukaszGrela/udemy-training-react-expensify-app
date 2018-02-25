import { createStore } from "redux";

console.log("Redux-101");

// Action Generators - functions that returns action objects
// Action Creators

const incrementCount = (value = 1) => ({
    type: 'INCREMENT',
    value: value
});
const resetCount = () => ({
    type: 'RESET'
});
const setCount = (value = 0) => ({
    type: 'SET',
    value: value
});
const decrementCount = (value = 1) => ({
    type: 'DECREMENT',
    value: value
});

// Reducers - pure functions
// doesnt use and change anything outside of function scope
// never change state or action
const countReducer = (state = { count: 0 }, action) => {

    const { value } = action;
    const val = typeof value === 'number' ? value : 1;
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + val
            }
            break;
        case 'DECREMENT':

            return {
                count: state.count - val
            }
            break;
        case 'SET':

            return {
                count: val
            }
            break;
        case 'RESET':

            return {
                count: 0
            }
            break;

        default:
            return state;
            break;
    }
};



const store = createStore(countReducer);
const unsubscribe = store.subscribe(() => {

    console.log(store.getState());
});


// Actions - an object that gets sent to the store
store.dispatch(incrementCount(5));

// unsubscribe();

store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount(10));
store.dispatch(setCount(101));


// //deconstructuring
// const person = {
//     nane: 'Łukasz',
//     age: 38,
//     location: {
//         city: 'Southampton',
//         temp: 6
//     }
// };

// const { name = 'Anonymous', age } = person;
// console.log(`${name} is ${age}`);
// const { temp: temperature, city } = person.location;
// console.log(`It's ${temperature} in ${city}`);

// //array destructuring
// const address = ["99 Dumbleton Towers","Warburton Road","So19 6NS","Southampton"];

// const [, street, , town = 'Bychawka Trzecia'] = address;

// console.log(`You are in ${street} ${town}.`);
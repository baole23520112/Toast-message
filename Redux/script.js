// import { createStore } from "https://cdn.skypack.dev/redux";

// My redux
const createStore = (reducer) => {
    let state = reducer(undefined, {});
    const subscribers = [];
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action)

            subscribers.forEach(subscriber => subscriber())
        },
        subscribe(subscriber) {
            subscribers.push(subscriber)
        }
    }
}

const initState = 0;

// Reducer
function reducer(state = initState, action) {
    switch (action.type) {
        case 'DEPOSIT':
            return state + action.payload;
        case 'WITHDRAW': 
            return state - action.payload;
        default:
            return state;
    }
}

// Create store
const store = createStore(reducer)

// Actions
function actionDeposit(payload) {
    return {
        type: 'DEPOSIT',
        payload,
    }
}

function actionWithdraw(payload) {
    return {
        type: 'WITHDRAW',
        payload,
    }
}

// DOM events
const deposit = document.querySelector('#deposit')
const Withdraw = document.querySelector('#Withdraw')

deposit.onclick = () => {
    store.dispatch(actionDeposit(10));
}

Withdraw.onclick = () => {
    store.dispatch(actionWithdraw(10));
}

store.subscribe(() => {
    render();
})

function render() {
    const output = document.querySelector('#output');
    output.innerText = store.getState();
}

render();
import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const initialState = {
    count: 0
}

const userInitialState = {
    name: 'jock',
    age : 15
}

const ADD = 'ADD'

function countReducer(state = initialState, action){
    console.log(state,action.type)
    switch (action.type) {
        case ADD: 
            return { count: state.count + (action.num || 1) }
        default : 
            return state
    }
}

const Update_USERNAME = 'Update_USERNAME'

function userReducer(state = userInitialState, action){
    switch(action.type){
        case Update_USERNAME:
        return {
            ...state,
            name: action.name,
        }
        default:
            return state
    }
}


const allReducers = combineReducers({
    counter:countReducer,
    user:userReducer
})

const store = createStore(
    allReducers,{
        counter: initialState,
        user: userInitialState
    },
    composeWithDevTools(applyMiddleware(ReduxThunk))
)

//action creator
export function add(num) {
    return {
        type: ADD,
        num,
    }
}

//async creator
function addAsync(num) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(add(num))
        }, 1000);
    }
}

store.dispatch(add(3))

console.log(store.getState())
store.dispatch({type:ADD})
store.dispatch({ type:Update_USERNAME , name: "wenwenwen" })
console.log(store.getState())

// listen changes of store
store.subscribe(() => {
    console.log('change',store.getState())
})

store.dispatch(addAsync(4))
store.dispatch({ type:Update_USERNAME , name: "ssss" })




export default function initializeStore(state) {
    const store = createStore(
        allReducers,
        Object.assign({}, {
                counter: initialState,
                user: userInitialState
        },state),
        composeWithDevTools(applyMiddleware(ReduxThunk))
    )

    return store
}

import { createStore } from 'redux';
const initialState = {
    playing_list : [],
    owner : "",
    username : "",
    users: [],
    turn: 0,
    is_admin : false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_TURN":
            return {
                ...state,
                turn: action.payload
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
            }
        case "SET_ADMIN":
            return {
                ...state,
                is_admin: action.payload
            }
        case "SET_USERNAME":
            return {
                ...state,
                username: action.payload
            }
        case "SET_PLAYING_LIST":
            return {
                ...state,
                playing_list: action.payload
            }
        case "SET_OWNER":
            return {
                ...state,
                owner: action.payload
            }
        default:
            return state
    }
}
const store = createStore(reducer)
export default store


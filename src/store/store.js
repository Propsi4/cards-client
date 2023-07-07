
import { createStore } from 'redux';
const initialState = {
    trump_suit : "",
    cards_on_table : Array(6).fill({}),
    neighbours : {},
    playing_list : [],
    owner : "",
    username : "",
    cards: [],
    users: [],
    is_admin : false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_NEIGHBOURS":
            return {
                ...state,
                neighbours: action.payload
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.payload
            }
        case "SET_CARDS_ON_TABLE":
            return {
                ...state,
                cards_on_table: action.payload
            }
        case "SET_ADMIN":
            return {
                ...state,
                is_admin: action.payload
            }
        case "SET_CARDS":
            return {
                ...state,
                cards: action.payload
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
        case "SET_TRUMP_SUIT":
            return {
                ...state,
                trump_suit: action.payload
            }
        default:
            return state
    }
}
const store = createStore(reducer)
export default store


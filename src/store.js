import { createStore} from 'redux'

const reducer = (state,action) =>{
    if(action.type === "SAVE_CHALLENGE"){
        return {
            ...state,
            reto:action.reto,
        }    
    }
    return state
}

export default createStore(reducer,{reto:null})
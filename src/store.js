import { createStore} from 'redux'

const reducer = (state,action) =>{
    if(action.type === "ADD_LOCATION"){
        return {
            ...state,
            location:action.location,
        }    
    }
    if(action.type === "FINISH_STATE"){
        return {
            ...state,
            location:null,
        }    
    }
    return state
}

export default createStore(reducer,{location:null})
import { setPlayeData } from "../types/playerType"

export function setPlayerDetails(data){
    return(dispatch) => {
        dispatch(setPlayeData(data))
    }
}
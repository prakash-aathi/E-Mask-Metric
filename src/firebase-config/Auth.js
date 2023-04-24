import { getUserData } from "./Storage"

export const isAuth = () => { 
    return getUserData()!=null?true:false;
}
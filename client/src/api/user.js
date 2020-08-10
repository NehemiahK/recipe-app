import {get,put} from './index'

const baseUrl = "/api/user"

export const getUser = async() => {
     let data;
     try{
        data = await get(baseUrl).then(res => res.json())
        const {status,firstName,lastName} = data;
        data = {status,firstName,lastName,loggedIn:true}
     }catch(err){
         console.log(err)
         data = {loggedIn:false}
     }
     return data
}

export const updateUser = async(data) => {
    let response;
    try{
        response = await put(baseUrl,data).then(res => res.json())
    }catch(err){
        console.log(err)
        response = {}
    }
    return response
}
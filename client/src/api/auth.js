import {post} from './index'

const baseUrl = "/auth/loginlocal"

export const signIn = async(data) => {
    let response;
    try{
        response = await post(baseUrl,data).then(res => res.json())
    }catch(err){
        console.log(err)
        response = {}
    }
    return response
}
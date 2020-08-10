import {get,post,put,deleteByUrl} from './index'

const baseUrl = "/api/recipe"

export const getRecipes = (searchParams = {}) => {
    return get(`${baseUrl}s`,searchParams).then(data => data.json())
}

export const getRecipe = (id) => {
    return get(`${baseUrl}/${id}`).then(data => data.json())
}

export const addRecipe = (data) => {
    return post(baseUrl,data)
    .then(d => d.json())
}

export const editRecipe = (data,id) => {
    return put(`${baseUrl}/${id}`,data)
    .then(d => d.json())
}

export const deleteRecipe = (id) => {
    return deleteByUrl(`${baseUrl}/${id}`).then(r => r.json())
}
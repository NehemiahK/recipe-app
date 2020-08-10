import React,{useContext,useEffect,useState} from 'react'
import RecipeList from '../RecipeList/RecipeList'
import {UserContext} from '../../context/UserContext'
import SearchBar from '../SearchBar/SearchBar'

import Profile from '../Profile/Profile'

import {getRecipes,deleteRecipe} from '../../api/recipe'

const Home = () => {
    const {user} = useContext(UserContext)

    const [recipeList,setRecipeList] = useState([])

    useEffect(()=>{
        fetchRecipes()
    },[])

    const fetchRecipes = (searchTerm = '') =>{
        const searchParams = {}
        if(searchTerm) searchParams.title = searchTerm
        getRecipes(searchParams).then(recipes => setRecipeList(recipes))
    }

    const deleteRecipeById = (id) => {
        const confirmedDelete = window.confirm('Are you sure you want to delete this recipe?');

        if(confirmedDelete){
            deleteRecipe(id).then(c => {
                console.log(c)
                let filtteredArray = recipeList.filter(recipe => recipe._id !== id)
                setRecipeList(filtteredArray)
            }).catch(err => console.log(err))
        }
    }

    return <div>
        {user.status &&        
         <>
        <SearchBar fetchRecipes={fetchRecipes}/>
        <RecipeList recipeList={recipeList} deleteRecipeById={deleteRecipeById}/>
        </>
        }
        {!user.status && user.loggedIn && 
            <Profile />
        }

    </div>
}

export default Home
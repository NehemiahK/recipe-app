import React from 'react'
import RecipeItem from '../RecipeItem/RecipeItem'
import './recipelist.css'

const RecipeList = ({recipeList,deleteRecipeById}) => {
    return(<div className='recipe-list'>
        <ul>
            {recipeList.map(recipe => <RecipeItem key={recipe._id}
                deleteRecipeById={deleteRecipeById}
                {...recipe}
            />)}
        </ul>
    </div>)
}

export default RecipeList
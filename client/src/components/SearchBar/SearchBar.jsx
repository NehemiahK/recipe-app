import React,{useState} from 'react'
import './searchbar.css'

const SearchBar = ({fetchRecipes}) => {
    const [recipe, setRecipe] = useState('')

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchRecipes(recipe)
    }

    return <div className='search-bar'>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name='recipe' value={recipe} 
          onChange={(e) => setRecipe(e.target.value)} />
          <button type='submit'>Search</button>
        </form>
    </div>
}

export default SearchBar
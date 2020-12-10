import React,{useState} from 'react'
import './searchbar.css'

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const SearchBar = ({fetchRecipes}) => {
    const [recipe, setRecipe] = useState('')

    const handleSeachInputKeyPress = e => {
        if (e.key === 'Enter') {
            fetchRecipes(recipe)
        }
      }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchRecipes(recipe)
    }

    return <div className='search-bar'>
        <TextField label="Search" variant="outlined" 
        fullWidth
        onKeyPress={handleSeachInputKeyPress}
         name='recipe' value={recipe} 
         onChange={(e) => setRecipe(e.target.value)} 
        />

        <IconButton color="primary" aria-label="upload picture" 
            onClick={handleFormSubmit}
            component="button">
          <SearchIcon />
        </IconButton>
    </div>
}

export default SearchBar
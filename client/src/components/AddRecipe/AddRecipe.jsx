import React,{useState,useRef, useEffect} from 'react'
import './addrecipe.css'

import {addRecipe,getRecipe,editRecipe } from '../../api/recipe'
import { useParams } from 'react-router-dom'

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const recipeSchema = {
    title: '',
    source: '',
    instructions: '',
    format:'text',
    ingredientText:'',
    tags:''
}

const ingredientSchema = {
    ingredient:'',
    amount:'',
    id:1
}

const AddRecipe = () => {
    const [recipe, setRecipe] = useState(recipeSchema)
    const [ingredients, setIngredients] = useState([{...ingredientSchema}])
    
    let {id} = useParams();

    let ingredientId = useRef(1)

    useEffect(()=>{
        fetchRecipe(id)
    },[id])

    const fetchRecipe = (id) => {
        getRecipe(id).then(({ingredients,tags,...rest })=> {
            setIngredients(ingredients)
            tags = tags.join(',')
            setRecipe({tags,...rest})

            if(ingredients.length > 0){
                ingredientId.current = ingredients[ingredients.length -1 ].id
            }
        })
    }
    
    const handleRecipeUpdate = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]:e.target.value
        })
    }

    const handleIngredientListUpdate = (e,id) => {
        const newIngredientList = ingredients.map(ingredient => {
            if(ingredient.id === id){
                return {
                    ...ingredient,
                    [e.target.name] : e.target.value
                }
            }
            return ingredient
        })

        if(id === ingredientId.current){
            ingredientId.current +=1;
            let newIngredientItem = {...ingredientSchema, id:ingredientId.current}
            newIngredientList.push(newIngredientItem)
        }
        setIngredients(newIngredientList)
    }

    const handleDeleteIngredient = (id) => {
        const newIngredientList = ingredients.filter(item => item.id !== id)
        setIngredients(newIngredientList)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let msg;
        let formData = {...recipe}
        formData.ingredients = [...ingredients]

        if(id){
            editRecipe(formData,id)
            msg = 'Your recipe has been updated'
        }else{
            addRecipe(formData)
            msg = 'Your recipe has been added'
        }
        alert(msg)
        window.location.replace("/")
    }

    return <div>
        <form onSubmit={handleFormSubmit} className='recipe-form'>

        <TextField label="Recipe Name" name='title' value={recipe.title} fullWidth
            onChange={(e) => handleRecipeUpdate(e)} />

        <TextField label="Source" name='source' value={recipe.source} fullWidth
            onChange={(e) => handleRecipeUpdate(e)} />

    <FormControl fullWidth style={{margin:'10px 0px'}}>
        <InputLabel id="ingredient-format">Ingredient Format</InputLabel>
        <Select
          labelId="ingredient-format"
          value={recipe.format} onChange={(e) => handleRecipeUpdate(e)} name='format'
        >
          <MenuItem value={'list'}>List</MenuItem>
          <MenuItem value={'text'}>Text</MenuItem>
        </Select>
      </FormControl>

        {recipe.format === 'list' &&
        
        <label>
              Ingredients:
              {ingredients.map((item,indx) => <IngredientItem
              indx={indx}
              key={item.id}
              item={item}
              handleClick = {handleDeleteIngredient}
              handleChange={handleIngredientListUpdate}/>)}
          </label> }

          {recipe.format === 'text' && 
                  <TextField
                  style={{margin:'10px 0px'}}
                  fullWidth
                  label="Ingredients"
                  multiline
                  rows={8}
                  variant="outlined"
                  name='ingredientText' value={recipe.ingredientText} 
                  onChange={(e) => handleRecipeUpdate(e)} 
                />
          }

            <TextField
                  style={{margin:'10px 0px'}}
                  fullWidth
                  label="Instructions"
                  multiline
                  rows={8}
                  variant="outlined"
                  name='ingredientText' value={recipe.instructions} 
                  onChange={(e) => handleRecipeUpdate(e)} 
                />

        <TextField label="Tags (Comma Seperated):" name='tags' value={recipe.tags} 
            fullWidth onChange={(e) => handleRecipeUpdate(e)} />

        <Button variant="contained" type='submit'
        color="primary" size="large" style={{width:150, margin:'10px 0px'}}>
        Submit
        </Button>
        </form>
    </div>
}


const IngredientItem = ({handleChange,item,handleClick,indx}) => {
    return(<div className='ingredient-item'>
        <input type="text" name='ingredient' value={item.ingredient} placeholder='ingredient'
        onChange={(e)=>handleChange(e,item.id)}  />

        <input type="text" name='amount' value={item.amount} placeholder='amount'
        onChange={(e)=>handleChange(e,item.id)}  />   

        {indx !== 0 && <button onClick ={()=>handleClick(item.id)}>Delete</button>}
        
    </div>
)
}

export default AddRecipe
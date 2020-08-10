import React,{useState,useRef, useEffect} from 'react'
import './addrecipe.css'

import {addRecipe,getRecipe,editRecipe } from '../../api/recipe'
import { useParams } from 'react-router-dom'

const recipeSchema = {
    title: '',
    source: '',
    instructions: '',
    format:'list',
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
    }

    return <div>
        <form onSubmit={handleFormSubmit} className='recipe-form'>

          <label>
              Recipe Name:
            <input type="text" name='title' value={recipe.title} 
            onChange={(e) => handleRecipeUpdate(e)} />
          </label>  

          <label>
              Source:
            <input type="text" name='source' value={recipe.source} 
            onChange={(e) => handleRecipeUpdate(e)}  />
          </label>  

          <label>
               Ingredient Format:
                <select value={recipe.format} onChange={(e) => handleRecipeUpdate(e)} name='format'>
                    <option value={'list'}>List</option>
                    <option value={'text'}>Text</option>
                </select>
          </label>  

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
                <label>
                Ingredients:
                <textarea type="text" name='ingredientText' value={recipe.ingredientText} 
                onChange={(e) => handleRecipeUpdate(e)}  />
            </label>  
          }

          <label>
              Instructions:
            <textarea type="text" name='instructions' value={recipe.instructions} 
            onChange={(e) => handleRecipeUpdate(e)}  />
          </label>  

          <label>
            Tags (Comma Seperated):
            <input type="text" name='tags' value={recipe.tags}
            
            onChange={(e) => handleRecipeUpdate(e)}  />
          </label>  

          <button type='submit'>Submit</button>
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
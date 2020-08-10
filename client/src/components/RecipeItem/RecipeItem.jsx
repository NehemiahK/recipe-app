import React,{useState} from 'react'
import './recipeitem.css'
import { Link } from 'react-router-dom'



const RecipeItem = ({title,source ='', _id, deleteRecipeById, ...props}) => {
    const [expanded,setExpanded] = useState(false)

    return <li className='recipe-item'>
        <div onClick={()=> setExpanded(expand => !expand)}>
            <div>{title}</div>
            <div className='source'>Source: {source || ''}</div>

            {expanded && 
                <ExpandedDetails {...props}/>
            }
        </div>

        <Link to={`/add-recipe/${_id}`} className='action-button'>
            Edit
        </Link>
        <button className='action-button' onClick={()=>deleteRecipeById(_id)}>Delete</button>
    </li>
}

const ExpandedDetails = ({ingredients,instructions,format,ingredientText,tags}) => {
    return <div className='expanded-recipe'>
        <div><strong>Ingredients</strong></div>
        {format === 'list' && 
            <div>
                {ingredients.map(({ingredient,amount,id}) => <div key={id}>
                    {ingredient} {amount}
                </div>)}
            </div>
        }

    {format === 'text' && <div>{ingredientText}</div>}
     
        <div><strong>Instructions</strong></div>
        <div>{instructions}</div>

        {tags.length > 0 && 
           <div className='tags'>
            {tags.map(r =>  r && <span key={r}>{r}</span>)}
            </div>
        }
     
    </div>
}

export default RecipeItem 
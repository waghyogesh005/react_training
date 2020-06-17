import * as actinType from './actionType';
import orderAxios from '../../axios-order';


export const addIngredient = (ingName) =>{
    return {
        type: actinType.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) =>{
    return {
        type: actinType.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

const fetchIngredients = (ingredients) => {
    return {
        type : actinType.SET_INGREDIENTS,
        ingredients
    } 
}

const fetchIngredientsFails = ()=>{
    return {
        type:actinType.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () =>{
    return dispatch =>{
            orderAxios.get('/ingredients.json')
                .then(response=>{
                    dispatch(fetchIngredients(response.data))
                }).catch(error=>{
                    dispatch(fetchIngredientsFails())
            })
    }
}
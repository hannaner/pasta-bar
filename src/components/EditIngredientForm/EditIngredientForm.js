// Form to update ingredient
import { useState } from "react"
import * as ingredientsAPI from "../../utilities/ingredients-api"

export default function EditIngredientForm({ingredient, getAllAndAvailable}){ 
    
    const [editedIngredient, setEditedIngredient] = useState({
        _id: ingredient._id,
        name: ingredient.name,
        // emoji: ingredient.emoji,
        price: ingredient.price,
        isAvailable: ingredient.isAvailable
    })

    function handleChange(event) {
        setEditedIngredient({
            ...editedIngredient,
            [event.target.name]: event.target.value
        })
    }
    function handleCheck(event) {
        setEditedIngredient({
            ...editedIngredient,
            [event.target.name]: !editedIngredient.isAvailable
        })
    }
    async function handleDelete(event) {
        event.preventDefault()
        console.log("handleDelete")

        const ingredientId = ingredient._id
        
        //Remove from DB
        await ingredientsAPI.remove(ingredientId)

        //this is not showing
        console.log("after delete")

        //RE-RENDER THE LIST
        getAllAndAvailable()
    }

    async function handleUpdate(event) {
        event.preventDefault()

        //Update the DB
        const updatedIngredient = await ingredientsAPI.update(ingredient._id, editedIngredient)

        //RE-RENDER THE LIST
        getAllAndAvailable()
    }

    

    return (
        <form className="edit-form" autoComplete="off">
            <label className="edit-labels">Ingredient Name</label>
            <input
                type="text"
                name="name"
                placeholder="Name" 
                value={editedIngredient.name}
                onChange={handleChange}
            />
            {/* <label>Ingredient Image</label>
            <input 
                type="text"
                name="emoji"
                placeholder="Image" 
                value={editedIngredient.emoji}
                onChange={handleChange}
            /> */}
            <label>Ingredient Price</label>
            <input 
                type="number"
                name="price"
                placeholder="Price" 
                value={editedIngredient.price}
                onChange={handleChange}
            />
            <label>Available</label>
            <input 
                type="checkbox" 
                name="isAvailable"
                checked={editedIngredient.isAvailable}
                onChange={handleCheck}
            />
            <button type="submit" onClick={handleUpdate}>
                Update Ingredient
            </button>
            <button onClick={handleDelete}>
                Delete Ingredient
            </button>
        </form>
    )
}
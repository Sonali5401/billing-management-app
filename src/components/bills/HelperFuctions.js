
/*FINDING ADDED/UPDATED PRODUCT FROM THE PRODUCT LIST */

export const findItem = (id,items) =>{
    
    const selectedItem = items.find((ele) => {
        return ele._id === id
    })
    //console.log('helper function',selectedItem)

    return selectedItem

}

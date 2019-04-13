export function setPets(pets=[]){
    return {
        type: "pets/set",
        payload: pets
    }
}

export function addPet(pet){
    return {
        type: "pets/add",
        payload: pet
    }
}

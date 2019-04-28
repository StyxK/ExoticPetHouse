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

export function updatePet(pet){
    return {
        type: "pets/update",
        payload: pet
    }
}

export function removePet(pet){
    return {
        type: "pets/remove",
        payload: pet
    }
}

export function setUser(user){
    return {
        type: "user/set",
        payload: user
    }
}

export function clearUser(user){
    return {
        type: "user/set",
        payload: user
    }
}
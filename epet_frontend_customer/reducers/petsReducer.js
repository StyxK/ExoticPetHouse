const initialPets = [];

export default (pets = initialPets, action) => {
  switch (action.type) {
    case "pets/set": {
      const newPets = [...action.payload];
      return newPets;
    }
    case "pets/add": {
      const newPets = [...pets, action.payload];
      return newPets;
    }
    case "pets/update": {
      let newPets = [...pets];
      newPets = newPets.filter(pet => pet.id != action.payload.id);
      newPets .push(action.payload);
      return newPets;
    }
    case "pets/remove": {
      let newPets = [...pets];
      newPets = newPets.filter(pet => pet.id != action.payload.id);
      return newPets;
    }
  }
  return pets;
};

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
    case "pets/remove": {
      let newPets = [...pets];
      newPets = newPets.splice(newPets.indexOf(action.payload), 1);
      return newPets;
    }
  }
  return pets;
};

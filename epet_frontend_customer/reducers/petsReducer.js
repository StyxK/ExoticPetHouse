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
  }
  return pets;
};

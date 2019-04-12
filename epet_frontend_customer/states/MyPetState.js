import { Container } from "unstated";

export default class MyPetState extends Container {
  state = {
    pets: []
  };

  add(pet) {
    const newPets = [...this.state.pets];
    newPets.push(pet)
    this.setState({ pets: newPets });
  }

  remove() {
    this.setState({ count: this.state.count - 1 });
  }
}

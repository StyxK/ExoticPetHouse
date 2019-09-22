const initialUser = {};
import axios from "axios";
export default (user = initialUser, action) => {
  switch (action.type) {
    case "user/set": {
      const newUser = { ...action.payload };
      axios.defaults.headers.common["Authorization"] = "Epet " + newUser.token;
      return newUser;
    }
    case "user/clear": {
      const newUser = {};
      axios.defaults.headers.common["Authorization"] = undefined;
      return newUser;
    }
  }
  return user;
};

const initialUser = {};

export default (user = initialUser, action) => {
  switch (action.type) {
    case "user/set": {
      const newUser = {...action.payload};
      return newUser;
    }
    case "user/clear": {
      const newUser = {};
      return newUser;
    }
  }
  return user;
};


const initialState = {
  auth: {
    isActive: false,
    className: ''
  }
}

const modalReducers = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        auth: {
          isActive: true,
          className: 'slide-auth'
        }
      }
      break;

    case "REGISTER":
      return {
        auth: {
          isActive: true,
          className: ''
        }
      }
      break;

    case "CLOSE":
      return initialState;
      break;

    default:
      return state;

  }
}

export default modalReducers;

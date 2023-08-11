const initialState = {
  isAuthenticated: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch(type) 
  {
    case 'casd':
      return state;
    default:
      return state;
  }
}

export default authReducer
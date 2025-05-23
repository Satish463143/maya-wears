// customer.reducer.js

export const setCustomerId = (customerId) => ({
  type: 'SET_CUSTOMER_ID',
  payload: customerId,
});

const initialState = {
  customerId: null, // Store the customer ID here
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_ID':
      return { ...state, customerId: action.payload };
    default:
      return state;
  }
};

export default customerReducer;

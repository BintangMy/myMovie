import {USER_PAYMENT} from "../actionType"

const initialState = {
    midtransSnapToken: {}
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_PAYMENT:
            console.log(action.payload,"action payload")
            return{
                ...state,
                snapToken: action.payload
            }
        default:
            return state;
    }
}

export default paymentReducer;
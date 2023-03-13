import { USER_PAYMENT } from "../actionType";
const mainUrl = "http://localhost:3000/payment"
export const setSnapToken = (payload) => {
  return {
    type: USER_PAYMENT,
    payload,
  };
};

export const getSnapToken = (data) => {
  return async (dispatch) => {
    try {
      console.log(data, 'ini data dari components')
      const response = await fetch(mainUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        }
      });
      const { token } = await response.json()
      console.log(token, 'ini midtrans tokennnnnnnnnnnnnnnn')
      dispatch(setSnapToken(token))
    } catch (error) {
        console.log(error)
    }
  };
};

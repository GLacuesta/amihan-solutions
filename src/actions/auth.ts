import { ICredentials } from "../interface";
import actionsTypes from "./actionTypes";

const auth = (payload: ICredentials) => {
  return {
    type: actionsTypes.AUTHENTICATE,
    payload,
  }
};

export default auth;


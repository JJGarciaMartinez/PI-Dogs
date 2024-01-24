import axios from "axios";
import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  POST_DOG,
  TEMP_FILTER,
  ORIGIN_FILTER,
} from "./actions-types";

export const getDogs = () => {
  const endpoint = "/dogs";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_DOGS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTemperaments = () => {
  const endpoint = "/temperaments";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);
      // console.log(data);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postDog = (dogData) => {
  const endpoint = "/dogs";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, dogData);
      return dispatch({
        type: POST_DOG,
        payload: getDogs(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const tempFilter = (payload) => {
  return {
    type: TEMP_FILTER,
    payload,
  };
};

export const originFilter = (payload) => {
  return {
    type: ORIGIN_FILTER,
    payload,
  };
};

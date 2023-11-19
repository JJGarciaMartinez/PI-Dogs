import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  POST_DOG,
  TEMP_FILTER,
  ORIGIN_FILTER,
} from "./actions-types";

const initialState = {
  allDogs: [],
  temperament: [],
  dogs: [],
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_DOGS: {
      return {
        ...state,
        allDogs: actions.payload,
        dogs: actions.payload,
      };
    }
    case GET_TEMPERAMENTS: {
      return {
        ...state,
        temperament: actions.payload,
      };
    }
    case POST_DOG: {
      return {
        ...state,
        dogs: actions.payload,
      };
    }
    case TEMP_FILTER: {
      const selTemp = actions.payload;
      const filteredDogs = state.allDogs.filter((dog) =>
        dog.temperament.includes(selTemp)
      );
      return {
        ...state,
        dogs: filteredDogs,
      };
    }
    case ORIGIN_FILTER:
      {
        if (actions.payload === "all") {
          return {
            ...state,
            dogs: state.allDogs,
          };
        }
        if (actions.payload === "db") {
          const filteredDogs = state.allDogs.filter((dog) => dog.inDb);
          return {
            ...state,
            dogs: filteredDogs,
          };
        }
        if (actions.payload === "api") {
          const filteredDogs = state.allDogs.filter((dog) => !dog.inDb);
          return {
            ...state,
            dogs: filteredDogs,
          };
        }
      }
      break;
    default:
      return { ...state };
  }
};
export default reducer;

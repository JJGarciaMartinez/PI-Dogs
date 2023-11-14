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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS: {
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };
    }
    case GET_TEMPERAMENTS: {
      return {
        ...state,
        temperament: action.payload,
      };
    }
    case POST_DOG: {
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
      };
    }
    case TEMP_FILTER: {
      return {
        ...state,
        dogs: state.allDogs.filter((dog) =>
          dog.temperament?.includes(action.payload)
        ),
      };
    }
    case ORIGIN_FILTER:
      {
        if (action.payload === "all") {
          return {
            ...state,
            dogs: state.allDogs,
          };
        }
        if (action.payload === "db") {
          const filteredDogs = state.allDogs.filter((dog) => dog.inDb);
          return {
            ...state,
            dogs: filteredDogs,
          };
        }
        if (action.payload === "api") {
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

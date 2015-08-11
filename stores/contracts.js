import { 
  FETCH_CONTRACTS, 
  SEARCH_CONTRACTS, 
  ADD_CONTRACT, 
  EDIT_CONTRACT, 
  DELETE_CONTRACT } from '../constants/ActionTypes';

import fakeContracts from './fakeContracts';

const initialState = {
  items: fakeContracts,
  searchTerm: ''
};

//TODO: use immutable objects in state
const actionsMap = {
  [FETCH_CONTRACTS]: (state, action) => {
    return { 
      items: action.contracts,
    };
  },
  [SEARCH_CONTRACTS]: (state, action) => {
    return {
      searchTerm: action.searchTerm
    }
  },
  [ADD_CONTRACT]: (state, action) => {
    return { 
      items: state.items.concat(action.contract)
    };
  },
  [EDIT_CONTRACT]: (state, action) => {
    return { 
      items: state.items.map(c => c.id === action.contract.id ? { ...c, ...action.contract } : c)
    };
  },
  [DELETE_CONTRACT]: (state, action) => {
    return {
      items: state.items.filter(c => c.id !== action.id)
    }
  }
}

export default function contracts (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state

  return Object.assign({}, state, reduceFn(state, action))
}

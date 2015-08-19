import * as types from '../constants/ActionTypes'
import fakeContracts from '../reducers/fakeContracts';

export function fetchContracts (options) {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch({
        type: types.FETCH_CONTRACTS,
        contracts: fakeContracts
      });
    }, 1000);
  }
}

export function addContract (contract) {
  return {
    type: types.ADD_CONTRACT,
    contract: contract
  }
}

export function editContract (contract) {
  return {
    type: types.EDIT_CONTRACT,
    contract: contract
  }
}

export function deleteContract (id) {
  return {
    type: types.DELETE_CONTRACT,
    id: id
  }
}

export function searchContracts (searchTerm) {
  return {
    type: types.SEARCH_CONTRACTS,
    searchTerm: searchTerm
  }
}
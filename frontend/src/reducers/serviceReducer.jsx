import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,
} from '../constants/serviceConstants';

export const serviceListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true, users: [] };
    case SERVICE_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceDetailsReducer = (
  state = { users: { tailorService: [] } },
  action
) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SERVICE_DETAILS_SUCCESS:
      return { loading: false, users: action.payload };
    case SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

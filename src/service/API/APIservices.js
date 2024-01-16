
import { FETCH } from "../util/Fetch";
import { APICONFIG } from "../util/Path";

/* -----------------------------------AUTH CONST VARIABLE----------------------------------*/

const { API, VARIABLE, METHOD, DEFAULT_PATHS } = APICONFIG;

const {
  PRODUCT
} = VARIABLE;

const { GETALL, CREATE, UPDATE, DELETE } = DEFAULT_PATHS;

/*---------------------------------- PRODUCT API SERVICES----------------------------------- */

export const CREATEPRODUCT = async (body) => {
  let options = {
    url: `${API}/${PRODUCT}/${CREATE}`,
    method: METHOD.POST,
    body: JSON.stringify(body),
    authenticate: false,
  };
  let Response = await FETCH(options);
  return Response;
};

export const GETALLPRODUCTS = async (body) => {

  let query = body || '';

  let options = {
    url: `${API}/${PRODUCT}/${GETALL}${query}`,
    method: METHOD.GET,
    authenticate: true,
  };
  let Response = await FETCH(options);
  return Response;

};

export const UPDATEPRODUCTS = async (body) => {
  let options = {
    url: `${API}/${PRODUCT}/${UPDATE}`,
    method: METHOD.PUT,
    body: JSON.stringify(body),
    authenticate: false,
  };
  let Response = await FETCH(options);
  return Response;
};

export const DELETEPRODUCTS = async (body) => {
  let options = {
    url: `${API}/${PRODUCT}/${DELETE}/${body.productId}`,
    method: METHOD.DELETE,
    body: JSON.stringify(body),
    authenticate: false,
  };
  let Response = await FETCH(options);
  return Response;
};

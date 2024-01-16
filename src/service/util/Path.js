const API_URL = {
    DEV: 'http://localhost:2000/api'
};

const DEFAULT_PATHS = {
    GETALL: 'get/all',
    GETSINGLE: 'get',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE:'delete'
};

const VARIABLE = {
    PRODUCT: 'product'
}

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export const APICONFIG = {
    API: process.env.REACT_APP_API_AUTH || API_URL['DEV'],
    METHOD: METHODS,
    VARIABLE: VARIABLE,
    DEFAULT_PATHS: DEFAULT_PATHS
};

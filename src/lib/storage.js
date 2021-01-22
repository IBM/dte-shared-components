import fetch from "isomorphic-unfetch";
import * as Yup from "yup";

import { prepare, errorHandler } from "./crud";

const API_URL = process.env.API_URL || `https://dte-api.us1a.cirrus.ibm.com/api/`;
const VERBOSE = process.env.LOG_VERBOSE || false;
const NAME = "storage";
const LIMIT = 10000;
const DEFAULTS = {};

export function getSchema() {
  return Yup.object().shape({});
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

// attach this to getters that pull from the db ...
export async function getOptions(type) {
  if (!type) return [];
  switch (type.toString().toLowerCase()) {
    default:
      return [];
  }
}

export function find(opts = { limit: LIMIT }) {
  return fetch(`${API_URL}${NAME}`, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("find", NAME, json);
      return json;
    })
    .catch((err) => {
      console.log(`${NAME} find error:`, err.message || err);
      return { error: err.message || err };
    });
}

export async function findOne(id, opts = {}) {
  return fetch(`${API_URL}${NAME}/${id}`, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("findOne", NAME, json);
      return json;
    })
    .catch((err) => {
      console.log(`${NAME} findOne error:`, err.message || err);
      return { error: err.message || err };
    });
}

export function create(file = {}, opts = {}, filename) {
  const payload = new FormData();
  payload.append("file", file, filename ? filename : file.name);
  let options = prepare({ method: "POST", body: payload }, opts); // get the options
  delete options.headers["Content-type"]; // remove the content type to allow for the upload to work
  return fetch(`${API_URL}${NAME}`, options)
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("create", NAME, json);
      return json;
    })
    .catch((err) => {
      console.log(`${NAME} create error:`, err.message || err, `${API_URL}${NAME}`, payload);
      return { error: err.message || err };
      // return err;
    });
}

export function destroy(id, opts = {}) {
  return fetch(`${API_URL}${NAME}/${id}`, prepare({ method: "DELETE" }, opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("destroy", NAME, json);
      return json;
    })
    .catch((err) => {
      console.log(`${NAME} destroy error:`, err.message || err, `${API_URL}${NAME}/${id}`);
      return { error: err.message || err };
      // return err;
    });
}

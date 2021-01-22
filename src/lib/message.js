import fetch from "isomorphic-unfetch";
import { merge } from "lodash";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const API_URL = process.env.API_URL || `https://dte-api.us1a.cirrus.ibm.com/api/`;
const VERBOSE = process.env.LOG_VERBOSE || false;

export function prepare(options = {}, additional = {}) {
  const defaults = {
    method: "POST", // default method
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-type": "application/json",
    },
  };
  return merge(defaults, options, additional);
}

export function send(payload, opts = {}) {
  if (VERBOSE)
    console.log(
      "message.send",
      `${API_URL}message/mail`,
      JSON.stringify(payload, null, 2),
      JSON.stringify(opts, null, 2)
    );
  return fetch(
    `${API_URL}message/mail`,
    prepare({ method: "POST", body: JSON.stringify(payload) }, opts)
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log("json", json);
      if (json.code && json.code === 400 && json.message) throw new Error(json.message);
      return json;
    })
    .catch((err) => {
      console.log(`message error:`, err.message || err);
      return err;
    });
}

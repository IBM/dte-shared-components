import fetch from "isomorphic-unfetch";
import { omit, merge } from "lodash";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const API_URL = process.env.API_URL || `https://dte-api.us1a.cirrus.ibm.com/api/`;
const BASE_URL = process.env.BASE_URL || "http://dte.us1a.cirrus.ibm.com";
const VERBOSE = process.env.LOG_VERBOSE || false;

const RATING_DIMENSIONS = "business"; //"complexity,business,reuse";

export const getTokenFromAuthorization = (opts = {}) => {
  return opts &&
    opts.headers &&
    opts.headers.Authorization &&
    opts.headers.Authorization.includes("Bearer ")
    ? opts.headers.Authorization.split("Bearer ")[1]
    : "";
};

export const getSearchBase = () => {
  return process.env.ELASTICSEARCH ? `${BASE_URL}/api/search/` : API_URL;
};

export const resposeError = async (resp) => {
  let result;
  try {
    const json = resp && (await resp.json());
    if (json && json.error) result = json.error;
  } catch (err) {
    // console.log("resposeErrors error", err.message);
  }
  return result;
};

export const errorHandler = async (resp) => {
  if (!resp) throw Error("Invalid response");
  if (!resp.ok) {
    let error = await resposeError(resp);
    if (error) throw Error(error);
    throw Error(resp.statusText || "Unknown");
  }
  return resp;
};

export const fetcher = (url, opts = {}) =>
  fetch(url, prepare(opts))
    .then(errorHandler)
    .then((r) => r.json());

export function prepare(options = {}, additional = {}) {
  const defaults = {
    method: "GET", // default method
    mode: "cors", // no-cors, cors, *same-origin
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", //
    // redirect: "follow", // manual, *follow, error
    rejectUnauthorized: false, // allow self signed
    headers: {
      "Content-type": "application/json",
    },
    // redirect: "follow",
    // referrer: "no-referrer", // no-referrer, *client
  };
  // merge the defaults with options and additional then make sure we dont send the session (too big)
  let payload = omit(merge(defaults, options, additional), [process.env.SESSION_NAME]);
  // console.log("prepare fetch options", payload);
  return payload;
}

export function get(url, opts = {}, raw = false) {
  if (VERBOSE) console.log("get", url, JSON.stringify(opts));
  return fetch(`${API_URL}${url}`, prepare(opts))
    .then(errorHandler)
    .then((res) => (raw ? res : res.json()))
    .then((data) => {
      if (VERBOSE) console.log("get", url, data);
      return data;
    })
    .catch((err) => {
      // console.log(`get error:`, err.message || err);
      // return err;
      return { error: err.message || err };
    });
}

export function search(model, query = {}, opts = {}) {
  let url = `${getSearchBase()}${model}/_search`;
  if (VERBOSE) console.log("search", model, url, JSON.stringify(query), JSON.stringify(opts));
  return fetch(url, prepare({ method: "POST", body: JSON.stringify(query) }, opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => json.hits)
    .then((hits) => hits.hits)
    .then((json) => {
      if (VERBOSE) console.log("search", model, query, json);
      return json ? json.map((o) => o._source) : [];
    })
    .catch((err) => {
      console.log(`${model} find error:`, err.message || err, "for", url.toString());
      return { error: err.message || err };
      // return err;
    });
}

export function doc(model, id = 0, opts = {}) {
  // console.log("doc", model, id, opts, new Date());
  let url = `${getSearchBase()}${model}/_doc/${id}`;
  return fetch(url, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      // console.log("-->", new Date());
      if (VERBOSE) console.log("doc", model, id, json);
      return json && json.found && json._source ? json._source : {};
    })
    .catch((err) => {
      console.log(`${model} doc error:`, err.message || err, "for", url.toString());
      return { error: err.message || err };
      // return err;
    });
}

export function find(model, query = "", opts = {}) {
  const { limit = 50, sort, skip = 0, ...rest } = opts;
  let url = new URL(`${API_URL}${model}${query}`);
  if (limit && !url.searchParams.get("limit")) url.searchParams.set("limit", limit);
  if (sort && !url.searchParams.get("sort")) url.searchParams.set("sort", sort);
  if (skip && !url.searchParams.get("skip")) url.searchParams.set("skip", skip);
  if (VERBOSE) console.log("find", model, url, JSON.stringify(query), JSON.stringify(opts));
  return fetch(url.toString(), prepare(rest))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("find", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} find error:`, err.message || err);
      return { error: err.message || err };
      // return err;
    });
}

export function count(model, query, opts = {}) {
  const { limit = 1, sort, skip = 0, ...rest } = opts;
  let url = new URL(`${API_URL}${model}${query}`);
  if (limit && !url.searchParams.get("limit")) url.searchParams.set("limit", limit);
  if (sort && !url.searchParams.get("sort")) url.searchParams.set("sort", sort);
  if (skip && !url.searchParams.get("skip")) url.searchParams.set("skip", skip);
  if (VERBOSE) console.log("count", model, url, JSON.stringify(query), JSON.stringify(opts));
  return fetch(url.toString(), prepare(rest))
    .then(errorHandler)
    .then((resp) => {
      let c = 0;
      let h = resp && resp.headers;
      for (let r of h.entries()) {
        if (r && r[0] && r[0].toString().toLowerCase() === "x-total-count") {
          c = r[1];
          break;
        }
      }
      return c;
    })
    .then((c) => c && parseInt(c))
    .catch((err) => {
      console.log(`${model} count error:`, err.message || err);
      return { error: err.message || err };
      // return err;
    });
}

export function findOne(model, id = 0, opts = {}, normalize = false) {
  if (VERBOSE) console.log("findOne", model, id, JSON.stringify(opts));
  return fetch(`${API_URL}${model}/${id}${normalize ? "/normalize" : ""}`, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      // console.log("-->", new Date());
      if (VERBOSE) console.log("findOne", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} findOne error:`, err.message || err);
      return { error: err.message || err };
      // return err;
    });
}

export function describe(model, opts = {}) {
  if (VERBOSE) console.log("describe", model, JSON.stringify(opts));
  return fetch(`${API_URL}${model}/describe`, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("describe", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} describe error:`, err.message || err);
      return { error: err.message || err };
      // return err;
    });
}

export function validate(model, payload = {}, opts = {}) {
  if (VERBOSE) console.log("validate", model, JSON.stringify(payload), JSON.stringify(opts));
  return fetch(
    `${API_URL}${model}/validate`,
    prepare({ method: "POST", body: JSON.stringify(payload) }, opts)
  )
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("validate", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} validate error:`, err.message || err);
      return { error: err.message || err };
      // return err;
    });
}

export function audit(model, id, opts = {}) {
  if (VERBOSE) console.log("audit", model, id, JSON.stringify(opts));
  return fetch(`${API_URL}${model}/audit/${id}?sort=createdAt%20DESC&limit=2500`, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("audit", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} audit error:`, err.message || err, `${API_URL}${model}/audit/${id}`);
      return { error: err.message || err };
      // return err;
    });
}

export function rate(model, payload, opts = {}) {
  const { id, dimension = "default", ...rest } = payload;
  if (VERBOSE) console.log("audit", model, JSON.stringify(payload), JSON.stringify(opts));
  return fetch(
    `${API_URL}${model}/rating/${id}/${dimension}`,
    prepare({ method: "POST", body: JSON.stringify(rest) }, opts)
  )
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("rate", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} rating error:`, err.message || err, `${API_URL}${model}/rating/${id}`);
      return { error: err.message || err };
      // return err;
    });
}

export function rating(model, id, opts = {}) {
  if (VERBOSE) console.log("rating", model, id, JSON.stringify(opts));
  return fetch(`${API_URL}${model}/rating/${id}/${RATING_DIMENSIONS}`, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("rating", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} rating error:`, err.message || err, `${API_URL}${model}/rating/${id}`);
      return { error: err.message || err };
      // return err;
    });
}

export function comment(model, payload, opts = {}) {
  if (VERBOSE) console.log("comment", model, JSON.stringify(payload), JSON.stringify(opts));
  const { id, ...rest } = payload;
  return fetch(
    `${API_URL}${model}/comment/${id}`,
    prepare({ method: "POST", body: JSON.stringify(rest) }, opts)
  )
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("comment", model, json);
      return json;
    })
    .catch((err) => {
      console.log(
        `${model} comment error:`,
        err.message || err,
        `${API_URL}${model}/comment/${id}`
      );
      return { error: err.message || err };
      // return err;
    });
}

export function destroyComment(model, payload, opts = {}) {
  if (VERBOSE) console.log("destroyComment", model, JSON.stringify(payload), JSON.stringify(opts));
  const { id, uid, ...rest } = payload;
  return fetch(
    `${API_URL}${model}/comment/${id}/${uid}`,
    prepare({ method: "DELETE", body: JSON.stringify(rest) }, opts)
  )
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("destroyComment", model, json);
      return json;
    })
    .catch((err) => {
      console.log(
        `${model} destroyComment error:`,
        err.message || err,
        `${API_URL}${model}/comment/${id}/${uid}`
      );
      return { error: err.message || err };
      // return err;
    });
}

export function comments(model, id, opts = {}) {
  if (VERBOSE) console.log("comments", model, id, JSON.stringify(opts));
  return fetch(`${API_URL}${model}/comment/${id}`, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("comments", model, json);
      return json;
    })
    .catch((err) => {
      console.log(
        `${model} comments error:`,
        err.message || err,
        `${API_URL}${model}/comment/${id}`
      );
      return { error: err.message || err };
      // return err;
    });
}

export function create(model, payload = {}, opts = {}) {
  if (VERBOSE) console.log("comments", model, JSON.stringify(payload), JSON.stringify(opts));
  // eslint-disable-next-line  no-unused-vars
  const { id, ...rest } = payload; // strip id from the payload
  return fetch(`${API_URL}${model}`, prepare({ method: "POST", body: JSON.stringify(rest) }, opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("create", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} create error:`, err.message || err, `${API_URL}${model}`, payload);
      return { error: err.message || err };
      // return err;
    });
}

export function update(model, payload = {}, opts = {}) {
  if (VERBOSE) console.log("update", model, JSON.stringify(payload), JSON.stringify(opts));
  const { id } = payload; // grab the id
  return fetch(
    `${API_URL}${model}/${id}`,
    prepare({ method: "PATCH", body: JSON.stringify(payload) }, opts)
  )
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("update", model, json);
      return json;
    })
    .catch((err) => {
      console.log(
        `${model} update error:`,
        err.message || err,
        `${API_URL}${model}/${id}`,
        payload
      );
      return { error: err.message || err };
      // return err;
    });
}

export async function createOrUpdate(model, payload = {}, opts = {}, id = "id") {
  if (VERBOSE)
    console.log("createOrUpdate", model, JSON.stringify(payload), JSON.stringify(opts), id);
  return payload[id] && payload[id] !== null
    ? update(model, payload, opts)
    : create(model, payload, opts);
}

export function destroy(model, id, opts = {}) {
  if (VERBOSE) console.log("destroy", model, id, JSON.stringify(opts));
  return fetch(`${API_URL}${model}/${id}`, prepare({ method: "DELETE" }, opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("destroy", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} destroy error:`, err.message || err, `${API_URL}${model}/${id}`);
      return { error: err.message || err };
      // return err;
    });
}

export function reindex(model, id, opts = {}) {
  if (VERBOSE) console.log("reindex", model, id, JSON.stringify(opts));
  let url = id ? `${API_URL}${model}/${id}/_reindex` : `${API_URL}${model}/_reindex`;
  return fetch(url, prepare(opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => {
      // console.log("reindex", model, json);
      if (VERBOSE) console.log("reindex", model, json);
      return json;
    })
    .catch((err) => {
      console.log(`${model} reindex error:`, err.message || err);
      return { error: err.message || err };
      // return err;
    });
}

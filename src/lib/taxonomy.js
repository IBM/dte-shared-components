import fetch from "isomorphic-unfetch";
import * as crud from "./crud";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const NAME = "ut";
const API_URL = process.env.API_URL;
const API_PATH_FLAT = "ut/flat";
const API_PATH_NONFLAT = "ut/nonflat";

const CSV_EXPORT_OPTIONS = {
  fields: [
    "idvalue",
    "shortname",
    "longname",
    "utlevel10description",
    "gbtlevel10description",
    "utlevel15description",
    "utlevel17description",
    "utlevel20description",
    "gbtlevel20description",
    "utlevel30description",
    "gbtlevel30description",
    "utlevel35description",
    "utlevel10",
    "utlevel15",
    "utlevel17",
    "utlevel20",
    "utlevel30",
    "utlevel35",
  ],
};

export function getCsvOptions(opts = {}) {
  return { ...CSV_EXPORT_OPTIONS, ...opts };
}

export function prepare(options = {}, additional = {}) {
  const defaults = {
    method: "GET", // default method
    mode: "cors", // no-cors, cors, *same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin",
    // rejectUnauthorized: false,
    headers: {
      "Content-type": "application/json",
    },
  };
  return { ...defaults, ...options, ...additional };
}

function query(path, params, opts = {}) {
  return fetch(`${API_URL}${path}${params}`, prepare(opts))
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.log(`taxonomy query error:`, err.message || err);
      return err;
    });
}

/*   some util functions */

// normalize the records to ensure, in all cases, we have
// name, utcode, utlevel

function normalizeNonFlatRecords(list) {
  return list.map((record) => {
    return {
      name: record.utdescription,
      utcode: record.utcode,
      utlevel: record.utlevel,
      utparent: record.utparent,
    };
  });
}

function normalizeFlatProductsRecords(list) {
  return list.map((record) => {
    return {
      name: record.utlevel30description,
      description: record.gbtlevel30description || null,
      utcode: record.utlevel30,
      utlevel: "30",
      category: {
        name: record.utlevel15description,
        utcode: record.utlevel15,
        utlevel: "15",
      },
      businessUnit: {
        name: record.utlevel10description,
        utcode: record.utlevel10,
        utlevel: "10",
      },
      utcodes: {
        10: record.utlevel10 || "",
        15: record.utlevel15 || "",
        17: record.utlevel17 || "",
        20: record.utlevel20 || "",
        30: record.utlevel30 || "",
      },
      utdescriptions: {
        10: record.utlevel10description || "",
        15: record.utlevel15description || "",
        17: record.utlevel17description || "",
        20: record.utlevel20description || "",
        30: record.utlevel30description || "",
      },
    };
  });
}

/* ------------------------ */

// using non flat api
export async function findBUsByName(name = "") {
  try {
    const result = await query(API_PATH_NONFLAT, `/ut10/${name}`);
    return result && result.length > 0 ? normalizeNonFlatRecords(result) : [];
  } catch (err) {
    console.log("Error", err.message || err);
    return [];
  }
}

// using non flat api
export async function findCategoriesByName(name = "") {
  try {
    const result = await query(API_PATH_NONFLAT, `/ut15/${name}`);
    return result && result.length > 0 ? normalizeNonFlatRecords(result) : [];
  } catch (err) {
    console.log("Error", err.message || err);
    return [];
  }
}

// using non flat api
export async function findProductsByName(name = "") {
  try {
    const result = await query(API_PATH_NONFLAT, `/ut30/${name}`);
    return result && result.length > 0 ? normalizeNonFlatRecords(result) : [];
  } catch (err) {
    console.log("Error", err.message || err);
    return [];
  }
}

// flat apis
export async function findFlatProductsByName(name = "", normalize = true) {
  try {
    const result = await query(API_PATH_FLAT, `/ut30/name/${name}`);
    if (result && result.length > 0) {
      return normalize ? normalizeFlatProductsRecords(result) : result;
    } else return [];
  } catch (err) {
    console.log("Error", err.message || err);
    return [];
  }
}

// export async function getProductFlatByCode(code) {
//   if (!code) return {};
//   const result = await query(API_PATH_FLAT, `/ut30/code/${code}`);
//   return result && result.length > 0 ? result[0] : {};
// }

// search global by utdescription, and convert into name

export function search(query = {}, opts = {}) {
  return crud.search(NAME, query, opts);
}

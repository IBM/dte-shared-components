import fetch from "isomorphic-unfetch";

const API_URL = process.env.API_URL;
const API_PATH = "bluepages/";

export function prepare(options = {}, additional = {}) {
  const defaults = {
    method: "GET", // default method
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin",
    // rejectUnauthorized: false,
    headers: {
      "Content-type": "application/json",
    },
  };
  return { ...defaults, ...options, ...additional };
}

function query(params = "", opts = {}) {
  return fetch(`${API_URL}${API_PATH}${params}`, prepare(opts))
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.log(`bluepages query error:`, err.message || err);
      return err;
    });
}

function normalizeResultToPrimitives(data, property) {
  if (!data) return [];
  return data.map((item) => item[property]);
}

export async function searchByEmail(email) {
  if (!email) return [];
  if (email.indexOf(",") !== -1) return [];
  let searchTerm, result;
  try {
    // [TODO]: need to disable substring the email when looking up externally as well
    searchTerm = email.indexOf("@") == -1 ? email : email.substring(0, email.indexOf("@"));
    result = await query(`email/${searchTerm.trim().toLowerCase()}`);
    result = normalizeResultToPrimitives(result, "preferredidentity");
  } catch (err) {
    console.log("searchByEmail error:", err.message || err);
  }
  return result;
}

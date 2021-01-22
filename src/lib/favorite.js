import * as Yup from "yup";
import { Favorite32 } from "@carbon/icons-react";
import { merge } from "lodash";
import * as crud from "./crud";

const NAME = "favorite";
const LIMIT = 500;

const DEFAULTS = {
  id: null,
  mid: "",
  model: "",
  user: "",
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    mid: Yup.string().required(),
    model: Yup.string().required(),
    user: Yup.string().required(),
  });
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

export function getIcon(type) {
  switch (type) {
    default:
      return Favorite32;
  }
}

export function find(query) {
  return crud.find(NAME, query, { limit: LIMIT });
}

export function findByUser(user = "") {
  return crud.find(NAME, `?where={"user":"${user}"}`, { limit: LIMIT });
}

export function findByModel(model = "") {
  return crud.find(NAME, `?where={"model":"${model}"}`, { limit: LIMIT });
}

export function findByUserAndModel(user = "", model = "") {
  return crud.find(NAME, `?where={"user":"${user}","model":"${model}"}`, { limit: LIMIT });
}

export function favorites(token, opts = {}) {
  if (!token) return [];
  const options = merge(opts, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  return crud.get("my/favorites", options).catch((err) => {
    console.log("favorites error:", err.message);
    return [];
  });
}

export async function favorited(user = "", model = "", mid = "", opts = {}) {
  let result;
  try {
    result = await crud.find(
      NAME,
      `?where={"user":"${user}","model":"${model}","mid":"${mid}"}&limit=1`,
      opts
    );
    // console.log("favorited", user, model, mid, result);
  } catch (err) {
    // do nothing
  }
  return result && result.length > 0 ? result[0].id : false;
}

export async function favorite(user = "", model = "", mid = "", opts = {}) {
  return crud.create(NAME, { user: user, model: model, mid: mid }, opts);
}

export async function unfavorite(user = "", model = "", mid = "", id = null, opts = {}) {
  if (id && id !== true) return crud.destroy(NAME, id, opts);
  let result;
  try {
    result = await favorited(user, model, mid);
    if (!result) return false;
  } catch (err) {
    return false;
  }
  return crud.destroy(NAME, result, opts);
}

export function findOne(id) {
  return crud.findOne(NAME, id);
}

export function describe() {
  return crud.describe(NAME);
}

export function validate(payload) {
  return crud.validate(NAME, payload);
}

export function create(payload, opts = {}) {
  return crud.create(NAME, payload, opts);
}

export function update(payload, opts = {}) {
  return crud.update(NAME, payload, opts);
}

export function createOrUpdate(payload, opts = {}) {
  return crud.createOrUpdate(NAME, payload, opts);
}

export function destroy(id, opts = {}) {
  return crud.destroy(NAME, id, opts);
}

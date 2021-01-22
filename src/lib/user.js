import { useEffect } from "react";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import * as Yup from "yup";

import { prepare, errorHandler, fetcher as crudFetcher } from "./crud";
import { safeOriginalUrl } from "./auth";
import { find as getAllOptions, getOptionsByType } from "./option";
import redirect from "./redirect";

const AUTH_URL = process.env.AUTH_URL || "";
const PING_URL = `${AUTH_URL}/ping`;

const LIMIT = 100;

const DEFAULTS = {
  type: "user",
  name: "",
  realm: "local",
  label: "",
  roles: ["user", "ibmer"],
  status: "active",
  iui: "",
  userid: "",
  emailaddress: "",
  activatedby: "dte2",
  organization: "",
  templatequota: 3,
  instancequota: 5,
  svmlimit: 3000,
  storagelimit: 2000000,
  region: "svl",
  country: "us",
  licenseaccepted: 1,
};

export const fetcher = (url) =>
  crudFetcher(url, {
    mode: "cors",
    redirect: "follow",
  });

export const pinger = (url) =>
  fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-store",
    credentials: "same-origin",
    rejectUnauthorized: false,
  }).then((r) => r.json());

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
  originalUrl = "/",
} = {}) {
  const now = Math.floor(new Date().getTime() / 1000); // what time is it now?
  const { asPath } = Router; // get the current router path
  const { data: user, mutate: mutateUser, error, isValidating: userIsValidating } = useSWR(
    "/api/user",
    fetcher
  );
  const { data: ping, error: pingError } = useSWR(PING_URL, pinger);
  useEffect(() => {
    // console.log('redirectTo', redirectTo, 'user', user)
    if (!redirectTo && !user) return; // nothing to do ... return
    if (
      (redirectTo && !redirectIfFound && user && !user.isLoggedIn) || // redirect if not found and not logged in
      (redirectIfFound && user && user.isLoggedIn) || // redirect if found and logged in
      (redirectTo && user && user.exp && user.exp <= now) // is the token expired?
    ) {
      if (asPath) originalUrl = safeOriginalUrl(asPath); // try to get the current path
      redirect(`${redirectTo}?originalUrl=${originalUrl}`); // redirect with originalUrl
    }
  }, [user, redirectIfFound, redirectTo, originalUrl]);
  useEffect(() => {
    if (!ping || !user || error || pingError) return;
    if (user && user.isLoggedIn && ping && !ping.authenticated)
      // console.log("uh oh ... authenticated state mismatch");
      // maybe do a re-auth if we get a mismatch???
      return;
  }, [ping]);
  return { user, mutateUser, userIsValidating };
}

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    type: Yup.string().nullable().max(250),
    name: Yup.string().required().max(250),
    realm: Yup.string().nullable().max(100),
    label: Yup.string().nullable().max(250),
    roles: Yup.array().nullable(),
    status: Yup.string().nullable().max(50),
    iui: Yup.string().nullable().max(50),
    userid: Yup.string().nullable().max(250),
    emailaddress: Yup.string().nullable().max(250),
    activatedby: Yup.string().nullable().max(100),
    organization: Yup.string().nullable().max(250),
    templatequota: Yup.number().nullable(),
    instancequota: Yup.number().nullable(),
    svmlimit: Yup.number().nullable(),
    storagelimit: Yup.number().nullable(),
    region: Yup.string().nullable().max(100),
    country: Yup.string().nullable().max(100),
    licenseaccepted: Yup.number().nullable(),
    // description: Yup.string().nullable().max(32768),
  });
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

export async function getOptions(type) {
  if (!type) return [];
  const mapper = (o) => {
    return {
      value: o.abbreviation || o.name,
      text: o.name,
      labelText: o.name,
      helperText: o.description || "",
    };
  };
  try {
    switch (type.toString().toLowerCase()) {
      case "roles":
        return await getOptionsByType("UserRole");
      case "persona":
        return await getOptionsByType("UserPersona");
      case "status":
      case "statuses":
        return await getOptionsByType("UserStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "all":
        var options = await getAllOptions();
        return {
          status: options.filter((o) => o.type === "UserStatus").map(mapper),
          roles: options.filter((o) => o.type === "UserRole").map(mapper),
          persona: options.filter((o) => o.type === "UserPersona").map(mapper),
        };
      default:
        return [];
    }
  } catch (err) {
    return [];
  }
}

export function find(userid, opts = {}) {
  // console.log("find", userid, opts);
  return (
    fetch(`${AUTH_URL}/users/${userid}?limit=${LIMIT}`, prepare(opts))
      .then(errorHandler)
      .then((res) => res.json())
      // .then((json) => json && json.map((o) => cleanup(o)))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return { error: err.message || err };
      })
  );
}

export function findOne(id, opts = {}) {
  if (!id) return { error: "no id" };
  // console.log("findOne", id, opts);
  return (
    fetch(`${AUTH_URL}/user/${id}`, prepare(opts))
      .then(errorHandler)
      .then((res) => res.json())
      // .then((json) => cleanup(json))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return { error: err.message || err };
      })
  );
}

export function update(id, payload = {}, opts = {}) {
  if (!id) return { error: "no id" };
  return fetch(
    `${AUTH_URL}/user/${id}`,
    prepare({ method: "PATCH", body: JSON.stringify(payload) }, opts)
  )
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => cleanup(json))
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { error: err.message || err };
    });
}

export function create(payload = {}, opts = {}) {
  return fetch(`${AUTH_URL}/user`, prepare({ method: "POST", body: JSON.stringify(payload) }, opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => cleanup(json))
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { error: err.message || err };
    });
}

export function createOrUpdate(payload, opts = {}) {
  if (payload.id || payload._id) return update(payload.id || payload._id, payload, opts);
  else {
    delete payload.id;
    return create(payload, opts);
  }
}

export function destroy(id, opts = {}) {
  if (!id) return { error: "no id" };
  return fetch(`${AUTH_URL}/user/${id}`, prepare({ method: "DELETE" }, opts))
    .then(errorHandler)
    .then((res) => res.json())
    .then((json) => cleanup(json))
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return { error: err.message || err };
    });
}

// export function find(query) {
//   return crud.find(NAME, query, { limit: LIMIT });
// }
// export function findOne(id) {
//   return crud.findOne(NAME, id);
// }
// export function describe() {
//   return crud.describe(NAME);
// }
// export function create(payload, opts={}) {
//   return crud.create(NAME, payload, opts);
// }
// export function update(payload, opts={}) {
//   return crud.update(NAME, payload, opts);
// }
// export function createOrUpdate(payload, opts={}) {
//   return crud.createOrUpdate(NAME, payload, opts);
// }
// export function destroy(id, opts={}) {
//   return crud.destroy(NAME, id, opts);
// }

const cleanup = (o) => {
  let obj = { ...o };
  if (obj._id || obj.id) obj.id = obj._id || obj.id || undefined;
  if (obj._id) delete obj._id;
  if (obj._rev) delete obj._rev;
  // if (obj.roles) obj.roles = obj.roles.join(', ');
  // if (obj.lastlogindate) obj.lastlogindate = toLocaleDateString(new Date(obj.lastlogindate),'llll');
  return obj;
};

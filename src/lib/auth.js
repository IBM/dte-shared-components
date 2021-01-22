import fetch from "isomorphic-unfetch";
import intersection from "lodash/intersection";
import { pick, merge } from "lodash";

const AUTH_URL = process.env.AUTH_URL || "";
const PING_URL = `${AUTH_URL}/ping`;
const PROFILE_URL = `${AUTH_URL}/profile`;
const TOKEN_URL = `${AUTH_URL}/token`;
const PICK = ["roles", "persona", "company", "iat", "exp"];

class HTTPError extends Error {
  constructor(code, message, extras) {
    super(message);
    if (arguments.length >= 3 && extras) {
      Object.assign(this, extras);
    }
    this.statusCode = code;
  }
}

export const safeOriginalUrl = (url) => {
  try {
    if (!url || url === "") return "/";
    if (url.startsWith("/api")) return "/";
    return url;
  } catch (err) {
    console.log("safeOriginalUrl error:", err.message || err);
    return "/";
  }
};

export const getProfile = async (token, options = {}) => {
  if (!token) return {};
  const defaults = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    rejectUnauthorized: false, // allow self signed
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Cache": "no-cache",
    },
  };
  // console.log("getProfile", PROFILE_URL, merge(defaults, options));
  return fetch(`${PROFILE_URL}`, merge(defaults, options))
    .then((resp) => {
      if (!resp) throw Error("Invalid response");
      if (!resp.ok) throw new HTTPError(resp.status, resp.statusText);
      return resp;
    })
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      // return { error:err.message || err, statusCode:err.statusCode };
      throw err;
    });
};

export const getUser = async (token, options = {}) => {
  if (!token) return {};
  const defaults = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    rejectUnauthorized: false, // allow self signed
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Cache": "no-cache",
    },
  };
  // console.log("getUser", TOKEN_URL, merge(defaults, options));
  return fetch(`${TOKEN_URL}`, merge(defaults, options))
    .then((resp) => {
      if (!resp) throw Error("Invalid response");
      if (!resp.ok) throw new HTTPError(resp.status, resp.statusText);
      return resp;
    })
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      // return { error:err.message || err, statusCode:err.statusCode };
      throw err;
    });
};

export const ping = async (options = {}) => {
  const defaults = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    rejectUnauthorized: false,
    headers: {
      "Content-Type": "application/json",
      "Cache": "no-cache",
    },
  };
  // console.log("ping", PING_URL, merge(defaults, options));
  return fetch(`${PING_URL}`, merge(defaults, options))
    .then((resp) => {
      if (!resp) throw Error("Invalid response");
      if (!resp.ok) throw new HTTPError(resp.status, resp.statusText);
      return resp;
    })
    .then((resp) => resp.json())
    .then((json) => {
      return json;
    })
    .catch((err) => {
      return { status: "error", error: err.message || err };
      // throw err;
    });
};

export const normalizeUser = (user = {}) => {
  let payload = pick(user, PICK);
  payload.email = getEmail(user);
  payload.uid = getIUI(user);
  payload.name = getDisplayName(user);
  // console.log('normalizeUser',JSON.stringify(payload,null,2))
  return payload;
};

export const getIUI = (user = {}) => {
  return (
    user.id ||
    user.uid ||
    user.sub ||
    user.uniqueSecurityName ||
    user.iui ||
    (user.user && user.user.iui)
  );
};

export const getDisplayName = (user = {}) => {
  return user.displayName || user.name || (user.user && user.user.name) || "";
};

export const getEmail = (user = {}) => {
  return (
    user.preferred_username ||
    user.email ||
    user.emailAddress ||
    user.emailaddress ||
    user.userid ||
    (user.user && user.user.emailaddress) ||
    (user.user && user.user.userid) ||
    ""
  )
    .toString()
    .toLowerCase();
};

export const getToken = (user = {}) => {
  return (user && user.token) || undefined;
};

// come back and get this working ...
export const getAuthorization = (user = {}) => {
  // return {};
  const token = getToken(user);
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  // return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const isLoggedIn = (user = {}, acl) => {
  if (!acl) return user && user.isLoggedIn === true;
  if (user && user.isLoggedIn === true && user.roles) return hasAuthority(acl, user.roles);
  return false;
};

/**
 * Check if a user has the proper authority
 *
 * @param {array} acl - Array of authority to allow
 * @param {array} roles - Array of roles
 * @return {boolean}
 */
export const hasAuthority = (acl, roles) => {
  if (!acl) return true; // no acls ... default to true
  const commonality = intersection(acl, roles); // chech the intersection
  return commonality && commonality.length > 0; // do we have any commonality
};

// hasAuthority shorthands
export const isAdmin = ({ roles = [] }) => hasAuthority(process.env.ROLES_ADMIN, roles);
export const isManager = ({ roles = [] }) => hasAuthority(process.env.ROLES_MANAGER, roles);
export const isModerator = ({ roles = [] }) => hasAuthority(process.env.ROLES_MODERATOR, roles);
export const isContributor = ({ roles = [] }) => hasAuthority(process.env.ROLES_CONTRIBUTOR, roles);
export const isUser = ({ roles = [] }) => hasAuthority(process.env.ROLES_USER, roles);

/**
 * Check if a user has the proper visibility
 *
 * @param {array} acl - Array of visibility to allow
 * @param {object|string} persona - User object or persona string
 * @return {boolean}
 */
export const hasVisibility = (acl, persona) => {
  if (!acl) return true; // no acls ... default to all true
  if (!persona) return false; // no persona ... default to false
  let p;
  try {
    // if this is a user object verify that it has a persona and assign it to p
    p =
      typeof persona === "object" && "persona" in persona && persona.persona
        ? persona.persona
        : persona;
  } catch (err) {
    console.log("hasVisibility error", err.message || err);
  }
  if (!p || typeof p !== "string") return false; // !persona or not string default to false only ... one persona allowed
  const commonality = intersection(acl, [p]); // chech the intersection
  return commonality && commonality.length > 0; // do we have any commonality
};

// persona shorthands
export const isIbmer = ({ persona = "unknown" }) => persona === "ibmer"; // are you an ibmer?
export const isPartner = ({ persona = "unknown" }) => persona === "partner"; // are you a partner?
export const isCustomer = ({ persona = "unknown" }) =>
  persona === "customer" || persona === "unknown"; // are you a customer?

export const isVisibleTo = (visibility, list = []) => {
  if (!visibility) return true; // no visibility ... default to true
  const commonality = intersection(visibility, list); // chech the intersection
  return commonality && commonality.length > 0; // do we have any commonality
};

export const isVisible = (data, user) => {
  if (!data) return true; // no data ... no reason to worry
  if (data && (!data.visibility || (data.visibility && data.visibility.length === 0))) return true; // no visibility settings === wide open
  if (!user) return false; // no user ... no access
  if (isIbmer(user) && isVisibleTo(data.visibility, ["IBMers"])) return true; // user is ibmer and the data is private
  if (isPartner(user) && isVisibleTo(data.visibility, ["Business Partners"])) return true; // user is parner and the data is public
  if (isCustomer(user) && isVisibleTo(data.visibility, ["Customers"])) return true; // user is parner and the data is public
  return false; // no customer access for now ... return false
};

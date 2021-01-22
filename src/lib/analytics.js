import Router from "next/router";
import { debounce, startCase } from "lodash";

import { getIUI, getDisplayName, getEmail } from "./auth";
import { stripMarkdown, toBoolean } from "./utils";

import digitalData from "data/digitaldata.json";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Documentation
//
// Data dictionary https://ibm.account.box.com/login?redirect_url=%2Fnotes%2F718020074221%3Fs%3Dbax3jafml9h4q0t77ns29kppw065db68
// Segment https://use-cases-guide.production.us-south.containers.appdomain.cloud/app/developer-guides/segment-essentials
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SEGMENTKEY = process.env.SEGMENTKEY || "";
const PRODUCTTITLE = process.env.SEGMENT_PRODUCTTITLE || "IBM DTE";
const PLATFORMTITLE = process.env.SEGMENT_PLATFORMTITLE || "DTE2";
const SUFFIX = process.env.SEGMENT_SUFFIX || "_DEMO";
const TRACKING = toBoolean(process.env.TRACKING || false);
const REALM = process.env.SEGMENT_REALM || "IBMid";
const BASE_URL = process.env.BASE_URL || "";
const DEBUG = toBoolean(process.env.ANALYTICS_DEBUG || false);
const ATTEMPT_TIMEOUT = 1000;
const ATTEMPT_MAX = 10;
const DEBOUCE_DELAY = 500;
const MAX_WAIT = 5000;

const getPageName = (data) => {
  if (data && data.collection && data.collection.name) return stripMarkdown(data.collection.name);
  return stripMarkdown(data.name || data.title || "");
};

const getBusinessUnit = (data, value = "utcode") => {
  if (!data) return undefined;
  let result, businessUnits;
  try {
    if (
      data.collection &&
      data.collection.businessUnits &&
      Array.isArray(data.collection.businessUnits)
    )
      businessUnits = data.collection.businessUnits.filter((o) => o && o[value]);
    else if (data.businessUnits && Array.isArray(data.businessUnits))
      businessUnits = data.businessUnits.filter((o) => o && o[value]);
    if (businessUnits && businessUnits.length > 0) result = businessUnits[0][value];
  } catch (err) {
    console.log("getBusinessUnit error", err.message || err);
  }
  return result || "";
};

const getCategory = (data, value = "utcode") => {
  if (!data) return undefined;
  let result, categories;
  try {
    if (data.collection && data.collection.categories && Array.isArray(data.collection.categories))
      categories = data.collection.categories.filter((o) => o && o[value]);
    else if (data.categories && Array.isArray(data.categories))
      categories = data.categories.filter((o) => o && o[value]);
    if (categories && categories.length > 0) result = categories[0][value];
  } catch (err) {
    console.log("getCategory error", err.message || err);
  }
  return result || "";
};

const getProduct = (data, value = "utcode") => {
  if (!data) return undefined;
  let result, products;
  try {
    if (data.collection && data.collection.products && Array.isArray(data.collection.products))
      products = data.collection.products.filter((o) => o && o[value]);
    else if (data.products && Array.isArray(data.products))
      products = data.products.filter((o) => o && o[value]);
    if (products && products.length > 0) result = products[0][value];
  } catch (err) {
    console.log("getProduct error", err.message || err);
  }
  return result || "";
};

const getUrl = (value, defaultUrl = "/") => {
  let url;
  if (typeof window === "undefined") {
    url = value || defaultUrl;
  } else {
    const { asPath } = Router;
    url = value || asPath || defaultUrl;
  }
  if (url && url.startsWith("/")) url = `${BASE_URL}${url}`;
  return url;
};

const getPaths = (data) => {
  const generateUrl = (i) => {
    return data && data.simple ? `/asset/${i}` : `/collection/${i}`;
  };
  let paths = [];
  if (!data) return paths;
  if (data.id) paths.push(generateUrl(data.id));
  if (data.oid) paths.push(generateUrl(data.oid));
  if (data.slug) paths.push(generateUrl(data.slug));
  return paths;
};

const getType = (data, firstOfArray = true) => {
  if (!data) return;
  let result;
  const formatter = (v) => {
    return v
      .map((o) => startCase(o.toString().toLowerCase().trim()))
      .filter((o) => o && o !== "")
      .join(", ");
  };
  try {
    if (data && data.name && "slug" in data) {
      // some sort of collection or Asset
      if (data && data.name && data.name.match(/Activation Kit/i)) result = "Activation Kit";
      else if (data.url || data.simple === true) result = "Asset";
      else result = "Collection";
    } else if (!data.type && "infrastructure" in data) {
      result = "Platform"; // a plaform
    } else if (data && data.type && Array.isArray(data.type)) {
      result = firstOfArray ? startCase(data.type[0]) : formatter(data.type); // some list of types
    } else if (data.type) {
      result = startCase(data.type); // single type
    } else {
      result = "Page"; // default to page
    }
  } catch (err) {
    console.log("getType error", err.message || err);
  }
  return result || "";
};

const getFlags = (data, firstOfArray = false, delim = ", ") => {
  if (!data) return;
  let result;
  try {
    if (data && data.flags) {
      if (Array.isArray(data.flags) && firstOfArray) result = data.flags[0];
      else if (Array.isArray(data.flags)) result = data.flags.join(delim);
      else result = data.flags;
    }
  } catch (err) {
    console.log("getFlags error", err.message || err);
  }
  return result || "";
};

export function trackCTA(data = {}) {
  if (!data) return;
  let type = getType(data);
  let pageName = getPageName(data);
  let productName = getProduct(data, "name");
  let payload = {
    platformTitle: PLATFORMTITLE,
    CTA: `Clicked ${type}`,
    channel: "webpage",
    name: stripMarkdown(data.name || data.title || ""),
    type: type,
    category: type,
    observeType: getFlags(data),
    url: getUrl(data.url),
    UT30: getProduct(data),
    UT15: getCategory(data),
    UT10: getBusinessUnit(data),
  };
  let paths = getPaths(data);
  if (paths && paths.length > 0) payload.path = paths.join(",");
  payload.productTitle = productName ? `${productName}${SUFFIX}` : PRODUCTTITLE;
  if (data.id) payload.instanceId = data.id;
  if (pageName) payload.pageName = payload.pageTitle = pageName;
  if (data.milestone) payload.milestoneName = data.milestone || "";
  if (DEBUG) console.log("trackCTA", data, payload);
  trackEvent("CTA Clicked", payload);
}

export function trackPageView(data = {}) {
  if (!data) return;
  let type = getType(data);
  let pageName = getPageName(data);
  let productName = getProduct(data, "name");
  let payload = {
    platformTitle: PLATFORMTITLE,
    name: stripMarkdown(data.name || data.title || ""),
    category: type,
    observeType: getFlags(data),
    url: getUrl(data.url),
    UT30: getProduct(data),
    UT15: getCategory(data),
    UT10: getBusinessUnit(data),
  };
  let paths = getPaths(data);
  if (paths && paths.length > 0) payload.path = paths.join(",");
  payload.productTitle = productName ? `${productName}${SUFFIX}` : PRODUCTTITLE;
  if (pageName) payload.page = pageName;
  if (data.milestone) payload.milestoneName = data.milestone || "";
  if (DEBUG) console.log("trackPageView", data, payload);
  trackEvent("Page Viewed", payload);
}

export function trackJourney(data = {}) {
  if (!data) return;
  let type = getType(data);
  let pageName = getPageName(data);
  let productName = getProduct(data, "name");
  let payload = {
    platformTitle: PLATFORMTITLE,
    name: stripMarkdown(data.name || data.title || ""),
    category: type,
    observeType: getFlags(data),
    url: getUrl(data.url),
    UT30: getProduct(data),
    UT15: getCategory(data),
    UT10: getBusinessUnit(data),
  };
  let paths = getPaths(data);
  if (paths && paths.length > 0) payload.path = paths.join(",");
  payload.productTitle = productName ? `${productName}${SUFFIX}` : PRODUCTTITLE;
  if (pageName) payload.pageName = payload.pageTitle = pageName;
  if (data.milestone) payload.milestoneName = data.milestone || "";
  else if (pageName) payload.milestoneName = pageName;
  if (DEBUG) console.log("trackJourney", data, payload);
  trackEvent("Navigate UI", payload);
}

export function trackNav(data = {}) {
  if (!data) return;
  let type = data.type || getType(data);
  let pageName = getPageName(data);
  let payload = {
    platformTitle: PLATFORMTITLE,
    name: type,
    category: getType(data),
    observeType: getFlags(data),
    url: getUrl(data.url),
  };
  let paths = getPaths(data);
  if (paths && paths.length > 0) payload.path = paths.join(",");
  if (pageName) payload.pageName = payload.pageTitle = pageName;
  if (data.milestone) payload.milestoneName = data.milestone || "";
  if (DEBUG) console.log("trackNav", data, payload);
  trackEvent("Navigate UI", payload);
}

export function trackLogin(data = {}) {
  if (!data) return;
  let payload = {
    platformTitle: PLATFORMTITLE,
    email: getEmail(data),
    accountId: getIUI(data),
    accountName: getDisplayName(data),
    loginMethod: REALM,
  };
  if (data?.url) {
    payload.url = getUrl(data.url);
    payload.path = data.url;
  }
  if (data?.user?.country) payload.region = data.user.country;
  if (data?.user?.status) payload.accountStatus = data.user.status;
  if (data?.persona) payload.accountLevel = data.persona;
  else if (data?.user?.persona) payload.accountLevel = data.user.persona;
  if (payload?.accountLevel === "partner") {
    if (data?.ceid) payload.accountGroup = data.ceid;
    else if (data?.user?.ceid) payload.accountGroup = data.user.ceid;
    if (data?.user?.organization || data?.user?.company)
      payload.accountGroupName = data?.user?.organization || data?.user?.company;
  }
  // if (DEBUG) console.log("trackLogin", data, payload);
  analyticsEvent("Service Login", payload);
}

export function trackLogout(data = {}) {
  if (!data) return;
  let payload = {
    platformTitle: PLATFORMTITLE,
    email: getEmail(data),
    accountId: getIUI(data),
    accountName: getDisplayName(data),
  };
  if (data?.url) {
    payload.url = getUrl(data.url);
    payload.path = data.url;
  }
  if (data?.user?.country) payload.region = data.user.country;
  if (data?.user?.status) payload.accountStatus = data.user.status;
  if (data?.persona) payload.accountLevel = data.persona;
  else if (data?.user?.persona) payload.accountLevel = data.user.persona;
  if (payload?.accountLevel === "partner") {
    if (data?.ceid) payload.accountGroup = data.ceid;
    else if (data?.user?.ceid) payload.accountGroup = data.user.ceid;
    if (data?.user?.organization || data?.user?.company)
      payload.accountGroupName = data?.user?.organization || data?.user?.company;
  }
  // if (DEBUG) console.log("trackLogin", data, payload);
  analyticsEvent("Service Logout", payload);
}

export function analyticsEvent(type, payload) {
  try {
    const Analytics = require("analytics-node");
    const analytics = new Analytics(SEGMENTKEY);
    if (DEBUG) console.log("analytics.track(", type, payload, ")", new Date());
    // analytics.identify(`${REALM}-${payload.accountId}`, {
    //   realmName: REALM,
    //   uniqueSecurityName: payload.accountId,
    //   email: payload.email,
    // });
    analytics.track({
      userId: `${REALM}-${payload.accountId}`,
      event: type,
      properties: payload,
    });
  } catch (err) {
    console.log("analyticsEvent error:", err.message || err);
  }
}

export function trackEvent(type, payload) {
  try {
    if (!TRACKING) return; // just return is tracking is diabled //throw new Error("tracking disabled");
    if (!window) throw new Error("no window");
    // if (window && window.analytics) throw new Error("unable to access analytics");
    if (window && !window.bluemixAnalytics) throw new Error("unable to access bluemixAnalytics");
    if (!type) throw new Error("no type specified");
    if (!payload) throw new Error("no payload specified");
    if (!payload.platformTitle) payload.platformTitle = PLATFORMTITLE;
    if (DEBUG) console.log("window.bluemixAnalytics.trackEvent(", type, payload, ")", new Date());
    // window.bluemixAnalytics.trackEvent(type, payload);
    execTrackEvent(type, payload);
  } catch (err) {
    console.log(
      "trackEvent error:",
      err.message || err || "unable to track event",
      "for",
      `"${type}"`,
      "with payload",
      payload
    );
  }
}

export function execTrackEvent(type, payload, attempt = 0) {
  if (!type || !payload) return;
  if (typeof window !== "undefined" && window.bluemixAnalytics && window.digitalData)
    window.bluemixAnalytics.trackEvent(type, payload);
  else if (attempt < ATTEMPT_MAX)
    setTimeout(() => execTrackEvent(type, payload, attempt + 1), ATTEMPT_TIMEOUT);
}

export function trackPage(attempt = 0) {
  const debounceTrackPage = debounce(
    () => {
      if (DEBUG) console.log("trackPage", new Date());
      window.bluemixAnalytics.pageEvent();
    },
    DEBOUCE_DELAY,
    { maxWait: MAX_WAIT }
  );
  if (typeof window !== "undefined" && window.bluemixAnalytics && window.digitalData)
    debounceTrackPage();
  else if (attempt < ATTEMPT_MAX) setTimeout(() => trackPage(attempt + 1), ATTEMPT_TIMEOUT);
}

export function tagForSPA(attempt = 0) {
  const debounceTagForSPA = debounce(
    () => {
      if (DEBUG) console.log("tagForSPA", new Date());
      window.createPageviewTagForSPA();
    },
    DEBOUCE_DELAY,
    { maxWait: MAX_WAIT }
  );
  if (typeof window !== "undefined" && window.createPageviewTagForSPA && window.digitalData)
    debounceTagForSPA();
  else if (attempt < ATTEMPT_MAX) setTimeout(() => tagForSPA(attempt + 1), ATTEMPT_TIMEOUT);
}

export function getDigitalData() {
  if (digitalData && digitalData.page && digitalData.page.pageInfo)
    digitalData.page.pageInfo.effectiveDate = new Date().toISOString().split("T")[0];
  digitalData.page.pageInfo.productTitle = PRODUCTTITLE;
  digitalData.page.pageInfo.platformTitle = PLATFORMTITLE;
  digitalData.page.pageInfo.segment = {
    enabled: true, // force segment to be enabled
    key: SEGMENTKEY, // force segment write key
  };
  return digitalData;
}

export function getAnalyticsOptions() {
  return {
    segment_key: SEGMENTKEY, // attach our segment key
    coremetrics: false,
    optimizely: false,
    googleAddServices: false,
    fullStory: false,
  };
}

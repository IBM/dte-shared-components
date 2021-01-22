import moment from "moment";
import { debounce, truncate } from "lodash";

import { stripMarkdown, toBoolean } from "./utils";
import { trackPageView } from "./analytics";

const PLATFORMTITLE = process.env.SEGMENT_PLATFORMTITLE || "DTE2";
const DEBUG = toBoolean(process.env.ANALYTICS_DEBUG || false);
const ATTEMPT_TIMEOUT = 1000;
const ATTEMPT_MAX = 10;
const DEBOUCE_DELAY = 500;
const MAX_WAIT = 5000;

export function applyDigitalData(data, attempt = 0) {
  if (!data) return;
  if (DEBUG) console.log("applyDigitalData", new Date(), attempt);
  if (typeof window !== "undefined" && window.bluemixAnalytics && window.digitalData)
    digitalData(window.digitalData, data);
  else if (attempt < ATTEMPT_MAX)
    setTimeout(() => applyDigitalData(data, attempt + 1), ATTEMPT_TIMEOUT);
}

export function digitalData({ page = {} }, data = {}) {
  try {
    const truncateOptions = { length: 255, separator: /,? +/, omission: "..." };
    if (!page.pageInfo) page.pageInfo = {};
    if (!page.category) page.category = {};
    if (!page.category.ibm) page.category.ibm = {};
    page.pageInfo.pageName = stripMarkdown(data.name || ""); // attach the page name
    page.pageInfo.pageID = data.id; //  attach a page id
    // attach any search info
    if (data.search) page.pageInfo.onsiteSearchTerm = data.search;
    else if (page.pageInfo.onsiteSearchTerm) delete page.pageInfo.onsiteSearchTerm;
    if (data.results) page.pageInfo.onsiteSearchResult = data.results;
    else if (page.pageInfo.onsiteSearchResult) delete page.pageInfo.onsiteSearchResult;
    // update description
    if (data.synopsis || data.description)
      page.pageInfo.description = stripMarkdown(
        data.synopsis || truncate(data.description, truncateOptions)
      );
    else delete page.pageInfo.description;
    // update dates
    if (data.createdAt)
      page.pageInfo.effectiveDate = moment(data.createdAt).toISOString().split("T")[0];
    if (data.updatedAt)
      page.pageInfo.publishDate = moment(data.updatedAt).toISOString().split("T")[0];
    // attach or cleanup category codes
    if (data.businessUnits) {
      let businessUnits = data.businessUnits.filter((o) => o && o.utcode);
      if (businessUnits && businessUnits.length > 0)
        page.category.ibm.ut10 = businessUnits[0].utcode;
    } else if (page.category.ibm.ut10) {
      delete page.category.ibm.ut10;
    }
    if (data.categories) {
      let categories = data.categories.filter((o) => o && o.utcode);
      if (categories && categories.length > 0) page.category.ibm.ut20 = categories[0].utcode;
    } else if (page.category.ibm.ut20) {
      delete page.category.ibm.ut20;
    }
    if (data.products) {
      let products = data.products.filter((o) => o && o.utcode);
      let productNames = data.products.filter((o) => o && o.name);
      if (products && products.length > 0) page.category.ibm.ut30 = products[0].utcode;
      page.pageInfo.productTitle =
        productNames && productNames.length > 0 ? productNames[0].name : "IBM DTE";
    } else {
      if (page.category.ibm.ut30) delete page.category.ibm.ut30;
      page.pageInfo.productTitle = "IBM DTE";
    }
    if (data.flags) {
      if (Array.isArray(data.flags)) page.pageInfo.observeType = data.flags.join(", ");
      else page.pageInfo.observeType = data.flags;
    }
    page.pageInfo.platformTitle = PLATFORMTITLE;
    const tagForSPA = debounce(
      () => {
        if (window && window.createPageviewTagForSPA) {
          if (DEBUG) console.log("createPageviewTagForSPA", new Date());
          window.createPageviewTagForSPA();
        }
        trackPageView(data);
      },
      DEBOUCE_DELAY,
      { maxWait: MAX_WAIT }
    );
    tagForSPA();
  } catch (err) {
    console.log("Error with createPageviewTagForSPA", err.message || err);
  }
}

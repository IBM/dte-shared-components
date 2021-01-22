import fetch from "isomorphic-unfetch";
import * as Yup from "yup";
import * as crud from "./crud";
import { debounce, omit, truncate, merge } from "lodash";
import moment from "moment";

import { trackPageView } from "./analytics";
import { getEmail } from "./auth";
import {
  isEmpty,
  isInt,
  isMongoObjectId,
  mongoObjectId,
  isNullOrZero,
  stripMarkdown,
  toBoolean,
} from "./utils";
import { getSchema as getLinkSchema, getOptions as getLinkOptions } from "./link";
import { getSchema as getPlatformSchema, getOptions as getPlatformOptions } from "./platform";
import { getSchema as getJourneySchema, getOptions as getJourneyOptions } from "./journey";
import { find as getAllOptions, getOptionsByType } from "./option";

const LIMIT = 100;
const SELECT = "id,name,slug";
const OMIT = "links,platforms";
const POPULATE = "platforms";
const SORT = "id%20ASC";
const NAME = "collection";

const PLATFORMTITLE = process.env.SEGMENT_PLATFORMTITLE || "DTE2";
const DEBUG = toBoolean(process.env.ANALYTICS_DEBUG || false);
const API_URL = process.env.API_URL || `https://dte-api.us1a.cirrus.ibm.com/api/`;
const VERBOSE = process.env.LOG_VERBOSE || false;
const ATTEMPT_TIMEOUT = 1000;
const ATTEMPT_MAX = 10;
const DEBOUCE_DELAY = 500;
const MAX_WAIT = 5000;

const DEFAULTS = {
  id: null,
  oid: null,
  simple: true,
  name: "",
  slug: "",
  synopsis: "",
  description: "",
  url: null,
  sales: null,
  support: null,
  type: null,
  cover: null,
  categories: [],
  businessUnits: [],
  products: [],
  industries: [],
  tags: [],
  flags: [],
  links: [],
  platforms: [],
  journeys: [],
  audience: [],
  visibility: ["IBMers"],
  language: "English",
  status: "Draft",
  owner: "",
  collaborators: [],
  expireAt: null,
  verifiedAt: null,
  publishedAt: null,
};

const EMPTY_COLUMN_VALUE = "";
const DATE_FORMAT = "LLL";

const CSV_EXPORT_OPTIONS = {
  fields: [
    "id",
    "oid",
    "name",
    "slug",
    "status",
    "owner",
    {
      label: "createdAt",
      value: (row, field) =>
        isNullOrZero(row[field.label])
          ? EMPTY_COLUMN_VALUE
          : moment(row[field.label]).format(DATE_FORMAT),
    },
    {
      label: "updatedAt",
      value: (row, field) =>
        isNullOrZero(row[field.label])
          ? EMPTY_COLUMN_VALUE
          : moment(row[field.label]).format(DATE_FORMAT),
    },
    "simple",
    "synopsis",
    "description",
    {
      label: "collaborators",
      value: (row, field) => row[field.label].join(","),
      default: EMPTY_COLUMN_VALUE,
    },
    { label: "visibility", value: (row, field) => row[field.label].join(",") },
    { label: "audience", value: (row, field) => row[field.label].join(",") },
    {
      label: "businessUnits",
      value: (row, field) => {
        return (
          (row[field.label] &&
            row[field.label]
              .map((i) => i.name || i || "")
              .filter((o) => o && o !== "")
              .join(",")) ||
          ""
        );
      },
    },
    {
      label: "businessUnitsCodes",
      value: (row) => {
        return (
          (row["businessUnits"] &&
            row["businessUnits"]
              .map((i) => i.utcode || "")
              .filter((o) => o && o !== "")
              .join(",")) ||
          ""
        );
      },
    },
    {
      label: "categories",
      value: (row) => {
        return (
          (row["categories"] &&
            row["categories"]
              .map((i) => i.name || i || "")
              .filter((o) => o && o !== "")
              .join(",")) ||
          ""
        );
      },
    },
    {
      label: "categoriesCodes",
      value: (row) => {
        return (
          (row["categories"] &&
            row["categories"]
              .map((i) => i.utcode || "")
              .filter((o) => o && o !== "")
              .join(",")) ||
          ""
        );
      },
    },
    {
      label: "products",
      value: (row, field) => {
        return (
          (row[field.label] &&
            row[field.label]
              .map((i) => i.name || i || "")
              .filter((o) => o && o !== "")
              .join(",")) ||
          ""
        );
      },
    },
    {
      label: "productsCodes",
      value: (row) => {
        return (
          (row["products"] &&
            row["products"]
              .map((i) => i.utcode || "")
              .filter((o) => o && o !== "")
              .join(",")) ||
          ""
        );
      },
    },
    {
      label: "utcodes",
      value: (row) => {
        if (!row["products"]) return "";
        let utcodes =
          (row["products"] &&
            row["products"]
              .map((o) => o && o.utcodes)
              .filter((o) => o && o !== "")
              .reduce((a, b) => {
                for (let k of Object.keys(b)) {
                  if (!a[k]) a[k] = [];
                  if (!a[k].includes(b[k])) a[k].push(b[k]);
                }
                return a;
              }, {})) ||
          {};
        return (
          (utcodes &&
            Object.keys(utcodes)
              .map((o) => {
                return `UT${o}: ${utcodes[o].join(", ")}`;
              })
              .join("\r\n")) ||
          ""
        );
      },
    },
    {
      label: "utdescriptions",
      value: (row) => {
        if (!row["products"]) return "";
        let utdescriptions =
          (row["products"] &&
            row["products"]
              .map((o) => o && o.utdescriptions)
              .filter((o) => o && o !== "")
              .reduce((a, b) => {
                for (let k of Object.keys(b)) {
                  if (!a[k]) a[k] = [];
                  if (!a[k].includes(b[k])) a[k].push(b[k]);
                }
                return a;
              }, {})) ||
          {};
        return (
          (utdescriptions &&
            Object.keys(utdescriptions)
              .map((o) => {
                return `UT${o}: ${utdescriptions[o].join(", ")}`;
              })
              .join("\r\n")) ||
          ""
        );
      },
    },
    {
      label: "type",
      value: (row, field) => {
        return row[field.label] && Array.isArray(row[field.label])
          ? row[field.label].join(",")
          : row[field.label] || "";
      },
    },
    {
      label: "industries",
      value: (row, field) => row[field.label] && row[field.label].join(","),
    },
    "language",
    { label: "tags", value: (row, field) => row[field.label] && row[field.label].join(",") },
    {
      label: "links",
      value: (row, field) => {
        try {
          return row[field.label] && row[field.label].map((o) => `${o.name} - ${o.url}`).join(",");
        } catch (err) {
          return "";
        }
      },
    },
    {
      label: "journeys",
      value: (row, field) => {
        try {
          return (
            row[field.label] && row[field.label].map((o) => `${o.name} - ${o.status}`).join(",")
          );
        } catch (err) {
          return "";
        }
      },
    },
    {
      label: "platforms",
      value: (row, field) => {
        try {
          return (
            row[field.label] && row[field.label].map((o) => `${o.name} - ${o.status}`).join(",")
          );
        } catch (err) {
          return "";
        }
      },
    },
    {
      label: "rating",
      value: (row, field) => {
        try {
          return row[field.label] && row[field.label].overall;
        } catch (err) {
          return "";
        }
      },
    },
    {
      label: "publishedAt",
      value: (row, field) => {
        return isNullOrZero(row[field.label])
          ? EMPTY_COLUMN_VALUE
          : moment(row[field.label]).format(DATE_FORMAT);
      },
    },
    {
      label: "verifiedAt",
      value: (row, field) => {
        return isNullOrZero(row[field.label])
          ? EMPTY_COLUMN_VALUE
          : moment(row[field.label]).format(DATE_FORMAT);
      },
    },
    {
      label: "expireAt",
      value: (row, field) => {
        return isNullOrZero(row[field.label])
          ? EMPTY_COLUMN_VALUE
          : moment(row[field.label]).format(DATE_FORMAT);
      },
    },
  ],
};

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    oid: Yup.string().nullable(),
    simple: Yup.boolean().nullable(),
    name: Yup.string().required().max(250),
    slug: Yup.string().required().max(250),
    synopsis: Yup.string().max(1024).nullable(),
    description: Yup.string().nullable(),
    url: Yup.string().nullable(),
    sales: Yup.string().nullable(),
    support: Yup.string().nullable(),
    type: Yup.array().nullable(),
    cover: Yup.string().nullable(),
    categories: Yup.array().nullable(),
    businessUnits: Yup.array().nullable(),
    products: Yup.array().min(1),
    industries: Yup.array().nullable(),
    tags: Yup.array().nullable(), // array of tags
    flags: Yup.array().nullable(), // array of tags
    links: Yup.array().of(getLinkSchema()).nullable(), // links
    platforms: Yup.array().of(getPlatformSchema()).nullable(), // platforms
    journeys: Yup.array().of(getJourneySchema()).nullable(), // journeys
    audience: Yup.array().nullable(), // array of audience
    visibility: Yup.array().min(1), // array of visibility
    status: Yup.string().required().max(200),
    owner: Yup.string().email().required().max(250), // owner
    collaborators: Yup.array().nullable(), // array of collaborators
    expireAt: Yup.number().nullable(), // expire
    verifiedAt: Yup.number().nullable(), // verified
    publishedAt: Yup.number().nullable(), // published
  });
  // return Yup.object().shape(SCHEMA);
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

export function getCsvOptions(opts = {}) {
  return { ...CSV_EXPORT_OPTIONS, ...opts };
}

export function sortOptions() {
  return [
    { label: "Best Match", dataField: "_score", sortBy: "desc" },
    { label: "Most recent", dataField: "updatedAt", sortBy: "desc" },
    { label: "Name ascending", dataField: "name.keyword", sortBy: "asc" },
    { label: "Name descending", dataField: "name.keyword", sortBy: "desc" },
    { label: "Highest Ratings", dataField: "rating.overall", sortBy: "desc" },
  ];
}

export async function getOptions(type) {
  if (!type) return [];
  const mapper = (o) => {
    return {
      value: o.abbreviation || o.name,
      text: o.name,
      labelText: o.name,
      helperText: o.description || "",
      icon: o.icon,
      filter: o.filter,
    };
  };
  try {
    switch (type.toString().toLowerCase()) {
      case "status":
      case "statuses":
        return await getOptionsByType("CollectionStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "audience":
      case "audiences":
        return await getOptionsByType("Audience");
      case "visibility":
        return await getOptionsByType("Visibility");
      case "flags":
        return await getOptionsByType("Flag");
      case "industry":
      case "industries":
        return await getOptionsByType("Industry");
      case "language":
        return await getOptionsByType("Language");
      case "all":
        var options = await getAllOptions();
        return {
          status: options
            .filter((o) => o.type === "CollectionStatus" && o.status !== "Disabled")
            .map(mapper),
          language: options
            .filter((o) => o.type === "Language" && o.status !== "Disabled")
            .map(mapper),
          audience: options
            .filter((o) => o.type === "Audience" && o.status !== "Disabled")
            .map(mapper),
          visibility: options
            .filter((o) => o.type === "Visibility" && o.status !== "Disabled")
            .map(mapper),
          flags: options.filter((o) => o.type === "Flag" && o.status !== "Disabled").map(mapper),
          link: await getLinkOptions("all", options),
          platform: await getPlatformOptions("all", options),
          journey: await getJourneyOptions("all", options),
          industries: options
            .filter((o) => o.type === "Industry" && o.status !== "Disabled")
            .map(mapper),
        };
      default:
        return [];
    }
  } catch (err) {
    return [];
  }
}

export function search(query = {}, opts = {}) {
  return crud.search(NAME, query, opts);
}

export function find(query) {
  return crud.find(NAME, query);
}

export function list(value) {
  let query = value
    ? `?where={"or":[{"id":"${value}"},{"slug":"${value}"}]}`
    : `?select=${SELECT}&omit=${OMIT}&populate=${POPULATE}&sort=${SORT}&limit=${LIMIT}`;
  return crud
    .find(NAME, query)
    .then((json) => {
      let ids = json.map((j) => {
        return {
          params: {
            id: j.id.toString(),
          },
        };
      });
      let slugs = json.map((j) => {
        return {
          params: {
            id: j.slug.toString(),
          },
        };
      });
      return [...ids, ...slugs];
    })
    .catch((err) => {
      console.log("list error:", err.message || err);
      return [];
    });
}

export function findByOid(oid = "", useSearch = false) {
  return useSearch
    ? crud.search(NAME, {
        query: {
          bool: {
            must: [{ match: { oid: oid } }],
          },
        },
        sort: [{ _score: { order: "desc" } }],
      })
    : crud.find(NAME, `?where={"oid":"${oid}"}`, { limit: LIMIT });
}

export function findByName(name = "", useSearch = false) {
  return useSearch
    ? crud.search(NAME, {
        query: {
          query_string: {
            query: name,
            default_field: "name",
          },
        },
        sort: [{ _score: { order: "desc" } }],
      })
    : crud.find(NAME, `?where={"name":{"contains":"${name}"}}`, { limit: LIMIT });
}

export function findBySlug(slug = "", useSearch = false) {
  return useSearch
    ? crud.search(NAME, {
        query: {
          bool: {
            must: [{ match: { slug: slug } }],
          },
        },
        sort: [{ _score: { order: "desc" } }],
      })
    : crud.find(NAME, `?where={"slug":"${slug}"}`, { limit: LIMIT });
}

export function findByFlag(flag = "") {
  // return crud.search(NAME, {
  //   query: {
  //     bool: {
  //       must: [{ match: { flags: "Featured" } }],
  //     },
  //   },
  //   size: LIMIT,
  // });
  return crud.find(NAME, `?where={"flags":{"contains":"${flag}"}}`, { limit: LIMIT });
}

export function findByFeatured(opts = {}) {
  const query = merge(
    {
      _source: [
        "id",
        "slug",
        "name",
        "synopsis",
        "description",
        "cover",
        "flags",
        "rating",
        "simple",
        "products",
        "categories",
        "businessUnits",
        "journeys",
        "visibility",
        "updatedAt",
      ],
      query: {
        bool: {
          must: [{ match: { flags: "Featured" } }, { match: { status: "Active" } }],
        },
      },
      size: 500,
      sort: [{ updatedAt: "desc" }, "_score"],
    },
    opts
  );
  return crud.search(NAME, query);
}

export async function findOne(value, useSearch = false) {
  let result, match;
  try {
    if (!value) return { error: "not found" }; // no value ... dont search
    if (!isMongoObjectId(value)) {
      result = await findBySlug(value, useSearch); // not an id ... try slug
      if (result && !result.error) {
        match = result.find((o) => o.slug === value); // look for an exact match
        if (match) return match; // no match no joy
      }
      result = await findByOid(value, useSearch); // no result ... find oid
      if (result && !result.error) {
        match = result.find((o) => o.oid === value); // look for an exact match
        if (match) return match; // no match no joy
      }
    }
    if (isMongoObjectId(value) && useSearch) {
      result = await crud.doc(NAME, value); // use id to lookup
      if (result && !result.error) return result; // no error return result
    }
    result = await crud.findOne(NAME, value); // use id to mongo
    if (result && !result.error) return result; // no error return result
    return { error: "not found" }; // error ... :(
  } catch (err) {
    return { error: err.message || err }; // error ... :(
  }
}

export function describe(opts = {}) {
  return crud.describe(NAME, opts);
}

export function validate(payload, opts = {}) {
  return crud.validate(NAME, payload, opts);
}

export function audit(id, opts = {}) {
  return crud.audit(NAME, id, opts);
}

export function rate(payload, opts = {}) {
  return crud.rate(NAME, payload, opts);
}

export function rating(id, opts = {}) {
  return crud.rating(NAME, id, opts);
}

export function comment(payload, opts = {}) {
  return crud.comment(NAME, payload, opts);
}

export function destroyComment(payload, opts = {}) {
  return crud.destroyComment(NAME, payload, opts);
}

export function comments(id, opts = {}) {
  return crud.comments(NAME, id, opts);
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

export function reindex(id, opts = {}) {
  return crud.reindex(NAME, id, opts);
}

export function reimport(id, opts = {}) {
  if (VERBOSE) console.log("reimport", id, JSON.stringify(opts));
  let type;
  if (!id) return { error: "Invalid ID" };
  if (isInt(id)) type = "bluedemos";
  else if (isMongoObjectId(id)) type = "lens";
  else type = "ibmdemos";
  let url = `${API_URL}import/${type}/${id}?force=1`;
  return fetch(url, crud.prepare(opts))
    .then(crud.errorHandler)
    .then((res) => res.json())
    .then((json) => {
      if (VERBOSE) console.log("reimport", type, id, json);
      return json;
    })
    .catch((err) => {
      console.log(`reimport error ${type}:`, err.message || err);
      return { error: err.message || err };
    });
}

export function isBasic(values = {}, defaultValue = true) {
  if (!values) return defaultValue;
  if (values && values.simple !== null) return values.simple;
  return values &&
    ((values.links && values.links.length > 0) ||
      (values.platform && values.platform.length > 0)) &&
    !values.url
    ? false
    : defaultValue;
}

export function isOwner(values = {}, user = {}) {
  if (!values || !user) return false; // no values? no user? exit
  const normalized = [values.owner, ...values.collaborators] // new array with everyone
    .map((o) => o && o.toString().toLowerCase()) // to string with lowercase
    .filter((o) => o && o !== ""); // remove null and empty
  const users = [...new Set(normalized)]; // get a distinct array
  const email = getEmail(user) || undefined; // get the user email
  if (!users || users.length === 0 || !email) return false; // no users or email?
  return users.includes(email); // does the user's email exist in the list?
}

// deep clone an entry and adjust all the datapoints for a new entry
export function clone(values = {}, user = {}) {
  const exclude = [
    "id",
    "oid",
    "createdAt",
    "updatedAt",
    "verifiedAt",
    "publishedAt",
    "owner",
    "links",
    "platforms",
    "journeys",
  ];
  // console.log('clone')
  let data = omit({ ...values }, exclude);
  data.oid = mongoObjectId();
  data.links = (values.links && [...values.links]) || [];
  data.platforms = (values.platforms && [...values.platforms]) || [];
  data.journeys = (values.journeys && [...values.journeys]) || [];
  if (user && !isEmpty(user)) data.owner = getEmail(user);
  const updateJourneys = (oid, rid, type) => {
    // console.log('->','updateJourneys',oid, rid, type);
    for (const [i, journeys] of data.journeys.entries()) {
      for (const [j, journey] of journeys.journey.entries()) {
        if (journey.oid === oid && journey.type === type) {
          // console.log('-->',journey.oid,'===',oid,'&&',journey.type,'===',type,(journey.oid === oid && journey.type === type));
          // console.log('---->','update',data.journeys[i].journey[j].oid,'set to',rid);
          data.journeys[i].journey[j].oid = rid;
        }
      }
    }
  };
  if (data.links) {
    for (const [idx, link] of data.links.entries()) {
      let oid = link.oid || link.id || mongoObjectId();
      let payload = omit(link, ["id", "oid"]);
      payload.oid = mongoObjectId();
      if (data.journeys) updateJourneys(oid, payload.oid, link.type);
      data.links[idx] = payload;
    }
  }
  if (data.platforms) {
    for (const [idx, platform] of data.platforms.entries()) {
      let oid = platform.oid || platform.id || mongoObjectId();
      let payload = omit(platform, ["id", "oid"]);
      payload.oid = mongoObjectId();
      if (data.journeys) updateJourneys(oid, payload.oid, "platform");
      data.platforms[idx] = payload;
    }
  }
  if (data.journeys) {
    for (const [idx, journey] of data.journeys.entries()) {
      let payload = omit(journey, ["id", "oid"]);
      payload.id = payload.oid = mongoObjectId();
      data.journeys[idx] = payload;
    }
  }
  // console.log(JSON.stringify(data,null,2));
  data.status = "Draft";
  return data;
}

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

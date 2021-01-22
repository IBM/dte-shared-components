import * as Yup from "yup";
import { isEmpty, isOpportunity } from "./utils";
import { find as getAllOptions, getOptionsByType } from "./option";
import { merge } from "lodash";
import * as crud from "./crud";

const VERBOSE = process.env.LOG_VERBOSE || false;
const BLUEDEMOS_MIGRATION_API =
  process.env.BLUEDEMOS_MIGRATION_API ||
  "https://bluedemos-migration.dal1a.ciocloud.nonprod.intranet.ibm.com/";
// const LIMIT = 100;
// const SELECT = "id,name";
// const OMIT = "";
// const POPULATE = "";
// const SORT = "id%20DESC";
// const NAME = "reservation";

const FOURHOURS = 4;
const ONEDAY = 24;
const ONEWEEK = ONEDAY * 7;
const TWOWEEK = ONEWEEK * 2;
// const ONEMONTH = ONEDAY * 30;

// const MODEL = {};

const DEFAULTS = {
  id: null,
  name: "",
  purpose: "",
  customer: "",
  opportunity: "",
  description: "",
  start: null,
  end: null,
  notes: "",
  user: "",
  template: "",
  infrastructure: "",
  type: "",
  maxMemory: "",
  startCpus: "",
  postInstallScript: "",
};

const TYPES = [
  { abbreviation: "now", name: "Reserve for now", status: "Enabled" },
  { abbreviation: "later", name: "Reserve for later", status: "Enabled" },
  { abbreviation: "workshop", name: "Schedule a workshop", status: "Enabled" },
];

const SALES_OPPORTUNITY = [
  {
    id: "customer-demo",
    text: "Customer Demo",
    fields: ["customer", "opportunity"],
    required: ["customer", "opportunity"],
    policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": ONEWEEK } },
    condition: "or",
  },
  {
    id: "customer-self-service",
    text: "Customer Self-Service",
    fields: ["customer", "opportunity"],
    required: ["customer", "opportunity"],
    policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": ONEWEEK } },
    condition: "or",
  },
  {
    id: "development",
    text: "Development",
    fields: ["description"],
    required: ["description"],
    policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0 } },
  },
  {
    id: "other",
    text: "Other",
    fields: ["description"],
    required: ["description"],
    policy: { reserve: { "*": FOURHOURS }, extend: { "*": 0 } },
  },
  {
    id: "practice-self-education",
    text: "Practice / Self-Education",
    fields: ["description"],
    required: ["description"],
    policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0 } },
  },
  {
    id: "proof-of-concept",
    text: "Proof-of-Concept",
    fields: ["customer", "opportunity"],
    required: ["customer", "opportunity"],
    policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": ONEWEEK } },
    condition: "or",
  },
  {
    id: "proof-of-technology",
    text: "Proof-of-Technology",
    fields: ["customer", "opportunity"],
    required: ["customer", "opportunity"],
    policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": ONEWEEK } },
    condition: "or",
  },
  {
    id: "service-support",
    text: "Service / Support",
    fields: ["description"],
    required: ["description"],
    policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0 } },
  },
  {
    id: "test",
    text: "Test",
    fields: ["description"],
    required: ["description"],
    policy: { reserve: { "*": FOURHOURS }, extend: { "*": 0 } },
  },
  // {
  //   id: "workshop",
  //   text: "Workshop",
  //   fields: ["customer", "opportunity", "description"],
  //   required: ["customer", "opportunity"],
  //   policy: { reserve: { "*": TWOWEEK }, extend: { "*": 0, "opportunity": TWOWEEK } },
  //   condition: "or",
  // },
];

export async function callBDMigration(url, opts = {}) {
  let data;
  try {
    data = await crud.fetcher(`${BLUEDEMOS_MIGRATION_API}${url}`, prepare(opts));
  } catch (e) {
    console.log("Error: " + e);
  }
  return data;
}

export function getSchema() {
  return Yup.object().shape({
    id: Yup.string().nullable(),
    name: Yup.string().required().max(1024),
    purpose: Yup.string().required(),
    customer: Yup.array().test({
      name: "validator-customer",
      message: "Invalid customer",
      test: function (value) {
        const { purpose, opportunity } = this.parent;
        switch (true) {
          case purpose === "Customer Demo" && !opportunity:
          case purpose === "Customer Self-Service" && !opportunity:
          case purpose === "Proof-of-Technology" && !opportunity:
          case purpose === "Workshop" && !opportunity:
            return value && !isEmpty(value);
          default:
            return true;
        }
      },
    }),
    opportunity: Yup.array().test({
      name: "validator-opportunity",
      message: "Invalid opportunity",
      test: function (value) {
        const { purpose, customer } = this.parent;
        switch (true) {
          case purpose === "Customer Demo" && !customer:
          case purpose === "Customer Self-Service" && !customer:
          case purpose === "Proof-of-Technology" && !customer:
          case purpose === "Workshop" && !customer:
            return new Promise((resolve, reject) => {
              return isOpportunity(value)
                .then((resp) => {
                  resolve(resp);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          default:
            return true;
        }
      },
    }),
    description: Yup.string().test({
      name: "validator-description",
      message: "Invalid description",
      test: function (value) {
        const { purpose } = this.parent;
        switch (true) {
          case purpose === "Development":
          case purpose === "Other":
          case purpose === "Practice / Self-Education":
          case purpose === "Service / Support":
            return value && !isEmpty(value);
          default:
            return true;
        }
      },
    }),
    start: Yup.date().nullable(),
    end: Yup.date().nullable(),
    notes: Yup.string().nullable(),
    user: Yup.string().required(),
    template: Yup.string().required(),
    infrastructure: Yup.string().required(),
    type: Yup.string().nullable(),
  });
}

export function getDefaults(opts = {}) {
  return { ...DEFAULTS, ...opts };
}

export async function getOptions(type, opts) {
  if (!type) return [];
  const mapper = (o) => {
    return {
      id: o.abbreviation || o.name,
      value: o.abbreviation || o.name,
      text: o.name || o.abbreviation,
      labelText: o.name || o.abbreviation,
      filter: o.filter || o.abbreviation || o.name,
      // helperText: o.description || "",
    };
  };
  try {
    switch (type.toString().toLowerCase()) {
      case "infrastructure":
      case "infrastructures":
        return await getOptionsByType("PlatformInfrastructure", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "status":
      case "statuses":
        return await getOptionsByType("ReservationStatus", (o) => {
          return { value: o.abbreviation || o.name, text: o.name };
        });
      case "type":
      case "types":
        return TYPES.filter((o) => o.status !== "Disabled").map(mapper);
      case "salesOpportunity":
        return SALES_OPPORTUNITY;
      case "all":
        var options = opts || (await getAllOptions());
        return {
          type: TYPES.filter((o) => o.status !== "Disabled").map(mapper),
          status: options
            .filter((o) => o.type === "ReservationStatus" && o.status !== "Disabled")
            .map(mapper),
          infrastructure: options
            .filter((o) => o.type === "PlatformInfrastructure" && o.status !== "Disabled")
            .map(mapper),
          salesOpportunity: SALES_OPPORTUNITY,
        };
      default:
        return [];
    }
  } catch (err) {
    return [];
  }
}

function prepare(payload = {}, options = {}) {
  const defaults = {
    method: "GET", // default method
    mode: "cors", // no-cors, cors, *same-origin
    headers: {
      "Content-type": "application/json",
    },
  };
  let result = merge({}, defaults, payload, options);
  if (payload.body) result.body = JSON.stringify(payload.body);
  // console.log("prepare", result);
  return result;
}

export const errorHandler = (resp) => {
  if (!resp) throw Error("Invalid response");
  if (!resp.ok) throw Error(resp.statusText);
  return resp;
};

const normalizeRegion = (value) => {
  if (!value) return;
  value = value.toString().toLowerCase();
  switch (value) {
    case "apac":
    case "apac-1":
    case "apac-2":
      return "apac";
    case "aus-sydney":
      return "aus";
    case "uscentral":
    case "us-central":
      return "uscentral";
    default:
      return value;
  }
};

export async function sendToIbmDemos(values) {
  let templateRegions = [];
  if (values.platform && values.platform.regions) {
    for (let region of values.platform.regions) {
      let templateRegion = {
        templateId: region.template,
        infrastructure: values.infrastructure,
        region: normalizeRegion(region.region),
      };
      templateRegions.push(templateRegion);
    }

    let payload = {
      name: values.name,
      template: templateRegions[0].templateId,
      region: templateRegions[0].region,
      templateRegions: templateRegions,
    };
    const options = { method: "POST", body: payload };
    //let migOpts = prepare(options, opts)
    let result;
    try {
      result = await callBDMigration(`api/bluedemos`, options);
    } catch (err) {
      console.log("Error: ", err.message || err);
    }
    return result?.data?.demos && result.data.demos[0];
  }
}

export function list(platform, opts = {}) {
  return find(platform, opts);
}

export function find(platform, opts = {}, all = false) {
  return all
    ? crud.get(`reservation/${platform}`, opts)
    : crud.get(`my/reservations/${platform}`, opts);
}

export async function findTemplates(platform = "all", opts = {}) {
  let results;
  try {
    results = await crud.get(`reservation/${platform}/templates`, opts);
  } catch (err) {
    console.log("findTemplates error", err.message || err);
    throw err;
  }
  if (!platform || platform === "all") return results;
  return results.filter((o) => o.infrastructure === platform);
}

export function findOne(id, platform, opts = {}) {
  return crud.get(`reservation/${platform}/${id}`, opts);
}

export function create(payload, platform, opts = {}) {
  const options = { method: "POST", body: payload };
  return crud.get(`reservation/${platform}`, prepare(options, opts));
}

export function update(payload, platform, opts = {}, id = "id") {
  const options = { method: "PATCH", body: payload };
  return crud.get(`reservation/${platform}/${payload[id]}`, prepare(options, opts));
}

export function extend(payload, platform, opts = {}, id = "id") {
  const options = { method: "POST", body: payload };
  return crud.get(`reservation/${platform}/${payload[id]}`, prepare(options, opts));
}

export function share(payload, platform, opts = {}, id = "id") {
  const options = { method: "POST", body: payload };
  return crud.get(`reservation/${platform}/${id}/share`, prepare(options, opts));
}

export function createOrUpdate(payload, platform, opts = {}, id = "id") {
  if (VERBOSE)
    console.log("createOrUpdate", JSON.stringify(payload), platform, JSON.stringify(opts), id);
  return payload[id] && payload[id] !== null
    ? update(payload, platform, opts, id)
    : create(payload, platform, opts);
}

export function destroy(payload, platform, opts = {}, id = "id") {
  const options = { method: "DELETE", body: payload };
  return crud.get(`reservation/${platform}/${payload[id]}`, prepare(options, opts));
}

export function translateType(options, type, key = "text") {
  if (!options || !options.infrastructure) return type;
  let t = options.infrastructure.find(
    (o) => o.filter === type || o.text === type || o.value === type
  );
  return (t && key && t[key] ? t[key] : type).toString();
}

// get a string value from a haystack object based on an array of needles
export function getValue(haystack = {}, needles = [], fallback = "") {
  let result;
  try {
    if (haystack)
      for (let i of needles) {
        // console.log("-->", i, haystack[i], isEmpty(haystack[i]));
        if (!isEmpty(haystack[i])) {
          result = haystack[i];
          break;
        }
      }
  } catch (err) {
    // do nothing
  }
  return (result || fallback).toString().trim();
}

export function isExtendable(data) {
  const purpose = getValue(data, ["UsageCategory", "usageCategory", "Purpose", "purpose"]);
  const customer = getValue(data, [
    "OpportunityCustomer",
    "opportunityCustomer",
    "Customer",
    "customer",
  ]);
  const opportunity = getValue(data, [
    "OpportunityId",
    "opportunityId",
    "Opportunity",
    "opportunity",
  ]);
  // const description = getValue(data, [
  //   "OpportunityDescription",
  //   "opportunityDescription",
  //   "Description",
  //   "description",
  // ]);
  const idx = SALES_OPPORTUNITY.findIndex((o) => o && (o.id === purpose || o.text === purpose));
  const salesOpportunity = SALES_OPPORTUNITY[idx] || {};
  const required = salesOpportunity.required || ["*"];
  const policy = salesOpportunity?.policy?.extend || { "*": ONEWEEK };
  const getExtendValue = (p) => {
    switch (p.toString().toLowerCase()) {
      case "customer":
        return customer && policy[p] ? policy[p] : 0;
      case "opportunity":
        return opportunity && policy[p] ? policy[p] : 0;
      case "purpose":
        return purpose && policy[p] ? policy[p] : 0;
      default:
        return policy[p] || 0;
    }
  };
  let value = 0;
  for (let r of required) {
    value = getExtendValue(r);
    if (value && value > 0) break;
  }
  return value;
}

import * as crud from "./crud";
import { trim } from "lodash";

const NAME = "audit";
const LIMIT = 50;

const DATA_TABLE_DEFAULTS = {
  headers: [
    { header: "Action", key: "action" },
    { header: "User", key: "user" },
    { header: "Changes", key: "diff" },
    { header: "Updated", key: "createdAt" },
  ],
  pagination: {
    page: 1,
    isLastPage: false,
    pageSize: LIMIT,
    pageSizes: [10, 20, 30, 40, 50, 100],
    totalItems: 0,
  },
  noresults: "No audit logs.",
};

export function getDataTableDefaults(opts = {}) {
  return { ...DATA_TABLE_DEFAULTS, ...opts };
}

export function find(query = "", opts = {}) {
  return crud.find(NAME, query, { ...opts });
}

export function count(query = "", opts = {}) {
  return crud.count(NAME, query, { ...opts, limit: 1 });
}

export function findOne(id, opts = {}) {
  return crud.findOne(NAME, id, opts);
}

export function destroy(id, opts = {}) {
  return crud.destroy(NAME, id, opts);
}

export function cleanString(s) {
  let v = s.replace(/(\r\n\t|\n|\r\t|\\n)/gm, "").replace(/<(?:.|\n)*?>/gm, "");
  return trim(v);
}

export function translateDiff(data) {
  if (!data) return "None";
  return data
    .map((n) => {
      let str = "",
        action,
        path,
        desc,
        value;
      try {
        path = n.path.substring(1);
        let parts = path.split("/");
        if (parts) path = parts.join(" > ");
      } catch (e) {
        path = n.path;
      }
      try {
        value = n.value ? JSON.stringify(n.value) : "";
      } catch (e) {
        value = n.value;
      }
      switch (n.op) {
        case "add":
          action = "Added";
          desc = "with value";
          break;
        case "remove":
          action = "Removed";
          desc = false;
          break;
        case "replace":
          action = "Replaced";
          desc = "with value";
          break;
        case "move":
          action = "Moved";
          desc = "to";
          break;
        case "copy":
          action = "Copied";
          desc = "to";
          break;
        default:
          action = false;
          break;
      }
      if (action) {
        str = action + " ***" + path + "***";
        if (desc && value) str += " " + desc + " " + cleanString(value);
        else if (value && value !== "") str += " " + cleanString(value);
        return str;
      }
      return;
    })
    .filter((o) => o && o !== "")
    .join("\n\n___\n\n");
}

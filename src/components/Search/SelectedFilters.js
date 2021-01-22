import { SelectedFilters as ReactiveSearchSelectedFilters } from "@appbaseio/reactivesearch";
import { isEmpty } from "lodash";

import { Tag } from "carbon-components-react";
import { CloseOutline32 } from "@carbon/icons-react";

import { IconButton } from "components";
import { toBoolean } from "../../lib/utils";

const SelectedFilters = (props) => {
  return (
    <ReactiveSearchSelectedFilters
      {...props}
      render={({ selectedValues, setValue, componentProps }) => {
        const components = Object.keys(selectedValues);
        const values = components
          .map((o) => selectedValues[o].value || null)
          .filter((o) => o && !isEmpty(o));
        const clearFilter = (component) => {
          setValue(component, null);
        };
        const clearAll = () => {
          for (let component of components) {
            setValue(component, null);
          }
        };
        if (!values || isEmpty(values)) return null;
        const filters = components.map((component) => {
          const props = componentProps[component] || {};
          const showFilter =
            props && "showFilter" in props ? toBoolean(props.showFilter) : true; // default to true
          if (
            !showFilter ||
            !selectedValues[component] ||
            !selectedValues[component].value ||
            isEmpty(selectedValues[component].value)
          )
            return null;
          return (
            <Tag
              filter
              type="gray"
              key={component}
              onClick={() => clearFilter(component)}
            >
              <b>{selectedValues[component].label}</b>:{" "}
              {Array.isArray(selectedValues[component].value)
                ? selectedValues[component].value.join(", ")
                : selectedValues[component].value}
            </Tag>
          );
        });
        const hasFilters =
          filters && filters.filter((o) => o && o !== null).length > 0;
        return (
          <>
            {filters}
            {hasFilters ? (
              <IconButton
                id="clearAll"
                renderIcon={CloseOutline32}
                iconDescription="Clear all"
                kind="ghost"
                size="small"
                onClick={() => clearAll()}
              />
            ) : null}
          </>
        );
      }}
    />
  );
};

export default SelectedFilters;

import { SelectedFilters as ReactiveSearchSelectedFilters } from "@appbaseio/reactivesearch";
import { isEmpty } from "lodash";

import { Tag } from "carbon-components-react";
import { CloseOutline32 } from "@carbon/icons-react";

import { IconButton } from "../../index";

const SelectedFilters = (props) => {
  return (
    <ReactiveSearchSelectedFilters
      {...props}
      render={({ selectedValues, setValue }) => {
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
          if (
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
        return (
          <>
            {filters}
            <IconButton
              renderIcon={CloseOutline32}
              iconDescription="Clear all"
              kind="ghost"
              size="small"
              onClick={() => clearAll()}
            />
          </>
        );
      }}
    />
  );
};

export default SelectedFilters;

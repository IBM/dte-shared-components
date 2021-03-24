import { SingleDataList } from "@appbaseio/reactivesearch";

const isEqual = (a, b) => {
  return typeof a === "string" && typeof b === "string"
    ? a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0
    : a === b;
};

const MATCH_ALL = {
  query: {
    match_all: {},
  },
};

const BooleanSearch = ({ data, dataField, customQuery, ...rest }) => {
  return (
    <SingleDataList
      {...rest}
      data={data}
      dataField={dataField}
      customQuery={(value, props) => {
        if (!value) return MATCH_ALL;
        const query = isEqual(value, data[0].value)
          ? {
              query: {
                term: {
                  [dataField]: true,
                },
              },
            }
          : {
              query: {
                term: {
                  [dataField]: false,
                },
              },
            };
        // console.log("BooleanSearch customQuery query", value, JSON.stringify(query));
        return query;
      }}
    />
  );
};

BooleanSearch.defaultProps = {
  componentId: "exists",
  showSearch: false,
  showRadio: false,
  showFilter: true,
  showCount: true,
  URLParams: true,
  filterLabel: "exists",
  selectAllLabel: null,
  data: [
    {
      label: "Yes",
      value: "yes",
    },
    {
      label: "No",
      value: "no",
    },
  ],
  renderItem: (label, count, isSelected) => {
    return (
      <div className="bx--radio-button-wrapper" style={{ marginRight: "1.3rem" }}>
        <span className="bx--radio-button__label">
          <span className="bx--radio-button__appearance"></span>
          <span>{label}</span>
        </span>
      </div>
    );
  },
  innerClass: {
    radio: "bx--radio-button",
    label: "bx--radio-button__label",
    list: "bx--radio-button-group bx--radio-button-group--label-right",
  },
};

export default BooleanSearch;

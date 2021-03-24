import { DataSearch as ReactiveSearchDataSearch } from "@appbaseio/reactivesearch";
import { Search20 } from "@carbon/icons-react";

const DataSearch = (props) => {
  return <ReactiveSearchDataSearch {...props} />;
};

DataSearch.defaultProps = {
  className: "search",
  filterLabel: "Search",
  placeholder: "Search",
  queryFormat: "and",
  fuzziness: 2,
  debounce: 500,
  icon: <Search20 />,
  autosuggest: true,
  highlight: false,
  URLParams: true,
  innerClass: {
    title: "search-title",
    input: "search-input bx--text-input",
    list: "search-list",
  },
};

/*
renderItem={(label, count, isSelected) => (
  <span>
    {label}
    <Tag type="warm-gray">{count}</Tag>
  </span>
)}
render={({ loading, error, data, handleChange }) => {
  if (loading) return <InlineLoading />;
  if (error) return <Error message={error} />;
  if (!data) return null;
  // console.log('data',data, handleChange )
  return (
    <Scrollable>
      <ul>
        {data.map((item) => (
          <li>
            <input
              type="checkbox"
              className="bx--checkbox"
              value={item.key}
              onClick={(e) => {
                console.log("handleChange", item.key, e);
                handleChange(e);
              }}
            />
            <label className="bx--checkbox-label">
              <span className="bx--checkbox-label-text">{item.key}</span>
              <Tag type="warm-gray">{item.doc_count || item.count}</Tag>
            </label>
          </li>
        ))}
      </ul>
    </Scrollable>
  );
}}
*/

export default DataSearch;

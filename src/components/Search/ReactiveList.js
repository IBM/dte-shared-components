import { ReactiveList as ReactiveSearchReactiveList } from "@appbaseio/reactivesearch";

import { LoadingList, NoResults } from "../../index";

const ReactiveList = (props) => {
  return <ReactiveSearchReactiveList {...props} />;
};

ReactiveList.defaultProps = {
  className: "result-list-container",
  dataField: "_score",
  infiniteScroll: true,
  hightlight: false,
  pages: 10,
  size: 20,
  sortBy: "desc",
  showLoader: true,
  loader: <LoadingList />,
  renderNoResults: () => <NoResults mode="list" />,
  showResultStats: true,
  renderResultStats: ({ displayedResults, numberOfResults, time }) => {
    return (
      <div className="result-stats">
        Showing {displayedResults} of total {numberOfResults} in {time} ms
      </div>
    );
  },
  defaultSortOption: "Best Match",
  sortOptions: [
    { label: "Best Match", dataField: "_score", sortBy: "desc" },
    { label: "Most recent", dataField: "updatedAt", sortBy: "desc" },
    { label: "Name ascending", dataField: "name.keyword", sortBy: "asc" },
    { label: "Name descending", dataField: "name.keyword", sortBy: "desc" },
  ],
  innerClass: {
    title: "result-title",
    listItem: "result-item",
    list: "bx--structured-list bx--structured-list--selection list-container",
    sortOptions: "sort-options",
    resultStats: "result-stats",
    resultsInfo: "result-list-info",
  },
};

export default ReactiveList;

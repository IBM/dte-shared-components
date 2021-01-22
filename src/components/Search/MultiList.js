import { MultiList as ReactiveSearchMultiList } from "@appbaseio/reactivesearch";
import { SelectSkeleton } from "carbon-components-react";

const MultiList = (props) => {
  return <ReactiveSearchMultiList {...props} />;
};

MultiList.defaultProps = {
  size: 250,
  sortBy: "asc",
  queryFormat: "or",
  showCheckbox: true,
  showCount: true,
  showSearch: false,
  showFilter: true,
  showLoadMore: false,
  URLParams: true,
  innerClass: {
    input: "bx--text-input",
    // count: "bx--tag",
  },
  loader: <SelectSkeleton width="100%" />,
};

export default MultiList;

import { SingleList as ReactiveSearchSingleList } from "@appbaseio/reactivesearch";
import { SelectSkeleton } from "carbon-components-react";

const SingleList = (props) => {
  return <ReactiveSearchSingleList {...props} />;
};

SingleList.defaultProps = {
  size: 100,
  sortBy: "asc",
  queryFormat: "or",
  showCheckbox: true,
  showCount: true,
  showSearch: false,
  showFilter: false,
  URLParams: true,
  innerClass: {
    input: "bx--text-input",
    // count: "bx--tag",
  },
  loader: <SelectSkeleton width="100%" />,
};

export default SingleList;

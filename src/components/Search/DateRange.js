import { DateRange as ReactiveSearchDateRange } from "@appbaseio/reactivesearch";

const DateRange = (props) => {
  return <ReactiveSearchDateRange {...props} />;
};

DateRange.defaultProps = {
  focused: false,
  numberOfMonths: 2,
  queryFormat: "date",
  autoFocusEnd: true,
  showClear: true,
  showFilter: true,
  URLParams: true,
  placeholder: {
    start: "Start Date",
    end: "End Date",
  },
};

export default DateRange;

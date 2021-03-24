import React from "react";
import { SkeletonText } from "carbon-components-react";
import { StructuredListRow, StructuredListCell } from "carbon-components-react";

const Loading = ({ heading = false, lineCount = 3, paragraph = false, width = "100%" }) => {
  return (
    <SkeletonText heading={heading} lineCount={lineCount} paragraph={paragraph} width={width} />
  );
};

const LoadingList = () => {
  return (
    <div className="bx--structured-list bx--structured-list--selection">
      <StructuredListRow key="loading-structuredlist" className="fadein">
        <StructuredListCell>
          <Loading />
        </StructuredListCell>
      </StructuredListRow>
    </div>
  );
};

export default LoadingList;

import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { Button } from "dte-shared-private";
import { AddAlt32 } from "@carbon/icons-react";

const CreateNewButton = ({ root, namespace }) => (
  <Link href={`${root}/${namespace}/create`}>
    <Button kind="primary" renderIcon={AddAlt32} data-href={`${root}/${namespace}/create`}>
      Create {namespace}
    </Button>
  </Link>
);

CreateNewButton.propTypes = {
  root: PropTypes.string,
  namespace: PropTypes.string,
};

export default CreateNewButton;

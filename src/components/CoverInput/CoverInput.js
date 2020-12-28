import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FileUploaderButton, InlineLoading } from "carbon-components-react";
import { TrashCan20, CloudUpload20 } from "@carbon/icons-react";

import { ButtonSet } from 'dte-shared-private';
import { IconButton, TextInput } from "../../index";

// import { getAuthorization } from "lib/auth";
// import { create, destroy } from "lib/storage";
// import { slugify } from "lib/utils";

const COS_ENDPOINT = process.env.COS_ENDPOINT || "s3.us-east.cloud-object-storage.appdomain.cloud";

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  & .bx--form-item {
    flex: 1 1 100%;
    padding-right: 1rem;
  }
  & .bx--text-input {
    height: 3rem;
  }
  & div:not(.bx--form-item) {
    flex: 1 1;
  }
  & .bx--btn {
    margin-top: 1.5rem;
    height: 3rem;
    min-width: 3rem;
  }
  & label.bx--btn {
    padding-top: calc(0.875rem + 3px);
  }
`;

const CoverInput = ({ accept, value = "", base = "", user = {}, onChange, getAuthorization, create, destroy, slugify, ...rest }) => {
  const [cover, setCover] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (onChange && typeof onChange === "function") {
      if (rest && rest.name) onChange(rest.name, cover);
      else onChange(cover);
    }
  }, [cover]);

  const handleUpload = async (file) => {
    let filename = base && base !== "" ? `${base}-${file.name}` : file.name;
    let parts = filename.split(".") || []; // slip the .
    let ext = parts.pop() || ""; // get the extension
    filename = `${slugify(parts.join("."))}.${ext}`; // slugify and re-attach the ext
    try {
      let result = await create(file, getAuthorization(user), filename);
      if (result && result.url) setCover(result.url);
    } catch (err) {
      console.log("Error", err.message || err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    let v = (e && e.target && e.target.value) || "";
    setCover(v);
  };

  const handleDelete = async () => {
    try {
      if (cover && user) destroy(cover, getAuthorization(user));
    } catch (err) {
      // do nothing
    }
    setCover("");
  };

  let button = <CloudUpload20 />;
  if (loading) button = <InlineLoading description="" iconDescription="Uploading..." />;

  return (
    <Row>
      <TextInput value={cover} onChange={handleChange} {...rest} />
      <ButtonSet>
        {cover && cover !== "" && cover.includes(COS_ENDPOINT) ? (
          <IconButton
            kind="danger"
            iconDescription="Delete"
            renderIcon={TrashCan20}
            onClick={() => handleDelete()}
            style={{ marginRight: "1px" }}
          />
        ) : null}
        <FileUploaderButton
          buttonKind="secondary"
          labelText={button}
          title={`Upload a ${accept ? accept.join(", ") + " " : ""}file`}
          multiple={false}
          listFiles={false}
          disableLabelChanges={true}
          name="file"
          onChange={(e) => {
            const file = (e && e.target && e.target.files && e.target.files[0]) || false;
            setLoading(true);
            if (file) handleUpload(file);
          }}
          role="button"
          size="default"
          tabIndex={0}
          accept={accept}
          className="bx--btn--icon-only"
        />
      </ButtonSet>
    </Row>
  );
};

CoverInput.defaultProps = {
  base: "",
  user: {},
  helperText: `Enter the direct path to an image or upload a file by clicking the button.`,
  accept: [".jpg", ".png", ".svg", ".gif", ".jpeg"],
};

CoverInput.propTypes = {
  accept: PropTypes.array,
  value: PropTypes.any,
  base: PropTypes.string,
  user: PropTypes.object,
  onChange: PropTypes.func,
};

export default CoverInput;

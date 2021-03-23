import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  Modal,
  InlineLoading,
  TextInput,
  FormGroup,
  TextInputSkeleton,
} from "carbon-components-react";

import { Csv32, Json32 } from "@carbon/icons-react";
import { ButtonSet, IconButton } from "../../index";

import { saveAs } from "file-saver";
import { json2csv } from "../../methods";

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  & .bx--form-item {
    flex: 1 1 100%;
  }
  & .bx--text-input {
    height: 3rem;
  }
  & div:not(.bx--form-item) {
    flex: 1 1 20%;
  }
`;

const DownloadSearchModal = ({
  search,
  options,
  filename,
  title,
  query,
  maxSize,
  onClose,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState(filename);
  const [fileFormat, setFileFormat] = useState("csv");
  const [searchResult, setSearchResult] = useState([]);

  // componentDidMount
  useEffect(() => {
    getSearchResults();
  }, []);

  // setting size to maximum for ES
  const getSearchResults = async () => {
    try {
      let results = await search({ query: query, size: maxSize });
      setSearchResult(results);
    } catch (err) {
      console.log("Error", err.message || err);
    }
    setLoading(false);
  };

  const safeName = (value = "") => {
    return encodeURIComponent(value).toString().trim().replace(/%20/g, "+");
  };

  const onSubmit = () => {
    // make sure name is safe
    const fileNameSafe = `${safeName(fileName)}${
      fileFormat === "csv" ? ".csv" : ".json"
    }`;
    // check required download format
    let fileToSave = null;
    if (fileFormat === "csv") {
      // convert to csv
      const resultCsv = json2csv(searchResult, options);
      // console.log("csv download, ", resultCsv);
      fileToSave = new Blob([resultCsv], {
        type: "text/csv;charset=utf-8",
        name: fileNameSafe,
      });
    } else {
      fileToSave = new Blob([JSON.stringify(searchResult, undefined, 2)], {
        type: "application/json",
        name: fileNameSafe,
      });
    }
    // save,download file through browser
    saveAs(fileToSave, fileNameSafe);
  };

  return (
    <Modal
      className="download-search-modal"
      iconDescription="Close"
      modalAriaLabel={title}
      modalHeading={title}
      onBlur={onClose}
      onRequestClose={onClose}
      onRequestSubmit={onSubmit}
      onSecondarySubmit={onClose}
      hasScrollingContent={false}
      hasForm
      open
      passiveModal={false}
      primaryButtonDisabled={loading}
      primaryButtonText={
        loading ? <InlineLoading description="Loading data..." /> : "Download"
      }
      secondaryButtonText="Cancel"
      size="sm"
    >
      <Row className="form">
        {loading ? (
          <TextInputSkeleton />
        ) : (
          <>
            <TextInput
              id="fileName"
              name="fileName"
              labelText=""
              placeholder="customize your file name here"
              value={fileName}
              invalidText=""
              invalid=""
              maxLength={2048}
              onChange={(e) => setFileName(e.target.value || filename)}
            />
            <ButtonSet>
              <IconButton
                renderIcon={Csv32}
                iconDescription="CSV"
                kind={fileFormat === "csv" ? "primary" : "secondary"}
                onClick={() => {
                  setFileFormat("csv");
                }}
              />
              <IconButton
                renderIcon={Json32}
                iconDescription="JSON"
                kind={fileFormat === "json" ? "primary" : "secondary"}
                onClick={() => {
                  setFileFormat("json");
                }}
              />
            </ButtonSet>
          </>
        )}
      </Row>
    </Modal>
  );
};

DownloadSearchModal.defaultProps = {
  namespace: "modal",
  title: "Download",
  query: {},
  filename: "export",
  maxSize: 10000,
  onClose: () => {},
};

export default DownloadSearchModal;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormItem, FormLabel, TextInput } from "carbon-components-react";
import { AddAlt32, SubtractAlt32 } from "@carbon/icons-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { IconButton, InvalidText, HelperText } from "../../index";

import { getItemStyle, getListStyle, reorder } from "../../methods";

let StyledFormItem = styled(FormItem)`
  & .links__wrapper {
    width: 100%;
  }
  & .links__wrapper.invalid {
    outline: 2px solid #da1e28;
    outline-offset: -2px;
  }
  & .bx--structured-list-row {
    border-bottom: none;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  flex-shrink: 1;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 0.5rem;
  & .bx--form-item:first-of-type {
    flex: 1 1 25%;
    margin-right: 2rem;
  }
  & .bx--form-item {
    flex: 1 1 75%;
    margin-right: 2rem;
  }
  & .bx--btn.add {
    margin-top: 1.5rem;
  }
`;

const Links = ({
  id,
  name,
  prefix,
  labelText,
  labelTextLabel,
  labelTextUrl,
  helperText,
  helperTextLabel,
  helperTextUrl,
  invalid,
  invalidText,
  placeholderLabel,
  placeholderUrl,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(props.value || []);
  const [label, setLabel] = useState(props.label || "");
  const [url, setUrl] = useState(props.url || "");

  const handleChange = () => {
    if (onChange && typeof onChange === "function") onChange(name, value);
  };

  useEffect(() => {
    handleChange();
  }, [value]);

  const add = () => {
    let t = [...value];
    t.push({
      kind: "script",
      type: "external",
      label: label,
      url: url,
    });
    setValue(t);
    setLabel("");
    setUrl("");
  };

  const remove = (i) => {
    let t = [...value];
    if (i > -1) t.splice(i, 1);
    setValue(t);
  };

  const update = (e, p, i) => {
    let t = [...value];
    let v = e.target.value || "";
    t[i][p] = v;
    setValue(t);
  };

  const onDragEnd = (result) => {
    if (!result || !result.destination) return;
    const items = reorder(value, result.source.index, result.destination.index);
    setValue(items);
  };

  const renderValue = () => {
    if (!value) return null;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className={`${prefix}__wrapper${invalid ? " invalid" : ""}`}
            >
              {value.map((v, i) => {
                return (
                  <Draggable
                    key={`${prefix}-${i}`}
                    draggableId={`${prefix}-${i}`}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Row>
                          <TextInput
                            id={`${id || name}-label-${i}`}
                            key={`${id || name}-label-${i}`}
                            value={v.label}
                            onChange={(e) => update(e, "label", i)}
                          />
                          <TextInput
                            id={`${id || name}-url-${i}`}
                            key={`${id || name}-url-${i}`}
                            value={v.url}
                            onChange={(e) => update(e, "url", i)}
                          />
                          <IconButton
                            renderIcon={SubtractAlt32}
                            iconDescription="Delete"
                            onClick={() => {
                              remove(i);
                            }}
                            kind="ghost"
                          />
                        </Row>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const renderForm = () => {
    return (
      <Row>
        <TextInput
          id={`${id}-label`}
          key={`${id}-label`}
          labelText={labelTextLabel}
          helperText={helperTextLabel}
          placeholder={placeholderLabel}
          value={label}
          onChange={(e) => {
            setLabel(e.target.value || "");
          }}
        />
        <TextInput
          id={`${id}-url`}
          key={`${id}-url`}
          labelText={labelTextUrl}
          helperText={helperTextUrl}
          placeholder={placeholderUrl}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value || "");
          }}
        />
        <IconButton
          renderIcon={AddAlt32}
          iconDescription="Add"
          kind="secondary"
          className="add"
          onClick={add}
        />
      </Row>
    );
  };

  return (
    <StyledFormItem>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      {renderForm()}
      {renderValue()}
      {helperText ? (
        <HelperText className="bx--form__helper-text" source={helperText} />
      ) : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </StyledFormItem>
  );
};

Links.defaultProps = {
  id: "links",
  defaultLabel: "URL",
  defaultUrl: "https://www.ibm.com",
  helperText: "",
  // helperText: 'List of corresponding published service ports that exist in the template and the formatting to be presented to the user. For example, a Port of 80 and a Template of http://targetDomain:targetPort/test1 means the template contains a published service for internal port 80 that would be shown to the user as http://services-uscentral.skytap.com:12345/test1 when requesting an environment in US-Central.',
  helperTextLabel: "The link label",
  helperTextUrl: "Please include a url",
  labelText: "Label",
  labelTextLabel: "Label",
  labelTextUrl: "URL",
  placeholderLabel: "Readme",
  placeholderUrl: "https://www.ibm.com",
  type: "link",
  prefix: "links",
  value: [],
};

Links.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  prefix: PropTypes.string,
  labelText: PropTypes.string,
  labelTextLabel: PropTypes.string,
  labelTextUrl: PropTypes.string,
  helperText: PropTypes.string,
  helperTextLabel: PropTypes.string,
  helperTextUrl: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  placeholderLabel: PropTypes.string,
  placeholderUrl: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  url: PropTypes.string,
  onChange: PropTypes.func,
};

export default Links;

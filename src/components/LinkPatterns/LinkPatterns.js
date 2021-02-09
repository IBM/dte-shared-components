import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormItem, FormLabel, TextInput } from "carbon-components-react";
import { AddAlt32, SubtractAlt32 } from "@carbon/icons-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { IconButton, InvalidText, HelperText, NumberInput } from "components";

import { getItemStyle, getListStyle, reorder } from "../../methods";

const StyledFormItem = styled(FormItem)`
  & .linkpatterns__wrapper {
    width: 100%;
    li {
      display: flex;
      list-style: none;
    }
  }
  & .linkpatterns__wrapper.invalid {
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

const LinkPatterns = ({
  id,
  name,
  prefix,
  label,
  labelText,
  labelTextPatternPort,
  labelTextServiceTemplate,
  helperText,
  helperTextPatternPort,
  helperTextServiceTemplate,
  invalid,
  invalidText,
  placeholderPatternPort,
  placeholderServiceTemplate,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(props.value || []);
  const [patternPort, setPatternPort] = useState(props.patternPort || "");
  const [serviceTemplate, setServiceTemplate] = useState(
    props.serviceTemplate || ""
  );

  useEffect(() => {
    handleChange();
  }, [value]);

  const handleChange = () => {
    if (onChange) onChange(name, value);
  };

  const add = () => {
    let t = [...value];
    t.push({ patternPort: patternPort, serviceTemplate: serviceTemplate });
    setValue(t);
    setPatternPort("");
    setServiceTemplate("");
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
                          <NumberInput
                            id={`${id || name}-patternPort-${i}`}
                            key={`${id || name}-patternPort-${i}`}
                            value={v.patternPort}
                            onChange={(e) => update(e, "patternPort", i)}
                            min={0}
                            max={65535}
                          />
                          <TextInput
                            id={`${id || name}-serviceTemplate-${i}`}
                            key={`${id || name}-serviceTemplate-${i}`}
                            value={v.serviceTemplate}
                            onChange={(e) => update(e, "serviceTemplate", i)}
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
        <NumberInput
          id={`${id}-patternPort`}
          key={`${id}-patternPort`}
          labelText={labelTextPatternPort}
          helperText={helperTextPatternPort}
          placeholder={placeholderPatternPort}
          value={patternPort}
          min={0}
          max={65535}
          onChange={(e) => {
            setPatternPort(e.target.value || "");
          }}
        />
        <TextInput
          id={`${id}-serviceTemplate`}
          key={`${id}-serviceTemplate`}
          labelText={labelTextServiceTemplate}
          helperText={helperTextServiceTemplate}
          placeholder={placeholderServiceTemplate}
          value={serviceTemplate}
          onChange={(e) => {
            setServiceTemplate(e.target.value || "");
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
      {label || labelText ? <FormLabel>{label || labelText}</FormLabel> : null}
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

LinkPatterns.defaultProps = {
  id: "linkpatterns",
  defaultPatternPort: "",
  defaultServiceTemplate: "http://targetDomain:targetPort/",
  helperText: "",
  // helperText: 'List of corresponding published service ports that exist in the template and the formatting to be presented to the user. For example, a Port of 80 and a Template of http://targetDomain:targetPort/test1 means the template contains a published service for internal port 80 that would be shown to the user as http://services-uscentral.skytap.com:12345/test1 when requesting an environment in US-Central.',
  helperTextPatternPort: "Opened port number",
  helperTextServiceTemplate:
    "Please include the direct published port link full length",
  labelText: "Link patterns",
  labelTextPatternPort: "Port",
  labelTextServiceTemplate: "Template",
  placeholderPatternPort: "80",
  placeholderServiceTemplate: "http://targetDomain:targetPort/test1",
  type: "linkpattern",
  prefix: "linkpatterns",
  value: [],
};

LinkPatterns.propTypes = {
  id: PropTypes.string,
  defaultPatternPort: PropTypes.string,
  defaultServiceTemplate: PropTypes.string,
  helperText: PropTypes.string,
  helperTextPatternPort: PropTypes.string,
  helperTextServiceTemplate: PropTypes.string,
  labelText: PropTypes.string,
  labelTextPatternPort: PropTypes.string,
  labelTextServiceTemplate: PropTypes.string,
  placeholderPatternPort: PropTypes.string,
  placeholderServiceTemplate: PropTypes.string,
  patternPort: PropTypes.string,
  serviceTemplate: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  type: PropTypes.string,
  prefix: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default LinkPatterns;

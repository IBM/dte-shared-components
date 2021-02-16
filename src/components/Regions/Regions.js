import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import {
  FormItem,
  FormLabel,
  StructuredListCell,
  StructuredListRow,
  StructuredListWrapper,
  TextInput,
  Toggle,
} from "carbon-components-react";
import { AddAlt32, SubtractAlt32 } from "@carbon/icons-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { ButtonSet, HelperText, IconButton, InvalidText } from "../../index";

// import { getItemStyle, getListStyle, reorder } from "../../lib/utils";

let StyledFormItem = styled(FormItem)`
  & .regions__wrapper {
    width: 100%;
  }
  & .regions__wrapper.invalid {
    outline: 2px solid #da1e28;
    outline-offset: -2px;
  }
  & .bx--structured-list-row {
    border-bottom: none;
  }
`;

const Regions = ({
  defaults,
  id,
  name,
  prefix,
  label,
  labelText,
  labelTextName,
  labelTextTemplate,
  // labelTextInfrastructure,
  labelTextRegion,
  labelTextRequestMethod,
  // labelTextDescription,
  labelTextStatus,
  helperText,
  helperTextName,
  helperTextTemplate,
  // helperTextInfrastructure,
  helperTextRegion,
  helperTextRequestMethod,
  // helperTextDescription,
  helperTextStatus,
  infrastructure,
  invalid,
  invalidText,
  // placeholder,
  placeholderName,
  placeholderTemplate,
  // placeholderInfrastructure,
  placeholderRegion,
  placeholderRequestMethod,
  // placeholderDescription,
  // placeholderStatus,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(props.value || []);
  const [regionName, setRegionName] = useState(defaults.name || "");
  const [template, setTemplate] = useState(defaults.template || "");
  const [region, setRegion] = useState(defaults.region || "");
  const [requestMethod, setRequestMethod] = useState(
    defaults.requestMethod || ""
  );
  const [description, setDescription] = useState(defaults.description || "");
  const [weight, setWeight] = useState(defaults.weight || 0);
  const [status, setStatus] = useState(defaults.status || "Enabled");

  const getItemStyle = (isDragging, draggableStyle) => {
    let style = {
      userSelect: "none",
      ...draggableStyle,
    };
    // if (isDragging) {
    //   style.margin = "0";
    //   style.border = "0";
    // }
    return style;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const getListStyle = (isDraggingOver) => {
    let style = {
      overflow: "hidden",
      background: isDraggingOver ? "#e7e7e7" : "none",
    };
    if (isDraggingOver) style.paddingBottom = "5rem";
    return style;
  };
  const handleChange = () => {
    if (onChange && typeof onChange === "function") onChange(name, value);
  };

  useEffect(() => {
    handleChange();
  }, [value]);

  const add = () => {
    let t = [...value];
    t.push({
      name: regionName,
      infrastructure: infrastructure,
      template: template,
      region: region,
      requestMethod: requestMethod,
      description: description,
      weight: weight,
      status: status,
    });
    setValue(t);
    setRegionName(defaults.name || "");
    setTemplate(defaults.template || "");
    setRegion(defaults.region || "");
    setRequestMethod(defaults.requestMethod || "");
    setDescription(defaults.description || "");
    setWeight(defaults.weight || 0);
    setStatus(defaults.status || "Enabled");
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
    for (let i = 0, l = items.length; i < l; i++) {
      items[i].weight = i;
    }
    setValue(items);
  };

  const renderField = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className={`${prefix}__wrapper${invalid ? " invalid" : ""}`}
            >
              <StructuredListWrapper className="fullwidth condensed">
                {renderHeader()}
                {renderForm()}
                {value &&
                  value.map((v, i) => {
                    return (
                      <Draggable
                        key={`${prefix}-${i}`}
                        draggableId={`${prefix}-${i}`}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className="bx--structured-list-row"
                          >
                            <StructuredListCell>
                              <TextInput
                                id={`${id || name}-name-${i}`}
                                key={`${id || name}-name-${i}`}
                                value={v.name}
                                onChange={(e) => update(e, "name", i)}
                              />
                            </StructuredListCell>
                            <StructuredListCell>
                              <TextInput
                                id={`${id || name}-template-${i}`}
                                key={`${id || name}-template-${i}`}
                                value={v.template}
                                onChange={(e) => update(e, "template", i)}
                              />
                            </StructuredListCell>
                            <StructuredListCell>
                              <TextInput
                                id={`${id || name}-region-${i}`}
                                key={`${id || name}-region-${i}`}
                                value={v.region}
                                onChange={(e) => update(e, "region", i)}
                              />
                            </StructuredListCell>
                            {v && v.infrastructure == "roks" ? (
                              <StructuredListCell>
                                <TextInput
                                  id={`${id || name}-requestMethod-${i}`}
                                  key={`${id || name}-requestMethod-${i}`}
                                  value={v.requestMethod}
                                  onChange={(e) =>
                                    update(e, "requestMethod", i)
                                  }
                                />
                              </StructuredListCell>
                            ) : null}
                            {/*
                            <StructuredListCell>
                              <TextInput
                                id={`${id || name}-description-${i}`}
                                key={`${id || name}-description-${i}`}
                                value={v.description}
                                onChange={(e) => update(e, "description", i)}
                              />
                            </StructuredListCell>
                            */}
                            <StructuredListCell>
                              <Toggle
                                id={`${id || name}-status-${i}`}
                                key={`${id || name}-status-${i}`}
                                name={`${id || name}-status-${i}`}
                                defaultToggled={v.status === "Enabled"}
                                onChange={(e) => {
                                  update(
                                    {
                                      target: {
                                        value: e.target.checked
                                          ? "Enabled"
                                          : "Disabled",
                                      },
                                    },
                                    "status",
                                    i
                                  );
                                }}
                              />
                            </StructuredListCell>
                            <StructuredListCell>
                              <ButtonSet>
                                <IconButton
                                  renderIcon={SubtractAlt32}
                                  iconDescription="Delete"
                                  onClick={() => {
                                    remove(i);
                                  }}
                                  kind="ghost"
                                />
                              </ButtonSet>
                            </StructuredListCell>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </StructuredListWrapper>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const renderForm = () => {
    return (
      <StructuredListRow>
        <StructuredListCell>
          <TextInput
            id={`${id || name}-name`}
            key={`${id || name}-name`}
            labelText={``}
            helperText={helperTextName}
            placeholder={placeholderName}
            value={regionName}
            min={0}
            max={65535}
            onChange={(e) => {
              setRegionName(e.target.value || "");
            }}
          />
        </StructuredListCell>
        <StructuredListCell>
          <TextInput
            id={`${id || name}-template`}
            key={`${id || name}-template`}
            labelText={``}
            helperText={helperTextTemplate}
            placeholder={placeholderTemplate}
            value={template}
            onChange={(e) => {
              setTemplate(e.target.value || "");
            }}
          />
        </StructuredListCell>
        <StructuredListCell>
          <TextInput
            id={`${id || name}-region`}
            key={`${id || name}-region`}
            labelText={``}
            helperText={helperTextRegion}
            placeholder={placeholderRegion}
            value={region}
            onChange={(e) => {
              setRegion(e.target.value || "");
            }}
          />
        </StructuredListCell>
        {infrastructure === "roks" ? (
          <StructuredListCell>
            <TextInput
              id={`${id || name}-requestMethod`}
              key={`${id || name}-requestMethod`}
              labelText={``}
              helperText={helperTextRequestMethod}
              placeholder={placeholderRequestMethod}
              value={requestMethod}
              onChange={(e) => {
                setRequestMethod(e.target.value || "");
              }}
            />
          </StructuredListCell>
        ) : null}
        {/*
        <StructuredListCell>
          <TextInput
            id={`${id || name}-description`}
            key={`${id || name}-description`}
            labelText={``}
            helperText={``}
            placeholder={placeholderDescription}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value || "");
            }}
          />
        </StructuredListCell>
        */}
        <StructuredListCell>
          <Toggle
            id={`${id || name}-status`}
            key={`${id || name}-status`}
            name={`${id || name}-status`}
            defaultToggled={status === "Enabled"}
            helperText={helperTextStatus}
            onChange={(e) => {
              setStatus(e.target.checked ? "Enabled" : "Disabled");
            }}
          />
        </StructuredListCell>
        <StructuredListCell>
          <ButtonSet>
            <IconButton
              renderIcon={AddAlt32}
              iconDescription="Add"
              kind="secondary"
              onClick={add}
              className="add"
            />
          </ButtonSet>
        </StructuredListCell>
      </StructuredListRow>
    );
  };
  const renderHeader = () => {
    return (
      <StructuredListRow label={false}>
        <StructuredListCell>
          <label className="bx--label">{labelTextName}</label>
        </StructuredListCell>
        <StructuredListCell>
          <label className="bx--label">{labelTextTemplate}</label>
        </StructuredListCell>
        <StructuredListCell>
          <label className="bx--label">{labelTextRegion}</label>
        </StructuredListCell>
        {infrastructure === "roks" ? (
          <StructuredListCell>
            <label className="bx--label">{labelTextRequestMethod}</label>
          </StructuredListCell>
        ) : null}
        <StructuredListCell>
          <label className="bx--label">{labelTextStatus}</label>
        </StructuredListCell>
        <StructuredListCell wrap={false} />
      </StructuredListRow>
    );
  };

  return (
    <StyledFormItem>
      {label || labelText ? <FormLabel>{label || labelText}</FormLabel> : null}
      {renderField()}
      {helperText ? (
        <HelperText className="bx--form__helper-text" source={helperText} />
      ) : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </StyledFormItem>
  );
};

Regions.defaultProps = {
  id: "regions",
  defaults: {
    template: "",
    name: "",
    infrastructure: "",
    region: "",
    requestMethod: "",
    description: "",
    status: "Enabled",
    weight: 0,
  },
  labelText: "Regions",
  labelTextName: "Name",
  labelTextTemplate: "Template",
  labelTextInfrastructure: "Infrastructure",
  labelTextRegion: "Region",
  labelTextRequestMethod: "Request Method",
  labelTextDescription: "Description",
  labelTextStatus: "Enabled",
  helperText: "",
  helperTextName:
    "Name of the environment.  Can be the same as the asset name.",
  helperTextTemplate: "Template id provided after onboarding (1234567)",
  helperTextInfrastructure: "",
  helperTextRegion: "Template id region (APAC-2, EMEA or US-Central)",
  helperTextRequestMethod:
    "OpenShift Pipeline (OpenLabs, Realtime, AWS, Azure)",
  helperTextDescription: "",
  helperTextStatus:
    "ON (template is available for provisioning) OFF (template unavailable for provisioning)",
  placeholder: "",
  placeholderName: "",
  placeholderTemplate: "",
  placeholderInfrastructure: "",
  placeholderRegion: "",
  placeholderRequestMethod: "",
  placeholderDescription: "",
  placeholderStatus: "",
  type: "regions",
  prefix: "regions",
  value: [],
};

Regions.propTypes = {
  defaults: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  prefix: PropTypes.string,
  label: PropTypes.string,
  labelText: PropTypes.string,
  labelTextName: PropTypes.string,
  labelTextTemplate: PropTypes.string,
  labelTextInfrastructure: PropTypes.string,
  labelTextRegion: PropTypes.string,
  labelTextRequestMethod: PropTypes.string,
  labelTextDescription: PropTypes.string,
  labelTextStatus: PropTypes.string,
  helperText: PropTypes.string,
  helperTextName: PropTypes.string,
  helperTextTemplate: PropTypes.string,
  helperTextInfrastructure: PropTypes.string,
  helperTextRegion: PropTypes.string,
  helperTextRequestMethod: PropTypes.string,
  helperTextDescription: PropTypes.string,
  helperTextStatus: PropTypes.string,
  infrastructure: PropTypes.string,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderName: PropTypes.string,
  placeholderTemplate: PropTypes.string,
  placeholderInfrastructure: PropTypes.string,
  placeholderRegion: PropTypes.string,
  placeholderRequestMethod: PropTypes.string,
  placeholderDescription: PropTypes.string,
  placeholderStatus: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default Regions;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormItem, FormLabel, Tag, TextInput } from "carbon-components-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { HelperText, InvalidText, TypeaheadInputText } from "components";

import { safeIdName } from "lib/utils";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getListStyle = (isDraggingOver) => ({
  paddingBottom: isDraggingOver ? "2rem" : "",
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

const TagInputTypeaheadNew = ({
  id,
  name,
  delim,
  disabled,
  filter,
  invalid,
  invalidText,
  labelText,
  helperText,
  inputPlaceHolder,
  namespace,
  type,
  unique,
  value,
  validator,
  onChange,
  // eslint-disable-next-line no-unused-vars
  onClick,
  ...rest
}) => {
  const [tags, setTags] = useState(value);
  const [focus, setFocus] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [inputValue, setInputValue] = useState();

  useEffect(() => {
    handleChange();
  }, [tags]);

  useEffect(() => {
    handlePasted();
  }, [pasted]);

  const removeTag = (i) => {
    let t = [...tags];
    t.splice(i, 1);
    setTags(t);
  };

  const addTag = (tag) => {
    let t = [...tags];
    if (validator(tag)) {
      if (!tags || tags.length === 0) {
        // t.push(tag);
        setTags([...tags, tag]);
      } else if (unique && typeof rest.itemToString === "function") {
        if (!t.find((o) => rest.itemToString(o) === rest.itemToString(tag)))
          setTags([...tags, tag]);
      } else {
        // t.push(tag);
        setTags([...tags, tag]);
      }
    }
    // setTags(t);
    onChange(name, tags);
    clearInput();
  };

  const editTag = (i) => {
    let e = tags[i],
      t = [...tags];
    t.splice(i, 1);
    setTags(t);
    if (e && e.name) setInputValue(e.name);
  };

  const onDragEnd = (result) => {
    if (!result || !result.destination) return;
    const items = reorder(tags, result.source.index, result.destination.index);
    setTags(items);
  };

  const inputKeyUp = (e) => {
    const val = e && e.target && e.target.value;
    if ((e.key === "Enter" || e.key === "Tab") && val) {
      addTag(val);
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    } else if (e.key === "," && val) {
      let v = val.slice(0, -1);
      addTag(v);
    }
  };

  const handlePasted = () => {
    // have to get the value from the Text field
    let val = ""; //tagInput.value || "";
    if (!val) return;
    let parts = val
      .split(delim)
      .map((p) => p.toString().trim())
      .filter(validator);
    let t = [...tags];
    for (let p of parts) {
      if (p) t.push(p);
    }
    setTags(t);
    clearInput();
  };

  const handleChange = () => {
    if (onChange) onChange(name, tags);
  };

  const clearInput = () => {
    setInputValue("");
  };

  if (disabled)
    return <TextInput labelText={labelText} helperText={helperText} value={value} disabled />;

  return (
    <FormItem id={id} {...rest}>
      {labelText ? <FormLabel>{labelText}</FormLabel> : null}
      <div
        className={`${namespace}${invalid ? " invalid" : ""}${focus ? " focus" : ""}`}
        onKeyPress={() => {
          // tagRef.current.focus();
        }}
        onClick={() => {
          // tagRef.current.focus();
        }}
        role="listbox"
        tabIndex={-1}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className={`${namespace}__tags`}>
                {tags &&
                  tags.map((tag, i) => (
                    <Draggable
                      key={`${safeIdName(tag.utcode || tag)}-${i}`}
                      draggableId={`${safeIdName(tag.utcode || tag)}-${i}`}
                      index={i}>
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={`${namespace}-${i}`}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                          <Tag
                            onClick={() => {
                              editTag(i);
                            }}
                            onClose={(e) => {
                              e.preventDefault();
                              removeTag(i);
                            }}
                            type={type}
                            filter={filter}>
                            {tag.name}
                          </Tag>
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <li className={`${namespace}__tags__input`}>
                  <TypeaheadInputText
                    placeholder={inputPlaceHolder}
                    className="bx--text-input"
                    wrap={false}
                    onKeyUp={inputKeyUp}
                    onFocus={() => {
                      setFocus(true);
                    }}
                    onBlur={(e) => {
                      let v = e.target.value;
                      addTag(v);
                      setFocus(false);
                    }}
                    onPaste={() => {
                      setPasted(true);
                    }}
                    value={inputValue}
                    {...rest}
                  />
                </li>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {helperText ? <HelperText className="bx--form__helper-text" source={helperText} /> : null}
      <InvalidText name={name} invalid={invalid}>
        {invalidText}
      </InvalidText>
    </FormItem>
  );
};

TagInputTypeaheadNew.defaultProps = {
  id: "tags",
  name: "tags",
  labelText: "Tags",
  value: [],
  type: "gray",
  title: "Remove",
  filter: true,
  namespace: "input-tag",
  inputPlaceHolder: "",
  delim: ",",
  className: "",
  unique: true,
  min: 2,
  max: 50,
  items: () => {},
  itemToString: (s) => {
    return s.id || s;
  },
  itemToElement: (s) => {
    return (
      <div>
        {s.name} ({s.id})
      </div>
    );
  },
  validator: (v) => {
    v = v.toString();
    return v && v !== null && v !== undefined;
  },
};

TagInputTypeaheadNew.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  delim: PropTypes.string,
  disabled: PropTypes.bool,
  filter: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  inputPlaceHolder: PropTypes.string,
  namespace: PropTypes.string,
  type: PropTypes.string,
  unique: PropTypes.bool,
  value: PropTypes.any,
  validator: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default TagInputTypeaheadNew;

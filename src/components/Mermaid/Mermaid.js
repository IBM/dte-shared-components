import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// cdn mermaid //cdnjs.cloudflare.com/ajax/libs/mermaid/8.6.4/mermaid.min.js
import mermaid from "public/js/mermaid.min.js"; // package doesnt work from npm ... use min ver

import { InlineNotification } from "carbon-components-react";
import { Renew16 } from "@carbon/icons-react";

import { ButtonSet, IconButton, AutoGrowTextArea } from "components";

import { mongoObjectId } from "lib/utils";

const ScrollingDiv = styled.div`
  width: 100%;
  overflow: auto;
  text-align: center;
  & .edgeLabel {
    font-size: 0.8rem;
  }
`;

const MermaidDiagram = ({
  config,
  value,
  id = mongoObjectId(),
  onClick,
  onMouseEnter,
  onMouseLeave,
  theme = "neutral",
}) => {
  const [definition, setDefinition] = useState(value);
  const [errors, setErrors] = useState();
  const [svg, setSvg] = useState();
  const key = `mermaid-${id}`;
  const ref = useRef();

  useEffect(() => {
    if (definition !== value) setDefinition(value);
  }, [value]);

  useEffect(() => {
    mermaidInitialize();
  }, [theme]);

  useEffect(() => {
    if (definition) {
      mermaidInitialize();
      mermaidRender(definition);
    }
  }, [definition]);

  useEffect(() => {
    if (
      svg &&
      ((onMouseLeave && typeof onMouseLeave === "function") ||
        (onMouseEnter && typeof onMouseEnter === "function") ||
        (onClick && typeof onClick === "function"))
    )
      mermaidBind();
  }, [svg]);

  const mermaidInitialize = () => {
    if (typeof mermaid !== "undefined" && mermaid) mermaid.initialize({ ...config, theme: theme });
  };

  const mermaidRender = (data) => {
    try {
      // console.log("mermaidRender", data);
      if (typeof mermaid !== "undefined" && mermaid) {
        mermaid.parse(data);
        if (!ref || !ref.current) throw new Error("no ref");
        mermaid.mermaidAPI.render(key, data, (result) => {
          // console.log("result", result);
          setSvg(result);
          setErrors(false);
        });
      }
    } catch (err) {
      // console.log("-->", err.message || err);
      if (["no ref", "e is null", "h is null"].includes(err.message))
        setErrors(
          "Unabled to generate mermaid svg.  Please close this message once you have updated the diagram to retry."
        );
      else setErrors(err.message || err.str || err);
    }
  };

  const mermaidBind = () => {
    const nodes =
      (ref && ref.current && Array.from(ref.current.querySelectorAll("g.node.clickable"))) || [];
    // console.log("mermaidBind", nodes, ref.current);
    nodes &&
      nodes.map((node) => {
        const i = (node && node.attributes && node.attributes.getNamedItem("id").value) || "";
        // console.log("-->", node, i);
        if (onClick) {
          node &&
            node.addEventListener(
              "click",
              () => {
                onClick(i);
              },
              true
            );
        }
        if (onMouseEnter) {
          node &&
            node.addEventListener(
              "mouseenter",
              () => {
                onMouseEnter(i);
              },
              true
            );
        }
        if (onMouseLeave) {
          node &&
            node.addEventListener(
              "mouseleave",
              () => {
                onMouseLeave(i);
              },
              true
            );
        }
      });
  };

  if (!definition) return null;
  return (
    <div>
      <div key={`preview-${key}`} id={key} />
      <ScrollingDiv key={`diagram-${key}`} ref={ref} dangerouslySetInnerHTML={{ __html: svg }} />
      {errors ? (
        <InlineNotification
          hideCloseButton={false}
          iconDescription="close error"
          kind="error"
          lowContrast
          notificationType="inline"
          onCloseButtonClick={() => {
            setErrors(false);
          }}
          role="alert"
          statusIconDescription="Error"
          subtitle={errors}
          title="Error"
        />
      ) : null}
    </div>
  );
};

const Mermaid = ({
  id,
  name,
  value = "",
  readOnly,
  onUpdate,
  onChange,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const [definition, setDefinition] = useState(value);

  useEffect(() => {
    // console.log("value", value, "definition", definition);
    if (definition !== value) setDefinition(value);
  }, [value]);

  const handleChange = (e) => {
    const v = (e && e.target && e.target.value) || "";
    setDefinition(v);
    if (onChange) onChange(name, v);
  };

  if (readOnly) {
    if (!definition) return null;
    return (
      <MermaidDiagram
        id={id || name}
        value={definition}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        readOnly
      />
    );
  }
  return (
    <>
      {definition ? (
        <MermaidDiagram
          id={id || name}
          value={definition}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ) : null}
      {onUpdate && typeof onUpdate === "function" ? (
        <ButtonSet>
          <IconButton
            kind="ghost"
            renderIcon={Renew16}
            iconDescription="Reset/reload"
            onClick={onUpdate}
            size="small"
          />
        </ButtonSet>
      ) : null}
      <AutoGrowTextArea id={id} name={name} value={value} onChange={handleChange} {...rest} />
    </>
  );
};

MermaidDiagram.defaultProps = {
  id: "mermaid-diagram",
  name: "mermaid-diagram",
  definition: undefined,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  config: {
    theme: "neutral",
    startOnLoad: false,
    securityLevel: "loose",
    htmlLabels: true,
    cloneCssStyles: false,
    fontSize: "12px",
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif',
    flowchart: {
      htmlLabels: true,
      useMaxWidth: false,
      curve: "basis",
    },
  },
};

Mermaid.defaultProps = {
  id: "mermaid",
  name: "mermaid",
  labelText: "",
  helperText: (
    <>
      For more informaion on what you can do with mermaidjs please refer to the{" "}
      <a target="_blank" href="https://mermaid-js.github.io/mermaid/#/flowchart" rel="noreferrer">
        mermaidjs docs
      </a>
      .
    </>
  ),
  value: "",
  onUpdate: undefined,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  readOnly: false,
  rows: 4,
  cols: 80,
  maxRows: 20,
};

Mermaid.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  readOnly: PropTypes.bool,
  onUpdate: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

MermaidDiagram.propTypes = {
  config: PropTypes.any,
  value: PropTypes.any,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  theme: PropTypes.string,
};

export default Mermaid;

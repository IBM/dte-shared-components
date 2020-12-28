import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Column, Grid, Row } from "carbon-components-react";
import { AddComment32, UserAvatar32, TrashCan20 } from "@carbon/icons-react";

import { Button } from "../Button/Button";
import { ButtonSet } from "../ButtonSet/ButtonSet";
import { Form } from "../Form/Form";
import { IconButton } from "../IconButton/IconButton";
import { EmailList } from "../EmailList/EmailList";
import { Readmore } from "../Readmore/Readmore";
import { Wysiwyg } from "../Wysiwyg/Wysiwyg";


// import { toLocaleDateString, toBoolean } from "lib/utils";
import { toBoolean } from '../../methods';
// Since it is outside, we need to move that specific library
const PUBLIC = toBoolean(process.env.PUBLIC || false);

const Styled = styled.div`
  & .bx--grid {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const CommentsList = styled.div`
  margin-top: 2rem;
`;

const Comment = styled(Column)`
  position: relative;
  border-top: #e0e0e0 1px solid;
  padding: 1rem 0 1rem 0;
`;

const CommentAction = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const CommentQuotation = styled.div`
  font-size: 1rem;
  quotes: "\201C""\201D""\2018""\2019";
  line-height: 1.5;
  min-height: 3rem;
  padding: 0 5rem 1rem 0;
  ::before {
    content: open-quote;
    display: inline;
    height: 0;
    line-height: 0;
    position: relative;
    top: 0.65rem;
    left: -0.5rem;
    color: rgba(22, 22, 22, 0.25);
    font-size: 10rem;
  }
  ::after {
    content: close-quote;
    display: inline;
    height: 0;
    line-height: 0;
    position: relative;
    top: 0.65rem;
    left: 0.5rem;
    color: rgba(22, 22, 22, 0.25);
    font-size: 2rem;
  }
`;

const CommentFooter = styled.div``;

const CommentIcon = styled.div`
  float: left;
  margin: 0 1rem 0 1rem;
  fill: rgba(22, 22, 22, 0.5);
`;

const CommentUser = styled.div`
  font-size: 0.9rem;
  margin: 1rem 0 0.25rem 0;
  & a {
    text-decoration: none;
    color: rgb(22, 22, 22);
  }
  & a:hover {
    text-decoration: underline;
  }
`;

const CommentDate = styled.div`
  font-size: 0.77rem;
  font-style: italic;
  color: rgba(22, 22, 22, 0.5);
`;

// this file fails eslint for some reasons with garable about  react/no-unescaped-entities
/* eslint-disable */
const Comments = ({
  namespace,
  moderator,
  readonly,
  masked,
  onDelete,
  onSubmit,
  toolbar,
  toLocaleDateString,
  ...rest
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(rest.comments || []);
  const [commented, setCommented] = useState(false);

  const handleChange = (name, value) => setComment(value);

  const handleSubmit = async () => {
    if (onSubmit) {
      try {
        let results = await onSubmit(comment);
        setComments(results);
      } catch (err) {
        console.log("Error", err.message || err);
      }
    }
    setComment("");
    setCommented(true);
    setTimeout(() => {
      setCommented(false);
    }, 3000);
  };

  const handleDelete = (uid) => {
    setComments((prev) => prev.filter((x) => x.id !== uid));
    if (onDelete) onDelete(uid);
  };

  return (
    <Styled>
      <Grid className={`${namespace}`} fullWidth>
        {!readonly ? (
          <Row condensed>
            <Column lg={10} md={8} sm={4}>
              <Form className={`${namespace}-form`}>
                {commented ? (
                  <p>Thank you for your feedback.</p>
                ) : (
                  <Wysiwyg
                    labelText=""
                    helperText=""
                    placeholder="Let us know what you think..."
                    toolbar={toolbar}
                    value={comment}
                    onChange={handleChange}
                  />
                )}
                <ButtonSet style={{ marginTop: "1rem" }}>
                  <Button
                    type="button"
                    kind="primary"
                    renderIcon={AddComment32}
                    onClick={handleSubmit}
                  >
                    Add comment
                  </Button>
                </ButtonSet>
              </Form>
            </Column>
          </Row>
        ) : null}
        {comments && comments.length > 0 ? (
          <CommentsList>
            {comments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((c, i) => {
                return (
                  <Row key={`${namespace}-list-${i}`} condensed>
                    <Comment
                      lg={10}
                      md={8}
                      sm={4}
                      className={`${namespace}-comment`}
                    >
                      {moderator ? (
                        <CommentAction>
                          <ButtonSet>
                            <IconButton
                              kind="ghost"
                              renderIcon={TrashCan20}
                              iconDescription="Delete"
                              onClick={() => {
                                handleDelete(c.id);
                              }}
                            />
                          </ButtonSet>
                        </CommentAction>
                      ) : null}
                      <CommentQuotation>
                        <Readmore
                          length={500}
                          toggle={true}
                          source={c.comment || ""}
                          disallowedTypes={["paragraph"]}
                          markdown={true}
                        />
                      </CommentQuotation>
                      <CommentFooter>
                        <CommentIcon>
                          <UserAvatar32 />
                        </CommentIcon>
                        <CommentUser>
                          {!masked ? (
                            <EmailList
                              list={[c.user]}
                              format="short"
                              hydrate={!PUBLIC}
                            />
                          ) : (
                            "*****"
                          )}
                        </CommentUser>
                        <CommentDate>
                          {toLocaleDateString(c.createdAt, "lll")}
                        </CommentDate>
                      </CommentFooter>
                    </Comment>
                  </Row>
                );
              })}
          </CommentsList>
        ) : null}
      </Grid>
    </Styled>
  );
};

Comments.defaultProps = {
  namespace: "comments",
  helperText: "",
  labelText: "",
  moderator: false,
  readonly: false,
  masked: false,
  toolbar: {
    toolbar: {
      container: [["bold", "italic", "underline"], ["link"]],
    },
  },
  onChange: () => {},
};

Comments.propTypes = {
  namespace: PropTypes.string,
  moderator: PropTypes.bool,
  readonly: PropTypes.bool,
  masked: PropTypes.bool,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
  toolbar: PropTypes.any,
};

export default Comments;

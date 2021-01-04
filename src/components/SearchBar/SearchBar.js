import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { throttle } from "lodash";

import { Grid, Row, Column } from "carbon-components-react";
import { Bookmark32, Favorite32 } from "@carbon/icons-react";
import { ButtonSet, DataSearch, IconButton, ReactiveBase } from "components";

import initReactivesearch from "@appbaseio/reactivesearch/lib/server";

import { isLoggedIn } from "lib/auth";

const NAMESPACE = "collection";

const COMPONENTS = {
  settings: {
    app: NAMESPACE,
  },
  dataSearch: {
    componentId: "searchbox",
    highlight: true,
    customHighlight: () => ({
      highlight: {
        pre_tags: ["***"],
        post_tags: ["***"],
        fields: {
          name: {},
          description: {},
          synopsis: {},
        },
        number_of_fragments: 0,
      },
    }),
    fuzziness: 2,
    dataField: [
      "name",
      "description",
      "synopsis",
      "categories.name",
      "businessUnits.name",
      "products.name",
      "links.name",
      "platforms.name",
      "tags",
    ],
    debounce: 500,
    fieldWeights: [10, 5, 3, 1, 1, 1, 2],
    URLParams: false,
  },
};

const SearchBar = ({
  base,
  bookmarks,
  buttons,
  children,
  favorites,
  name,
  user = {},
  onChange,
  onSubmit,
  store,
  wrap,
  // eslint-disable-next-line no-unused-vars
  ...rest
}) => {
  const [query, setQuery] = useState();

  useEffect(() => {
    setTimeout(() => {
      document &&
        document.getElementById("searchbox-downshift-input") &&
        document.getElementById("searchbox-downshift-input").focus();
    }, 500);
  }, []);

  const handleSubmit = (e, v) => {
    if (onSubmit && typeof onSubmit === "function") onSubmit(query || v || "");
    else Router.push(`${base}&${name}=%22${query || v || ""}%22`);
  };

  const handleSubmitThrottled = useRef(throttle(handleSubmit, 500, { trailing: false })).current;

  const handleChange = (v, triggerQuery, e) => {
    setQuery(v);
    triggerQuery();
    if (onChange && typeof onChange === "function") onChange(e, v);
  };

  const handleSelected = (v) => {
    setQuery(v);
    handleSubmitThrottled(null, v);
    if (onChange && typeof onChange === "function") onChange(null, v);
  };

  const handleKeydown = (e) => {
    if ((e.charCode || e.keyCode) === 13 || e.key === "Enter") handleSubmitThrottled(e);
  };

  let buttonset =
    user && isLoggedIn(user) && (buttons || favorites || bookmarks) ? (
      <ButtonSet className="search-buttons">
        {favorites ? (
          <IconButton
            renderIcon={Favorite32}
            iconDescription="My favorites"
            kind="primary"
            onClick={() => {
              Router.push("/my/favorites");
            }}
          />
        ) : null}
        {bookmarks ? (
          <IconButton
            renderIcon={Bookmark32}
            iconDescription="My bookmarked searches"
            kind="primary"
            onClick={() => {
              Router.push("/my/bookmarks");
            }}
          />
        ) : null}
        {buttons}
      </ButtonSet>
    ) : null;

  let searchbar = (
    <>
      <DataSearch
        {...COMPONENTS.dataSearch}
        onChange={handleChange}
        onValueSelected={handleSelected}
        onKeyDown={handleKeydown}
      />
      {buttonset}
    </>
  );

  if (!wrap)
    return (
      <ReactiveBase {...COMPONENTS.settings} initialState={store}>
        {children}
        {searchbar}
      </ReactiveBase>
    );

  return (
    <ReactiveBase {...COMPONENTS.settings} initialState={store}>
      <Grid className="search-container" fullWidth>
        <Row condensed>
          <Column lg={16} md={8} sm={4} className="search-bar">
            {searchbar}
          </Column>
        </Row>
      </Grid>
      {children}
    </ReactiveBase>
  );
};

SearchBar.defaultProps = {
  base: "/search?StatusFilter=%5B%22Active%22%5D", // default base url for search
  name: "searchbox", // query param name
  size: "xl", // default to xl
  closeButtonLabelText: "Close",
  defaultValue: "", // default value in search
  user: {}, // userer
  buttons: null, // more buttons
  bookmarks: true, // enable bookmarks button
  favorites: true, // enable favorites button
  onChange: null, // custom onChange handler
  onSubmit: null, // custom onSubmit handler
  wrap: true,
};

SearchBar.propTypes = {
  base: PropTypes.string,
  bookmarks: PropTypes.bool,
  buttons: PropTypes.any,
  children: PropTypes.any,
  favorites: PropTypes.bool,
  name: PropTypes.string,
  user: PropTypes.any,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  store: PropTypes.any,
  wrap: PropTypes.bool,
};

export async function getInitialProps() {
  let store;
  try {
    store = await initReactivesearch(
      [
        {
          ...COMPONENTS.dataSearch,
          type: "DataSearch",
          source: DataSearch,
        },
      ],
      null,
      COMPONENTS.settings
    );
  } catch (err) {
    console.log("getInitialProps Error", err.message || err);
  }
  return {
    store: store,
  };
}

export default SearchBar;

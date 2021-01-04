import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TooltipIcon } from "carbon-components-react";
import { Favorite32, UserFavoriteAltFilled32 } from "@carbon/icons-react";

import { trackNav } from "lib/analytics";
import { getEmail, isLoggedIn, getAuthorization } from "lib/auth";
import { favorited, favorite, unfavorite } from "lib/favorite";

const Button = styled.div`
  margin: 0 0.5rem;
  color: #fff;
  overflow: hidden;
  cursor: pointer;
  & > svg {
    fill: #fff;
  }
`;

const FavoritePageButton = ({
  altLabelText,
  data,
  labelText,
  onChange,
  value = false,
  user = {},
  model,
  ...rest
}) => {
  const [fav, setFav] = useState(false);
  const [email, setEmail] = useState(false);
  const [mid, setMid] = useState(value);

  useEffect(() => {
    if (value) setMid(value);
  }, [value]);

  useEffect(() => {
    if (user) setEmail(getEmail(user));
  }, [user]);

  useEffect(() => {
    if (email && model && mid) {
      const getFavorited = async () => {
        try {
          let resp = await favorited(email, model, mid);
          setFav(resp);
        } catch (err) {
          console.log("Error", err.message || err);
        }
      };
      getFavorited();
    }
  }, [email]);

  const handleChange = () => {
    if (fav) {
      unfavorite(email, model, mid, fav, getAuthorization(user));
      trackNav({ ...data, type: "Button", milestone: "Unfavorite" });
    } else {
      favorite(email, model, mid, getAuthorization(user));
      trackNav({ ...data, type: "Button", milestone: "Favorite" });
    }
    if (onChange && typeof onChange === "function") onChange(!fav);
    setFav(!fav);
  };

  if (!isLoggedIn(user) || !email || !mid) return null;
  return (
    <TooltipIcon tooltipText={fav ? altLabelText : labelText}>
      <Button onClick={handleChange} {...rest}>
        {fav ? (
          <UserFavoriteAltFilled32 style={{ fill: "#fff" }} />
        ) : (
          <Favorite32 style={{ fill: "#fff" }} />
        )}
      </Button>
    </TooltipIcon>
  );
};

FavoritePageButton.defaultProps = {
  labelText: "Add to favorites",
  altLabelText: "Remove from favorites",
  value: false,
  model: "collection",
  onChange: () => {},
};

FavoritePageButton.propTypes = {
  altLabelText: PropTypes.string,
  data: PropTypes.any,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  user: PropTypes.any,
  model: PropTypes.string,
};

export default FavoritePageButton;

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { navigate } from "react-big-calendar/lib/utils/constants";

const CalendarMinToolbar = ({
  localizer: { messages },
  label,
  view,
  views,
  onView,
  onNavigate,
}) => {
  const handleNav = (v) => {
    if (onNavigate && typeof onNavigate === "function") onNavigate(v);
  };

  const handleView = (v) => {
    if (onView && typeof onView === "function") onView(v);
  };

  const renderViews = () => {
    if (views && views.length > 1) {
      return views.map((name) => (
        <button
          type="button"
          key={name}
          className={clsx({ "rbc-active": view === name })}
          onClick={handleView(name)}>
          {messages[name]}
        </button>
      ));
    }
  };

  if (views && views.length > 1)
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={handleNav(navigate.PREVIOUS)}>
            {messages.previous}
          </button>
          <button type="button" onClick={handleNav(navigate.NEXT)}>
            {messages.next}
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">{renderViews()}</span>
      </div>
    );
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={handleNav(navigate.PREVIOUS)}>
          {messages.previous}
        </button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button type="button" onClick={handleNav(navigate.NEXT)}>
          {messages.next}
        </button>
      </span>
    </div>
  );
};

CalendarMinToolbar.defaultProps = {
  label: "",
  view: "",
  onView: () => {},
  onNavigate: () => {},
};

CalendarMinToolbar.propTypes = {
  localizer: PropTypes.any,
  label: PropTypes.string,
  view: PropTypes.string,
  views: PropTypes.any,
  onView: PropTypes.func,
  onNavigate: PropTypes.func,
};

export default CalendarMinToolbar;

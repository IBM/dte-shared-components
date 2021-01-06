import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import useSWR from "swr";

import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderPanel,
  HeaderSideNavItems,
  InlineNotification,
  NotificationActionButton,
  SideNav,
  SideNavItems,
  SideNavMenuItem,
  SkipToContent,
  Switcher,
  SwitcherItem,
  SwitcherDivider,
  Grid,
  Row,
  Column,
} from "carbon-components-react";
import {
  Login20,
  Notification20,
  UserAvatar20,
  Search20,
} from "@carbon/icons-react";

import { ContentModal, Markdown, ScrollToTopButton } from "components";
import { useLocalStorage } from "lib/state";
import { trackNav } from "lib/analytics";
import { getEmail, isLoggedIn, hasAuthority } from "lib/auth";
import { fetcher } from "lib/crud";

import packageJson from "../package.json";
import navigation from "data/navigation.json";
import actions from "data/actions.json";

const Styled = styled.span`
  & .bx--dotcom-shell {
    min-height: 20rem;
  }
  & .bx--header__search--actions,
  .bx--locale-btn__container {
    display: none;
  }

  & .bx--tableofcontents {
    & .bx--grid {
      max-width: 100%;
    }

    & .bx--tableofcontents__content-wrapper {
      padding-bottom: 15rem;
      @media (max-width: 672px) {
        padding-bottom: 3rem;
      }
      & .bx--card__heading {
        margin-bottom: 2rem;
      }
    }
  }

  /*
.bx--dotcom-shell__content {
  width: 100%;
  max-width: 100% !important;
}
*/

  & .bx--header {
    width: 100%;
    // max-width: 100% !important;

    & .header-panel-profile {
      padding: 1rem 1rem 2rem 1rem;
      width: 100%;
      color: #fff;
      & .header-panel-profile-name {
        font-size: var(--cds-expressive-heading-02-font-size, 1rem);
        font-weight: var(--cds-expressive-heading-02-font-weight, 600);
        line-height: var(--cds-expressive-heading-02-line-height, 1.5rem);
        letter-spacing: var(--cds-expressive-heading-02-letter-spacing, 0);
      }
      & .header-panel-profile-info {
        font-size: var(--cds-caption-01-font-size, 0.75rem);
        font-weight: var(--cds-caption-01-font-weight, 400);
        line-height: var(--cds-caption-01-line-height, 1rem);
        letter-spacing: var(--cds-caption-01-letter-spacing, 0.32px);
      }
    }
  }

  & #main {
    position: relative;
  }

  & .site-footer {
    min-height: 5rem;
  }

  & .site-notification {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    & .bx--inline-notification {
      width: 100%;
      max-width: 100%;
    }
  }

  & .bx--header__action {
    position: relative;
  }

  & .decorator {
    background-color: #e62326;
    border-radius: 50%;
    height: 0.75rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: 0.75rem;
    color: #fff;
    font-size: 0.5rem;
  }
`;

const SiteHeader = ({ prefix, router, user = {} }) => {
  // const { asPath = "/" } = router;
  const { roles = [] } = user;
  const title = packageJson.title || ""; //
  const menu = (
    <SiteNavigation links={navigation.links} router={router} roles={roles} />
  );
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="IBM Environment Name">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <Link href="/" passHref={true}>
            <HeaderName prefix={prefix || "IBM"}>{title}</HeaderName>
          </Link>
          <HeaderNavigation aria-label={`${prefix || "IBM"} ${title}`}>
            {menu}
          </HeaderNavigation>
          <SiteActionBar router={router} user={user} />
          <SiteSideNavigation isSideNavExpanded={isSideNavExpanded}>
            {menu}
          </SiteSideNavigation>
        </Header>
      )}
    />
  );
};

const SiteNavigation = ({ links = [], router, roles = [] }) => {
  if (!links) return null;
  return links.map((n, i) => {
    if (!hasAuthority(n.roles, roles)) return null;
    if (n && n.links) {
      return (
        <HeaderMenu
          aria-label={n.label}
          menuLinkName={n.label}
          isCurrentPage={
            !n.nomatch && router.pathname === n.href ? true : false
          }
          key={`headermenu-${i}`}
        >
          <SiteNavigation links={n.links} router={router} roles={roles} />
        </HeaderMenu>
      );
    }
    return (
      <Link href={n.href} key={`menu-${i}`}>
        <HeaderMenuItem
          href={n.href}
          isCurrentPage={
            !n.nomatch && router.pathname === n.href ? true : false
          }
        >
          <Markdown source={n.label} disallowedTypes={["paragraph"]} />
        </HeaderMenuItem>
      </Link>
    );
  });
};

const PageNavigation = ({ links = [], path, roles = [] }) => {
  if (!links) return null;
  return links
    .map((n) => {
      if (n.roles && !hasAuthority(n.roles, roles)) return null;
      else if (n && n.links && path === n.href)
        return n.links.map((l) => {
          if (!hasAuthority(l.roles, roles)) return null;
          if (l.sidenav === true)
            return (
              <Link href={l.href}>
                <SideNavMenuItem href={l.href}>{l.label}</SideNavMenuItem>
              </Link>
            );
          return null;
        });
      else if (n && n.links)
        return <PageNavigation links={n.links} path={path} roles={roles} />;
      else return null;
    })
    .filter((o) => o !== null);
};

// small badge component for highlighting the number of alerts
///bring in seprate comp.
const Badge = ({ number, label = "notification", plural = "s" }) => {
  return number === 0 ? null : (
    <div
      className="decorator"
      title={`${number} ${label}${number === 1 ? "" : plural}`}
    >
      {number}
    </div>
  );
};

const HeaderGlobalActionNotification = ({ router }) => {
  const { data, isValidating } = useSWR(`/api/notifications`, fetcher); // get the notifications list
  // eslint-disable-next-line no-unused-vars
  const [acknowledged, setAcknowledged] = useLocalStorage("notifications", []); // get the users acknowledged set
  const [notifications, setNotifications] = useState([]); // placeholder for difference ...
  const { asPath = "/" } = router;
  useEffect(() => {
    if (!data || data.error) return; // no data or error ... just exit for now
    // filter the list to determine the difference
    const result =
      data && data.length > 0
        ? data.filter((d) => d && !acknowledged.includes(d))
        : [];
    setNotifications(result); // set the notifications
  }, [data]); // when data changes ...
  return (
    <HeaderGlobalAction
      aria-label="Notifications"
      isActive={asPath && asPath === "/notifications" ? true : false}
      onClick={() => {
        router.push("/notifications");
        trackNav({
          name: "Notifications",
          type: "Button",
          milestone: "Notifications",
        });
      }}
    >
      <Notification20 />
      {!isValidating && notifications && notifications.length > 0 ? (
        <Badge number={notifications.length} />
      ) : null}
    </HeaderGlobalAction>
  );
};

const SiteActionBar = ({ user = {}, router }) => {
  const [showHeaderPanel, setShowHeaderPanel] = useState(false);
  const { asPath = "/" } = router;
  return (
    <>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Search"
          onClick={() => {
            router.push("/search");
            setTimeout(() => {
              // complete hack ... switch to ref later or some other hook
              let elem =
                document &&
                document.getElementById("searchbox-downshift-input");
              if (elem) {
                elem.focus();
                let rect = elem.getBoundingClientRect();
                if (rect) window.scrollTo(0, rect.top);
              }
            }, 500);
            trackNav({ name: "Search", type: "Button", milestone: "Search" });
          }}
        >
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalActionNotification user={user} router={router} />
        {isLoggedIn(user) ? (
          <HeaderGlobalAction
            aria-label="Profile"
            isActive={showHeaderPanel}
            onClick={() => {
              setShowHeaderPanel(!showHeaderPanel);
              trackNav({
                name: "Header panel",
                type: "Button",
                milestone: `Header panel ${showHeaderPanel ? "show" : "hide"}`,
              });
            }}
          >
            <UserAvatar20 />
          </HeaderGlobalAction>
        ) : (
          <HeaderGlobalAction
            aria-label="Login"
            onClick={() => {
              trackNav({
                type: "Button",
                milestone: "Login",
                name: "Login",
              });
              router.push(`/login?originalUrl=${asPath}`);
            }}
          >
            <Login20 title="Login" />
          </HeaderGlobalAction>
        )}
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={showHeaderPanel}>
        <Switcher aria-label="User profile switcher container">
          <li className="header-panel-profile">
            {user && user.persona && user.persona === "ibmer" ? (
              <img
                src={`https://w3-services1.w3-969.ibm.com/myw3/unified-profile-photo/v1/image/${getEmail(
                  user
                )}`}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  display: "block",
                  borderRadius: "50%",
                  margin: "0 auto 2rem",
                }}
                alt="user profile"
                layout="responsive"
              />
            ) : null}
            <p className="header-panel-profile-name">{user.displayName}</p>
            <p className="header-panel-profile-info">{getEmail(user)}</p>
            <p className="header-panel-profile-info">{user.company}</p>
          </li>
          {actions
            ? actions.map((a, i) => {
                if (a.hasDivider)
                  return (
                    <React.Fragment key={`switcher-menu-${i}-wrapper`}>
                      <SwitcherDivider key={`switcher-menu-${i}-divider`} />
                      <Link href={a.href} key={`switcher-menu-${i}`}>
                        <SwitcherItem aria-label={a.label} href={a.href}>
                          {a.label}
                        </SwitcherItem>
                      </Link>
                    </React.Fragment>
                  );
                return (
                  <Link href={a.href} key={`switcher-menu-${i}`}>
                    <SwitcherItem aria-label={a.label} href={a.href}>
                      {a.label}
                    </SwitcherItem>
                  </Link>
                );
              })
            : null}
        </Switcher>
      </HeaderPanel>
    </>
  );
};

const SiteSideNavigation = ({ isSideNavExpanded, children, ...rest }) => {
  if (!children) return null;
  return (
    <SideNav expanded={isSideNavExpanded} {...rest}>
      <SideNavItems>
        <HeaderSideNavItems>{children}</HeaderSideNavItems>
      </SideNavItems>
    </SideNav>
  );
};

const SiteNotification = () => {
  const [acknowledged, setAcknowledged] = useLocalStorage(
    "site-notification",
    0
  );
  const [moreInfo, setMoreInfo] = useState(false);
  // get some official verbage for this
  const message = (
    <p>
      <strong>IMPORTANT NOTICE</strong>: All content shared in this application
      will be accessible by all IBMers.
    </p>
  );
  if (acknowledged) return null;
  return (
    <>
      {moreInfo ? (
        <ContentModal
          name="site-notification-data-privacy"
          primaryButtonText="Ok"
          secondaryButtonText="Cancel"
          onSubmit={() => {
            setAcknowledged(1);
            setMoreInfo(false);
          }}
          onClose={() => {
            setMoreInfo(false);
          }}
        />
      ) : null}
      <div className="site-notification">
        <InlineNotification
          actions={
            <NotificationActionButton
              onClick={() => {
                setMoreInfo(1);
              }}
            >
              More info
            </NotificationActionButton>
          }
          hideCloseButton={false}
          iconDescription="Acknowledge"
          kind="info"
          notificationType="inline"
          onCloseButtonClick={() => {
            setAcknowledged(1);
          }}
          role="alert"
          statusIconDescription="Acknowledge"
          title={message}
        />
      </div>
    </>
  );
};

// pull together a list of links for a common footer ... maybe based on personas
const SiteFooter = () => {
  return (
    <Grid className="site-footer" fullWidth>
      <Row condensed>
        <Column lg={16} md={8} sm={4}></Column>
      </Row>
    </Grid>
  );
};

const SiteLayout = ({ children, user = {}, ...rest }) => {
  const router = useRouter();
  return (
    <Styled>
      <SiteHeader user={user} router={router} />
      <section {...rest}>{children}</section>
      <SiteFooter user={user} router={router} />
      <ScrollToTopButton />
      <SiteNotification user={user} />
    </Styled>
  );
};

SiteSideNavigation.defaultProps = {
  "aria-label": "Side navigation",
  isPersistent: false,
};

SiteLayout.defaultProps = {
  id: "main",
};

SiteHeader.propTypes = {
  prefix: PropTypes.string,
  router: PropTypes.any,
  user: PropTypes.any,
};

HeaderGlobalActionNotification.propTypes = {
  user: PropTypes.any,
  router: PropTypes.any,
};

Badge.propTypes = {
  number: PropTypes.number,
  label: PropTypes.string,
  plural: PropTypes.string,
};

SiteActionBar.propTypes = {
  user: PropTypes.any,
  router: PropTypes.any,
};

SiteSideNavigation.propTypes = {
  isSideNavExpanded: PropTypes.bool,
  children: PropTypes.any,
};

SiteNavigation.propTypes = {
  links: PropTypes.array,
  router: PropTypes.any,
  roles: PropTypes.array,
};

SiteNotification.propTypes = {
  user: PropTypes.any,
};

SiteLayout.propTypes = {
  children: PropTypes.any,
  user: PropTypes.any,
};

export default SiteLayout;

import Link from "next/link";

import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";

const Breadcrumbs = ({ noTrailingSlash, breadcrumbs = [] }) => {
  return (
    <Breadcrumb noTrailingSlash={noTrailingSlash} className="breadcrumbs">
      {breadcrumbs.map((o, i) => {
        return (
          <BreadcrumbItem key={`breadcrumb-${i}`}>
            <Link href={o.href}>
              <a>{o.label}</a>
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

Breadcrumbs.defaultProps = {
  noTrailingSlash: true,
  breadcrumbs: [],
};

export default Breadcrumbs;
import { Breadcrumbs as MUIBreadcrumbs, Link as MUILink } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  link: string;
}

function Breadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const pathSegments = pathname.split("/");

    let link: string;
    let label: string;

    const newBreadcrumbs = pathSegments.reduce((acc: BreadcrumbItem[], segment) => {
      if (segment === "dashboard" || segment === "dash") {
        link = "/dash";
        label = "Dashboard";
      } else {
        link = `${pathSegments.join("")}`; // Build link from segments
        label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize first letter
      }
      acc.push({ label, link });
      return acc;
    }, []);

    setBreadcrumbs(newBreadcrumbs);
  }, [location]);

  return (
    <div className="h-[5rem] flex items-center justify-center justify-self-start">
      <div className="flex flex-col ">
        <MUIBreadcrumbs separator="/" aria-label="breadcrumb" className="text-base-content">
          {breadcrumbs.slice(0, breadcrumbs.length - 1).map((crumb) => {
            if (crumb.label === "")
              return (
                <MUILink
                  key={crumb.label}
                  underline="hover"
                  color="inherit"
                  href="/dash"
                  className="text-base-content/40 hover:text-base-content text-lg"
                >
                  Page
                </MUILink>
              );
            return (
              <MUILink
                key={crumb.label}
                underline="hover"
                color="inherit"
                href={crumb.link}
                className="text-base-content/40 hover:text-base-content text-lg"
              >
                {crumb.label}
              </MUILink>
            );
          })}

          <MUILink
            underline="hover"
            color="inherit"
            href={`/dash${breadcrumbs[breadcrumbs.length - 1]?.label.toLowerCase() === "dashboard" ? "" : `/${breadcrumbs[breadcrumbs.length - 1]?.label.toLowerCase()}`}`}
            className="text-base-content text-sm "
          >
            {breadcrumbs[breadcrumbs.length - 1]?.label}
          </MUILink>
        </MUIBreadcrumbs>
        <h5 className="h5 font-bold">{breadcrumbs[breadcrumbs.length - 1]?.label}</h5>
      </div>
    </div>
  );
}
export default Breadcrumbs;

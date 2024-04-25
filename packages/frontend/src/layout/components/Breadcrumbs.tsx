import { Breadcrumbs as MUIBreadcrumbs, Typography, Link as MUILink } from "@mui/material";
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
    let pathSegments = pathname.split("/");

    if (pathSegments.every((path) => path === "")) {
      pathSegments = ["", "dashboard"];
    }

    let link: string;

    const newBreadcrumbs = pathSegments.reduce((acc: BreadcrumbItem[], segment, index) => {
      const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize first letter
      if (segment === "dashboard") {
        link = "";
      } else {
        link = `${pathSegments.slice(0, index + 1).join("")}`; // Build link from segments
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
                  href="/"
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

          <Typography variant="body1" className="text-base-content text-sm ">
            {breadcrumbs[breadcrumbs.length - 1]?.label}
          </Typography>
        </MUIBreadcrumbs>
        <h2 className="h5 font-bold">{breadcrumbs[breadcrumbs.length - 1]?.label}</h2>
      </div>
    </div>
  );
}
export default Breadcrumbs;

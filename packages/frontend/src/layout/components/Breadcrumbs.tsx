import { Breadcrumbs as MUIBreadcrumbs, Link as MUILink } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

interface BreadcrumbItem {
  label: string;
  link: string;
}

function Breadcrumbs() {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const location = useLocation();

  useEffect(() => {
    let { pathname } = location;
    pathname = pathname.endsWith("/") ? pathname.replace(/.$/, "") : pathname;
    const pathSegments = pathname.split("/").slice(0, 3);

    let concat = "";
    const newBreadcrubs = pathSegments.map((path) => {
      concat += `${path}/`;
      const labelLink = {
        link: concat,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        label: path === "dash" ? "dashboard" : path.replace(/-/gi, " "),
      };
      return labelLink;
    });

    setBreadcrumbs(newBreadcrubs);
  }, [location]);

  let mainPage = breadcrumbs[breadcrumbs.length - 1]?.label;

  if (mainPage === "adduser") {
    mainPage = "add new user";
  }

  return (
    <div className="h-[5rem] flex items-center justify-center justify-self-start">
      <div className="flex flex-col ">
        <h5 className="h5 font-bold capitalize">
          {mainPage} {mainPage === "users" || mainPage === "teams" || mainPage === "tasks" ? "Management" : ""}
        </h5>
        <MUIBreadcrumbs separator="/" aria-label="breadcrumb" className="text-base-content">
          {breadcrumbs.slice(0, breadcrumbs.length - 1).map((crumb) => {
            // eslint-disable-next-line no-param-reassign
            crumb.link = crumb.link.endsWith("/") ? crumb.link.replace(/.$/, "") : crumb.link;
            if (crumb.label === "")
              return (
                <MUILink
                  key={crumb.label}
                  underline="hover"
                  color="inherit"
                  href="/dash"
                  className="text-base-content/40 hover:text-base-content text-lg capitalize"
                >
                  <HomeIcon className="h-5 w-5" />
                </MUILink>
              );
            return (
              <MUILink
                key={crumb.label}
                underline="hover"
                color="inherit"
                href={crumb.link}
                className="text-base-content/40 hover:text-base-content text-lg capitalize"
              >
                {crumb.label}
              </MUILink>
            );
          })}

          <MUILink
            underline="hover"
            color="inherit"
            // href={`/dash${breadcrumbs[breadcrumbs.length - 1]?.label.toLowerCase() === "dashboard" ? "" : `/${breadcrumbs[breadcrumbs.length - 1]?.label.toLowerCase()}`}`}
            href={breadcrumbs[breadcrumbs.length - 1]?.link.replace(/.$/, "")}
            className="text-base-content text-sm capitalize "
          >
            {breadcrumbs[breadcrumbs.length - 1]?.label}
          </MUILink>
        </MUIBreadcrumbs>
      </div>
    </div>
  );
}
export default Breadcrumbs;

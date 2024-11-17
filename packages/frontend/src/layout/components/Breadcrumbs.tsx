import HomeIcon from "@mui/icons-material/Home";
import { Breadcrumbs as MUIBreadcrumbs, Link as MUILink } from "@mui/material";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import useRole from "../../features/users/hooks/useRole";

const MANAGEMENT_PAGES = ["users", "teams", "tasks"] as const;
const BASE_CLASSES = "text-base-content/40 hover:text-base-content text-lg capitalize";

function Breadcrumbs() {
  const location = useLocation();
  const role = useRole();

  const breadcrumbs = useMemo(() => {
    const pathname = location.pathname.replace(/\/$/, "");
    const pathSegments = pathname.split("/").slice(2, 4);

    return [
      { link: "/", label: "" },
      ...pathSegments.map((path, index) => ({
        link: `../../${role as string}/${pathSegments.slice(0, index + 1).join("/")}`,
        label: path === "dash" ? "dashboard" : path.replace(/-/g, " "),
      })),
    ];
  }, [location.pathname, role]);

  const mainPage = useMemo(() => {
    const page = breadcrumbs[breadcrumbs.length - 1]?.label ?? "";
    return page === "adduser" ? "add new user" : page;
  }, [breadcrumbs]);

  const renderBreadcrumbLink = (crumb: { label: string; link: string }) => {
    if (crumb.label === "") {
      return (
        <MUILink key="home" underline="hover" color="inherit" href="../dash" className={BASE_CLASSES}>
          <HomeIcon className="h-5 w-5" />
        </MUILink>
      );
    }

    return (
      <MUILink
        key={crumb.label}
        underline="hover"
        color="inherit"
        href={crumb.link}
        className={crumb.label === mainPage ? "text-base-content text-sm capitalize" : BASE_CLASSES}
      >
        {crumb.label}
      </MUILink>
    );
  };

  return (
    <div className="h-[5rem] flex items-center justify-center justify-self-start">
      <div className="flex flex-col">
        <h5 className="h5 font-bold capitalize">
          {mainPage} {MANAGEMENT_PAGES.includes(mainPage as "users" | "teams" | "tasks") ? "Management" : ""}
        </h5>
        <MUIBreadcrumbs separator="/" aria-label="breadcrumb" className="text-base-content">
          {breadcrumbs.map(renderBreadcrumbLink)}
        </MUIBreadcrumbs>
      </div>
    </div>
  );
}
export default Breadcrumbs;

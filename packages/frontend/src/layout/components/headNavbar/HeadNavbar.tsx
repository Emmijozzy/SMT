/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { INotification } from "../../../features/notification/notificationInterface";
import Breadcrumbs from "../Breadcrumbs";
import { Logo } from "./components/Logo";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { NavDropdown } from "./components/NavDropdown";
import { NotificationBadge } from "./components/NotificationBadge";
import { SearchBar } from "./components/SearchBar";
import { UserProfile } from "./components/UserProfile";
import { useHeadNavbar } from "./hooks/useHeadNavbar";

type Props = {
  notifications: INotification[];
};

function HeadNavbar({ notifications }: Props) {
  const { showAddNav, userProfile, ref, handleSidebar, handleSettingBar, handleAddNav } = useHeadNavbar();

  return (
    <div className="w-full h-[80px] ml:px-4 flex items-center  bg-base-200  rounded-lg z-[99999] p-4">
      <MobileMenuButton onSidebarToggle={handleSidebar} />
      <Logo />
      <div className="hidden md:flex">
        <Breadcrumbs />
      </div>

      <div className="relative h-full flex items-center justify-between ml-auto ">
        <SearchBar />

        <NotificationBadge count={notifications.filter((n) => !n.isRead).length} />

        <UserProfile user={userProfile} />

        <NavDropdown
          ref={ref}
          show={showAddNav}
          onToggle={handleAddNav}
          onSettingClick={handleSettingBar}
          user={userProfile}
        />
      </div>
    </div>
  );
}
export default HeadNavbar;

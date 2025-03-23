import MenuIcon from "@mui/icons-material/Menu";

interface MobileMenuButtonProps {
  onSidebarToggle: () => void;
}

export function MobileMenuButton({ onSidebarToggle }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label="Open Sidebar"
      onClick={onSidebarToggle}
      className="h-full flex items-center mr-3 xl:hidden"
    >
      <MenuIcon className="h-14 w-14" />
    </button>
  );
}

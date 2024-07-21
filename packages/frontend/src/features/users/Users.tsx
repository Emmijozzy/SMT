import { Outlet } from "react-router-dom";
import Section from "../../shared/components/Section";

// type Props = {};
function Users() {
  return (
    <Section>
      <Outlet />
    </Section>
  );
}
export default Users;

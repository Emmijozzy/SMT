import { Outlet } from "react-router-dom";
import Section from "../../shared/components/Section";

// type Props = {};
function Teams() {
  return (
    <Section>
      <Outlet />
    </Section>
  );
}
export default Teams;

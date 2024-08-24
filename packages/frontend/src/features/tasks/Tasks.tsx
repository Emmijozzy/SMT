import { Outlet } from "react-router-dom";
import Section from "../../shared/components/Section";

// type Props = {};
function Tasks() {
  return (
    <Section>
      <Outlet />
    </Section>
  );
}
export default Tasks;

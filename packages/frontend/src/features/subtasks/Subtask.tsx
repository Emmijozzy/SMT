import { Outlet } from "react-router-dom";
import Section from "../../shared/components/Section";

function Subtask() {
  return (
    <Section>
      <Outlet />
    </Section>
  );
}

export default Subtask;

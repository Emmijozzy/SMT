import { Outlet } from "react-router-dom";
import Section from "../../../shared/components/Section";

function Subtasks() {
  return (
    <Section>
      <Outlet />
    </Section>
  );
}

export default Subtasks;

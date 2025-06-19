import { ReactNode } from "react";
import { ProjectData } from "../../interfaces/DashboardInterfaces";
import { TabContentProps } from "../../types/TabTypes";
import { ProjectCard } from "../ProjectCard";
import { BaseTab } from "./BaseTab";

export class ProjectsTab extends BaseTab {
  render({ isActive, data }: TabContentProps): ReactNode {
    if (!isActive) return null;

    const { projects } = (data as { projects: ProjectData[] }) || {};

    if (!projects || projects.length === 0) {
      return this.renderEmptyState("No projects available");
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project: ProjectData) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  }
}

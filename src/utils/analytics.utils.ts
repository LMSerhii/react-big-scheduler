import { Project, Resource, SchedulerEvent } from "../types";

export const calculateResourceUtilization = (
  resource: Resource,
  events: SchedulerEvent[]
): number => {
  const resourceEvents = events.filter((e) => e.resourceId === resource.id);
  const totalAllocatedHours = resourceEvents.reduce((sum, event) => {
    const days = Math.ceil(
      (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return sum + days * event.hoursPerDay;
  }, 0);

  return (totalAllocatedHours / resource.availableHours) * 100;
};

export const calculateProjectProgress = (
  project: Project,
  events: SchedulerEvent[]
): number => {
  const projectEvents = events.filter((e) => e.projectId === project.id);
  const completedHours = projectEvents.reduce((sum, event) => {
    const days = Math.ceil(
      (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return sum + days * event.hoursPerDay;
  }, 0);

  return (completedHours / project.totalHours) * 100;
};

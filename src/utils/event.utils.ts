import {
  EventPosition,
  FilterOptions,
  Project,
  Resource,
  SchedulerEvent,
  TimeCalculation
} from "../types";

export const getEventPosition = (
  event: SchedulerEvent,
  startDate: Date,
  cellWidth: number
): EventPosition => {
  const eventStart = event.start.getTime();
  const timelineStart = startDate.getTime();
  const daysDiff = Math.floor(
    (eventStart - timelineStart) / (1000 * 60 * 60 * 24)
  );
  const durationDays = Math.ceil(
    (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    left: daysDiff * cellWidth,
    width: durationDays * cellWidth
  };
};

export const isEventInRange = (
  event: SchedulerEvent,
  startDate: Date,
  endDate: Date
): boolean => {
  return event.start >= startDate && event.end <= endDate;
};

export const calculateEventTime = (
  left: number,
  startDate: Date,
  cellWidth: number
): TimeCalculation => {
  const daysDiff = Math.floor(left / cellWidth);
  const start = new Date(startDate);
  start.setDate(start.getDate() + daysDiff);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
};

export const filterEvents = (
  events: SchedulerEvent[],
  filters: FilterOptions
): SchedulerEvent[] => {
  return events.filter((event) => {
    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      if (event.start < start || event.end > end) return false;
    }

    if (filters.projectId && event.projectId !== filters.projectId)
      return false;
    if (filters.resourceId && event.resourceId !== filters.resourceId)
      return false;

    return true;
  });
};

export const calculateResourceAvailability = (
  resource: Resource,
  events: SchedulerEvent[],
  startDate: Date,
  endDate: Date
): number => {
  const resourceEvents = events.filter(
    (event) =>
      event.resourceId === resource.id &&
      isEventInRange(event, startDate, endDate)
  );

  const totalAllocatedHours = resourceEvents.reduce(
    (sum, event) =>
      sum + event.hoursPerDay * getDaysCount(event.start, event.end),
    0
  );

  const totalAvailableHours =
    resource.availableHours * getDaysCount(startDate, endDate);

  return totalAvailableHours - totalAllocatedHours;
};

export const findResourceGaps = (
  resource: Resource,
  events: SchedulerEvent[],
  startDate: Date,
  endDate: Date
): { start: Date; end: Date; hours: number }[] => {
  const resourceEvents = events
    .filter((event) => event.resourceId === resource.id)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const gaps = [];
  let currentDate = new Date(startDate);

  resourceEvents.forEach((event) => {
    if (currentDate < event.start) {
      gaps.push({
        start: currentDate,
        end: event.start,
        hours: resource.availableHours * getDaysCount(currentDate, event.start)
      });
    }
    currentDate = event.end;
  });

  if (currentDate < endDate) {
    gaps.push({
      start: currentDate,
      end: endDate,
      hours: resource.availableHours * getDaysCount(currentDate, endDate)
    });
  }

  return gaps;
};

export const findProjectStaffingNeeds = (
  project: Project,
  resources: Resource[],
  events: SchedulerEvent[]
): { role: string; count: number; hours: number }[] => {
  const projectEvents = events.filter(
    (event) => event.projectId === project.id
  );
  const staffingNeeds =
    project.requiredRoles?.map((required) => {
      const allocatedResources = resources.filter(
        (resource) =>
          resource.role === required.role &&
          projectEvents.some((event) => event.resourceId === resource.id)
      );

      return {
        role: required.role,
        count: required.count - allocatedResources.length,
        hours:
          required.hours -
          projectEvents
            .filter((event) =>
              allocatedResources.some((r) => r.id === event.resourceId)
            )
            .reduce((sum, event) => sum + event.totalHours, 0)
      };
    }) || [];

  return staffingNeeds.filter((need) => need.count > 0 || need.hours > 0);
};

const getDaysCount = (start: Date, end: Date): number => {
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

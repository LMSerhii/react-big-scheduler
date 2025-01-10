import moment from "moment";
import { SchedulerEvent, ViewType } from "../types";

export const getEventPosition = (
  event: SchedulerEvent,
  startDate: Date,
  cellWidth: number,
  viewType: ViewType
) => {
  const start = moment(event.start);
  const end = moment(event.end);
  const viewStart = moment(startDate);

  const diffStart = start.diff(
    viewStart,
    viewType === "day" ? "hours" : "days"
  );
  const duration = end.diff(start, viewType === "day" ? "hours" : "days");

  return {
    left: diffStart * cellWidth,
    width: duration * cellWidth
  };
};

export const isEventInRange = (
  event: SchedulerEvent,
  startDate: Date,
  endDate: Date
): boolean => {
  const eventStart = moment(event.start);
  const eventEnd = moment(event.end);
  const rangeStart = moment(startDate);
  const rangeEnd = moment(endDate);

  return (
    eventStart.isBetween(rangeStart, rangeEnd, "day", "[]") ||
    eventEnd.isBetween(rangeStart, rangeEnd, "day", "[]")
  );
};

export const calculateEventTime = (
  position: number,
  startDate: Date,
  cellWidth: number,
  viewType: ViewType
) => {
  const cells = Math.round(position / cellWidth);
  const start = moment(startDate).add(
    cells,
    viewType === "day" ? "hours" : "days"
  );
  const end = moment(start).add(1, viewType === "day" ? "hours" : "days");

  return {
    start: start.toDate(),
    end: end.toDate()
  };
};

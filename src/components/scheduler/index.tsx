import { DndContext, DragEndEvent } from "@dnd-kit/core";
import React, { useCallback, useState } from "react";
import {
  DEFAULT_CONFIG,
  DEFAULT_END_DATE,
  DEFAULT_START_DATE,
  DEFAULT_VIEW_TYPE
} from "../../constants";
import { Resource, SchedulerEvent, SchedulerProps } from "../../types";
import {
  calculateEventTime,
  getEventPosition,
  isEventInRange
} from "../../utils/event.utils";
import EventItem from "../event-item";
import ResourceView from "../resource-view";
import TimelineView from "../timeline-view";
import { styles } from "./styles";

const Scheduler: React.FC<SchedulerProps> = ({
  resources,
  events,
  startDate = DEFAULT_START_DATE,
  endDate = DEFAULT_END_DATE,
  viewType = DEFAULT_VIEW_TYPE,
  onEventClick,
  onEventChange,
  onEventResize
}) => {
  const [config] = useState(DEFAULT_CONFIG);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const draggedEvent = events.find((e) => e.id.toString() === active.id);

    if (draggedEvent && onEventChange) {
      const newLeft = (active.data.current?.left || 0) + delta.x;
      const newTime = calculateEventTime(
        newLeft,
        startDate,
        config.cellWidth,
        viewType
      );

      onEventChange({
        ...draggedEvent,
        start: newTime.start,
        end: newTime.end
      });
    }
  };

  const handleEventResize = useCallback(
    (event: SchedulerEvent, width: number) => {
      if (onEventResize) {
        const newTime = calculateEventTime(
          width,
          event.start,
          config.cellWidth,
          viewType
        );
        onEventResize({
          ...event,
          end: newTime.end
        });
      }
    },
    [onEventResize, config.cellWidth, viewType]
  );

  const renderEvents = useCallback(
    (resource: Resource) => {
      return events
        .filter((event) => event.resourceId === resource.id)
        .filter((event) => isEventInRange(event, startDate, endDate))
        .map((event) => {
          const { left, width } = getEventPosition(
            event,
            startDate,
            config.cellWidth,
            viewType
          );

          return (
            <EventItem
              key={event.id}
              event={event}
              width={width}
              left={left}
              onClick={() => onEventClick?.(event)}
              onResize={(newWidth) => handleEventResize(event, newWidth)}
            />
          );
        });
    },
    [
      events,
      startDate,
      endDate,
      config.cellWidth,
      viewType,
      onEventClick,
      handleEventResize
    ]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={styles.container}>
        <TimelineView
          viewType={viewType}
          startDate={startDate}
          endDate={endDate}
          cellWidth={config.cellWidth}
        />
        <div style={styles.content}>
          {resources.map((resource) => (
            <div key={resource.id} style={styles.resourceRow}>
              <ResourceView
                resource={resource}
                height={config.timeLineHeight}
              />
              <div style={styles.eventsContainer}>{renderEvents(resource)}</div>
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default Scheduler;

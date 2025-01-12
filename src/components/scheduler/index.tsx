import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Box, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import { DragItem, FilterOptions, SchedulerProps, ViewType } from "../../types";
import { calculateEventTime, filterEvents } from "../../utils/event.utils";
import Analytics from "../analytics";
import FilterPanel from "../filter-panel";
import ResourceView from "../resource-view";
import TimelineView from "../timeline-view";
import ViewSelector from "../view-selector";
import { useStyles } from "./styles";

export const Scheduler: React.FC<SchedulerProps> = ({
  resources,
  projects,
  events,
  startDate,
  endDate,
  onEventChange,
  onEventCreate,
  onEventDelete
}) => {
  const classes = useStyles();
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [viewType, setViewType] = useState<ViewType>("resource");

  const filteredEvents = filterEvents(events, filters);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, delta } = event;
      const draggedEvent = events.find((e) => e.id.toString() === active.id);

      const dragData = active.data.current as DragItem | undefined;

      if (draggedEvent && onEventChange && dragData) {
        // Переконуємося, що left є числом
        const currentLeft =
          typeof dragData.left === "number"
            ? dragData.left
            : parseInt(dragData.left as string, 10);
        const newLeft = currentLeft + delta.x;

        const newTime = calculateEventTime(
          newLeft,
          startDate || new Date(),
          60
        );

        onEventChange({
          ...draggedEvent,
          start: newTime.start,
          end: newTime.end
        });
      }
    },
    [events, startDate, viewType, onEventChange]
  );
  const handleViewChange = (newViewType: "resource" | "project") => {
    setViewType(newViewType);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Paper className={classes.root}>
        <Box className={classes.header}>
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            resources={resources}
            projects={projects}
          />
          <ViewSelector viewType={viewType} onViewChange={handleViewChange} />
        </Box>

        <Box className={classes.content}>
          <TimelineView
            startDate={startDate || new Date()}
            endDate={endDate || new Date()}
            viewType={viewType}
          />

          <Box className={classes.schedulerBody}>
            {viewType === "resource"
              ? resources.map((resource) => (
                  <ResourceView
                    key={resource.id}
                    resource={resource}
                    events={filteredEvents.filter(
                      (e) => e.resourceId === resource.id
                    )}
                    onEventChange={onEventChange}
                    onEventDelete={onEventDelete}
                  />
                ))
              : projects.map((project) => (
                  <Box key={project.id} className={classes.projectRow}>
                    {/* Project view implementation */}
                  </Box>
                ))}
          </Box>
        </Box>

        <Box className={classes.analytics}>
          <Analytics
            resources={resources}
            projects={projects}
            events={filteredEvents}
            selectedProject={selectedProject}
            onProjectSelect={setSelectedProject}
          />
        </Box>
      </Paper>
    </DndContext>
  );
};

export default Scheduler;

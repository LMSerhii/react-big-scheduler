import Box from "@mui/material/Box";
import * as React from "react";
import Scheduler from "../components/scheduler";
import { SchedulerEvent } from "../types";
import { mockEvents, mockProjects, mockResources } from "./test-data";

const TestPage: React.FC = () => {
  const handleEventChange = (event: SchedulerEvent) => {
    console.log("Event changed:", event);
  };

  const handleEventCreate = (event: SchedulerEvent) => {
    console.log("Event created:", event);
  };

  const handleEventDelete = (eventId: string) => {
    console.log("Event deleted:", eventId);
  };

  return (
    <Box sx={{ height: "100vh", padding: 2, bgcolor: "background.default" }}>
      <Scheduler
        resources={mockResources}
        projects={mockProjects}
        events={mockEvents}
        viewType="resource"
        startDate={new Date()}
        endDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
        onEventChange={handleEventChange}
        onEventCreate={handleEventCreate}
        onEventDelete={handleEventDelete}
      />
    </Box>
  );
};

export default TestPage;

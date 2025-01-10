import React, { useState } from "react";
import Scheduler from "../components/scheduler";
import { SchedulerEvent } from "../types";
import { testEvents, testResources } from "./test-data";

const TestPage: React.FC = () => {
  const [events, setEvents] = useState(testEvents);

  const handleEventChange = (updatedEvent: SchedulerEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventClick = (event: SchedulerEvent) => {
    console.log("Clicked event:", event);
  };

  return (
    <div style={{ height: "600px", padding: "20px" }}>
      <h1>Scheduler Test</h1>
      <div style={{ height: "calc(100% - 60px)" }}>
        <Scheduler
          resources={testResources}
          events={events}
          startDate={new Date(2024, 0, 15)} // 15 січня 2024
          endDate={new Date(2024, 1, 16)} // 16 січня 2024
          viewType="month"
          onEventClick={handleEventClick}
          onEventChange={handleEventChange}
          onEventResize={handleEventChange}
        />
      </div>
    </div>
  );
};

export default TestPage;

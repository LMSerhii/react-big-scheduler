import { Resource, SchedulerEvent } from "../types";

export const testResources: Resource[] = [
  { id: 1, name: "Кімната 1" },
  { id: 2, name: "Кімната 2" },
  { id: 3, name: "Кімната 3" }
];

export const testEvents: SchedulerEvent[] = [
  {
    id: 1,
    title: "Зустріч 1",
    start: new Date(2024, 0, 15, 10, 0), // 15 січня 2024, 10:00
    end: new Date(2024, 3, 15, 12, 0), // 15 січня 2024, 12:00
    resourceId: 1
  },
  {
    id: 2,
    title: "Зустріч 2",
    start: new Date(2024, 0, 15, 14, 0), // 15 січня 2024, 14:00
    end: new Date(2024, 0, 29, 16, 0), // 15 січня 2024, 16:00
    resourceId: 2
  },
  {
    id: 3,
    title: "Зустріч 3",
    start: new Date(2024, 0, 15, 9, 0), // 15 січня 2024, 9:00
    end: new Date(2024, 7, 15, 11, 0), // 15 січня 2024, 11:00
    resourceId: 3
  }
];

export interface Resource {
  id: string | number;
  name: string;
  role?: string;
  skills?: string[];
  availableHours?: number;
  allocatedHours?: number;
}

export interface SchedulerEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  resourceId: string | number;
}

export interface SchedulerProps {
  resources: Resource[];
  events: SchedulerEvent[];
  startDate?: Date;
  endDate?: Date;
  viewType?: ViewType;
  onEventClick?: (event: SchedulerEvent) => void;
  onEventChange?: (event: SchedulerEvent) => void;
  onEventResize?: (event: SchedulerEvent) => void;
}

export type ViewType = "day" | "week" | "month";

export interface SchedulerConfig {
  headerHeight?: number;
  cellWidth?: number;
  timeLineHeight?: number;
}

export interface SchedulerViewProps {
  viewType: ViewType;
  resources: Resource[];
  events: Event[];
  config: SchedulerConfig;
  onEventClick?: (event: Event) => void;
  onEventChange?: (event: Event) => void;
  onEventResize?: (event: Event) => void;
}

export interface TimelineViewProps {
  viewType: ViewType;
  startDate: Date;
  endDate: Date;
  cellWidth: number;
}

export interface DragItem {
  id: string | number;
  left: number;
  type: string;
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  availableHours: number;
  allocatedHours: number;
  skills?: string[];
}

export interface Project {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  deadline: Date;
  totalHours: number;
  allocatedHours: number;
  team: Resource[];
  bgColor?: string;
  requiredRoles?: {
    role: string;
    count: number;
    hours: number;
  }[];
}

export interface SchedulerEvent {
  id: string;
  resourceId: string;
  projectId: string;
  start: Date;
  end: Date;
  hoursPerDay: number;
  totalHours: number;
  title?: string;
  bgColor?: string;
}

export interface EventItemProps {
  event: SchedulerEvent;
  project?: Project;
  resource?: Resource;
  width: number;
  left: number;
  onResize?: (width: number) => void;
  onDelete?: () => void;
}

export interface SchedulerProps {
  resources: Resource[];
  projects: Project[];
  events: SchedulerEvent[];
  viewType?: ViewType;
  startDate?: Date;
  endDate?: Date;
  onEventChange?: (event: SchedulerEvent) => void;
  onEventCreate?: (event: SchedulerEvent) => void;
  onEventDelete?: (eventId: string) => void;
}

export interface FilterOptions {
  dateRange?: [Date, Date];
  roles?: string[];
  skills?: string[];
  availabilityMin?: number;
  projectId?: string;
  resourceId?: string;
}

export type ViewType = "resource" | "project";

export interface SchedulerConfig {
  headerHeight?: number;
  cellWidth?: number;
  timeLineHeight?: number;
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

export interface ViewSelectorProps {
  viewType: ViewType;
  onViewChange: (newViewType: ViewType) => void;
}

export interface EventPosition {
  left: number;
  width: number;
}

export interface TimeCalculation {
  start: Date;
  end: Date;
}

export const VIEW_TYPES = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month"
} as const;

export const DEFAULT_START_DATE = new Date();
export const DEFAULT_END_DATE = new Date(
  new Date().setDate(new Date().getDate() + 14)
);
export const DEFAULT_VIEW_TYPE = "resource" as const;

export const DEFAULT_CONFIG = {
  headerHeight: 50,
  cellWidth: 150,
  timeLineHeight: 30
};

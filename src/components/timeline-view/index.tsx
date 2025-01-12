import { Box, Typography } from "@mui/material";
import { addDays, format, isSameMonth, isWeekend } from "date-fns";
import React, { useMemo } from "react";
import { useStyles } from "./styles";

interface TimelineViewProps {
  startDate: Date;
  endDate: Date;
  viewType: "resource" | "project";
  cellWidth?: number;
}

const TimelineView: React.FC<TimelineViewProps> = ({
  startDate,
  endDate,
  viewType,
  cellWidth = 50
}) => {
  const classes = useStyles();

  const dates = useMemo(() => {
    const dates: Date[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  }, [startDate, endDate]);

  const months = useMemo(() => {
    const months: { date: Date; span: number }[] = [];
    let currentMonth: Date | null = null;
    let currentSpan = 0;

    dates.forEach((date) => {
      if (!currentMonth || !isSameMonth(currentMonth, date)) {
        if (currentMonth) {
          months.push({ date: currentMonth, span: currentSpan });
        }
        currentMonth = date;
        currentSpan = 1;
      } else {
        currentSpan++;
      }
    });

    if (currentMonth) {
      months.push({ date: currentMonth, span: currentSpan });
    }

    return months;
  }, [dates]);

  return (
    <Box className={classes.root}>
      <Box className={classes.monthsRow}>
        {months.map(({ date, span }) => (
          <Box
            key={date.toISOString()}
            className={classes.monthCell}
            style={{ width: cellWidth * span }}
          >
            <Typography variant="subtitle2">
              {format(date, "MMMM yyyy")}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box className={classes.daysRow}>
        {dates.map((date) => (
          <Box
            key={date.toISOString()}
            className={`${classes.dayCell} ${
              isWeekend(date) ? classes.weekend : ""
            }`}
            style={{ width: cellWidth }}
          >
            <Typography variant="caption" className={classes.dayNumber}>
              {format(date, "d")}
            </Typography>
            <Typography variant="caption" className={classes.dayName}>
              {format(date, "EEE")}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box className={classes.gridLines}>
        {dates.map((date) => (
          <Box
            key={date.toISOString()}
            className={`${classes.gridLine} ${
              isWeekend(date) ? classes.weekendGrid : ""
            }`}
            style={{ width: cellWidth }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TimelineView;

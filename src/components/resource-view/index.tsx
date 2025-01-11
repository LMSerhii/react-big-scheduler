import { Box, Chip, LinearProgress, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Resource, SchedulerEvent } from "../../types";
import EventItem from "../event-item";
import { useStyles } from "./styles";

interface ResourceViewProps {
  resource: Resource;
  events: SchedulerEvent[];
  onEventChange?: (event: SchedulerEvent) => void;
  onEventDelete?: (eventId: string) => void;
}

const ResourceView: React.FC<ResourceViewProps> = ({
  resource,
  events,
  onEventChange,
  onEventDelete
}) => {
  const classes = useStyles();

  const utilizationPercentage = Math.min(
    100,
    (resource.allocatedHours / resource.availableHours) * 100
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.resourceInfo}>
        <Box className={classes.header}>
          <Typography variant="subtitle1" className={classes.name}>
            {resource.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {resource.role}
          </Typography>
        </Box>

        <Box className={classes.metrics}>
          <Box className={classes.metricItem}>
            <Typography variant="caption" color="textSecondary">
              Available
            </Typography>
            <Typography variant="body2">{resource.availableHours}h</Typography>
          </Box>
          <Box className={classes.metricItem}>
            <Typography variant="caption" color="textSecondary">
              Allocated
            </Typography>
            <Typography variant="body2">{resource.allocatedHours}h</Typography>
          </Box>
        </Box>

        <Box className={classes.utilization}>
          <Box className={classes.utilizationHeader}>
            <Typography variant="caption" color="textSecondary">
              Utilization
            </Typography>
            <Typography
              variant="caption"
              color={utilizationPercentage > 100 ? "error" : "textSecondary"}
            >
              {utilizationPercentage.toFixed(1)}%
            </Typography>
          </Box>
          <Tooltip title={`${utilizationPercentage.toFixed(1)}% utilized`}>
            <LinearProgress
              variant="determinate"
              value={utilizationPercentage}
              className={classes.utilizationBar}
              color={utilizationPercentage > 100 ? "error" : "primary"}
            />
          </Tooltip>
        </Box>

        {resource.skills && resource.skills.length > 0 && (
          <Box className={classes.skills}>
            {resource.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                className={classes.skillChip}
              />
            ))}
          </Box>
        )}
      </Box>

      <Box className={classes.eventsContainer}>
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            resource={resource}
            width={100} // This should be calculated based on duration
            left={0} // This should be calculated based on start date
            onDelete={() => onEventDelete?.(event.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ResourceView;

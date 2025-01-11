import { useDraggable } from "@dnd-kit/core";
import DeleteIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { EventItemProps } from "types";
import { useStyles } from "./styles";

const EventItem: React.FC<EventItemProps> = ({
  event,
  project,
  resource,
  width,
  left,
  onResize,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform: dndTransform
  } = useDraggable({
    id: event.id.toString(),
    data: { left }
  });

  const styleTransform = dndTransform
    ? {
        x: dndTransform.x,
        y: dndTransform.y
      }
    : undefined;

  const { classes } = useStyles({
    width,
    left,
    transform: styleTransform,
    bgColor: project?.bgColor || event.bgColor
  });

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = width;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(startWidth + deltaX, 30);
        onResize?.(newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [width, onResize]
  );

  return (
    <Box ref={setNodeRef} className={classes.root} {...attributes}>
      <Box className={classes.dragHandle} {...listeners}>
        <DragIndicatorIcon fontSize="small" />
      </Box>

      <Box className={classes.content}>
        <Box className={classes.header}>
          <Tooltip title={project?.name || event.title || ""}>
            <Typography variant="subtitle2" className={classes.title}>
              {project?.name || event.title}
            </Typography>
          </Tooltip>
          <IconButton
            size="small"
            onClick={onDelete}
            className={classes.deleteButton}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className={classes.details}>
          <Typography variant="caption" className={classes.detailText}>
            {resource?.name}
          </Typography>
          <Typography variant="caption" className={classes.detailText}>
            {`${event.hoursPerDay}h/day`}
          </Typography>
          <Typography variant="caption" className={classes.detailText}>
            {`${event.start.toLocaleDateString()} - ${event.end.toLocaleDateString()}`}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.resizeHandle} onMouseDown={handleResizeStart} />
    </Box>
  );
};

export default EventItem;

import { useDraggable } from "@dnd-kit/core";
import DeleteIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Tooltip } from "@mui/material";
import React, { useCallback } from "react";
import { EventItemProps } from "types";
import {
  Content,
  DeleteButton,
  Details,
  DetailText,
  DragHandle,
  Header,
  ResizeHandle,
  StyledEventBox,
  Title
} from "./styles";

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
    <StyledEventBox
      ref={setNodeRef}
      width={width}
      left={left}
      transform={styleTransform}
      bgColor={project?.bgColor || event.bgColor}
      {...attributes}
    >
      <DragHandle {...listeners}>
        <DragIndicatorIcon fontSize="small" />
      </DragHandle>

      <Content>
        <Header>
          <Tooltip title={project?.name || event.title || ""}>
            <Title variant="subtitle2">{project?.name || event.title}</Title>
          </Tooltip>
          <DeleteButton size="small" onClick={onDelete}>
            <DeleteIcon fontSize="small" />
          </DeleteButton>
        </Header>

        <Details>
          <DetailText variant="caption">{resource?.name}</DetailText>
          <DetailText variant="caption">
            {`${event.hoursPerDay}h/day`}
          </DetailText>
          <DetailText variant="caption">
            {`${event.start.toLocaleDateString()} - ${event.end.toLocaleDateString()}`}
          </DetailText>
        </Details>
      </Content>

      <ResizeHandle onMouseDown={handleResizeStart} />
    </StyledEventBox>
  );
};

export default EventItem;

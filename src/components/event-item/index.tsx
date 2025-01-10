import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Resizable } from "react-resizable";
import { SchedulerEvent } from "../../types";
import { styles } from "./styles";

interface EventItemProps {
  event: SchedulerEvent;
  width: number;
  left: number;
  onClick?: () => void;
  onResize?: (width: number) => void;
  onDragEnd?: (left: number) => void;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  width,
  left,
  onClick,
  onResize,
  onDragEnd
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: event.id.toString(),
      data: { type: "event", left }
    });

  const handleResize = (
    e: React.SyntheticEvent,
    { size }: { size: { width: number } }
  ) => {
    onResize?.(size.width);
  };

  const style = transform
    ? {
        ...styles.container,
        width: `${width}px`,
        left: `${left}px`,
        opacity: isDragging ? 0.5 : 1,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : {
        ...styles.container,
        width: `${width}px`,
        left: `${left}px`,
        opacity: isDragging ? 0.5 : 1
      };

  return (
    <Resizable
      width={width}
      height={30}
      onResize={handleResize}
      draggableOpts={{ grid: [10, 10] }}
    >
      <div
        ref={setNodeRef}
        style={style}
        onClick={onClick}
        {...attributes}
        {...listeners}
      >
        <div style={styles.title}>{event.title}</div>
        <div style={styles.resizeHandle} className="react-resizable-handle" />
      </div>
    </Resizable>
  );
};

export default EventItem;

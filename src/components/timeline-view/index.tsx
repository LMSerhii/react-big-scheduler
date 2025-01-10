import moment from "moment";
import React from "react";
import { TimelineViewProps } from "../../types";
import { styles } from "./styles";

const TimelineView: React.FC<TimelineViewProps> = ({
  viewType,
  startDate,
  endDate,
  cellWidth
}) => {
  const generateTimeSlots = () => {
    const slots = [];
    const current = moment(startDate);
    const end = moment(endDate);

    while (current.isSameOrBefore(end)) {
      slots.push({
        time: current.toDate(),
        label: current.format(viewType === "day" ? "HH:mm" : "DD/MM")
      });

      current.add(1, viewType === "day" ? "hour" : "day");
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div style={styles.container}>
      {timeSlots.map((slot, index) => (
        <div key={index} style={{ ...styles.cell, width: cellWidth }}>
          {slot.label}
        </div>
      ))}
    </div>
  );
};

export default TimelineView;

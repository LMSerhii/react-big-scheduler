import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";

interface ViewSelectorProps {
  viewType: "resource" | "project";
  onViewChange: (view: "resource" | "project") => void;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({
  viewType,
  onViewChange
}) => {
  const classes = useStyles();

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: "resource" | "project" | null
  ) => {
    if (newView !== null) {
      onViewChange(newView);
    }
  };

  return (
    <ToggleButtonGroup
      value={viewType}
      exclusive
      onChange={handleChange}
      size="small"
      className={classes.root}
    >
      <ToggleButton value="resource" className={classes.button}>
        <Tooltip title="Resource View">
          <ViewListIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="project" className={classes.button}>
        <Tooltip title="Project View">
          <ViewModuleIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewSelector;

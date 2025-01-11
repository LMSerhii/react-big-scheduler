import ClearIcon from "@mui/icons-material/Clear";
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip
} from "@mui/material";
import React from "react";
import { FilterOptions, Project, Resource } from "../../types";
import { useStyles } from "./styles";

interface FilterPanelProps {
  filters: FilterOptions;
  resources: Resource[];
  projects: Project[];
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  resources,
  projects,
  onFilterChange
}) => {
  const classes = useStyles();

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value ? new Date(event.target.value) : null;
    if (date) {
      onFilterChange({
        ...filters,
        dateRange: [date, filters.dateRange?.[1] || new Date()]
      });
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value ? new Date(event.target.value) : null;
    if (date) {
      onFilterChange({
        ...filters,
        dateRange: [filters.dateRange?.[0] || new Date(), date]
      });
    }
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.filterRow}>
        <Box className={classes.dateRange}>
          <TextField
            type="date"
            label="Start Date"
            value={formatDateForInput(filters.dateRange?.[0] || null)}
            onChange={handleStartDateChange}
            size="small"
            className={classes.dateInput}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ mx: 1 }}>-</Box>
          <TextField
            type="date"
            label="End Date"
            value={formatDateForInput(filters.dateRange?.[1] || null)}
            onChange={handleEndDateChange}
            size="small"
            className={classes.dateInput}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <FormControl className={classes.select} size="small">
          <InputLabel>Project</InputLabel>
          <Select
            value={filters.projectId || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                projectId: e.target.value || undefined
              })
            }
            label="Project"
          >
            <MenuItem value="">All Projects</MenuItem>
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.select} size="small">
          <InputLabel>Resource</InputLabel>
          <Select
            value={filters.resourceId || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                resourceId: e.target.value || undefined
              })
            }
            label="Resource"
          >
            <MenuItem value="">All Resources</MenuItem>
            {resources.map((resource) => (
              <MenuItem key={resource.id} value={resource.id}>
                {resource.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          multiple
          size="small"
          options={Array.from(new Set(resources.map((r) => r.role)))}
          value={filters.roles || []}
          onChange={(_, newValue) =>
            onFilterChange({
              ...filters,
              roles: newValue.length > 0 ? newValue : undefined
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Roles"
              className={classes.autoComplete}
            />
          )}
        />

        <Autocomplete
          multiple
          size="small"
          options={Array.from(
            new Set(resources.flatMap((r) => r.skills || []))
          )}
          value={filters.skills || []}
          onChange={(_, newValue) =>
            onFilterChange({
              ...filters,
              skills: newValue.length > 0 ? newValue : undefined
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skills"
              className={classes.autoComplete}
            />
          )}
        />

        <Tooltip title="Clear Filters">
          <IconButton
            size="small"
            onClick={clearFilters}
            className={classes.clearButton}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default FilterPanel;

import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from "@mui/material";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { theme } from "../../theme";
import { Project, Resource, SchedulerEvent } from "../../types";
import {
  calculateProjectProgress,
  calculateResourceUtilization
} from "../../utils/analytics.utils";
import ProjectDetails from "../project-details";
import { useStyles } from "./styles";

interface AnalyticsProps {
  resources: Resource[];
  projects: Project[];
  events: SchedulerEvent[];
  selectedProject: string | null;
  onProjectSelect: (projectId: string | null) => void;
}

const Analytics: React.FC<AnalyticsProps> = ({
  resources,
  projects,
  events,
  selectedProject,
  onProjectSelect
}) => {
  const classes = useStyles();

  const resourceUtilization = useMemo(
    () =>
      resources.map((resource) => ({
        name: resource.name,
        utilization: calculateResourceUtilization(resource, events)
      })),
    [resources, events]
  );

  const projectProgress = useMemo(
    () =>
      projects.map((project) => ({
        name: project.name,
        progress: calculateProjectProgress(project, events)
      })),
    [projects, events]
  );

  const selectedProjectData = useMemo(() => {
    if (!selectedProject) return null;
    const project = projects.find((p) => p.id === selectedProject);
    if (!project) return null;

    return {
      project,
      progress: calculateProjectProgress(project, events),
      teamMembers: resources.filter((r) =>
        events.some((e) => e.projectId === project.id && e.resourceId === r.id)
      )
    };
  }, [selectedProject, projects, resources, events]);

  return (
    <Box className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Resource Utilization
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={resourceUtilization}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <Bar
                    dataKey="utilization"
                    fill={theme.palette.primary.main}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Project Progress
              </Typography>
              {projectProgress.map(({ name, progress }) => (
                <Box key={name} className={classes.progressItem}>
                  <Box className={classes.progressHeader}>
                    <Typography variant="body2">{name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {progress.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    className={classes.progress}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {selectedProjectData && (
          <ProjectDetails
            project={selectedProjectData.project}
            teamMembers={selectedProjectData.teamMembers}
          />
        )}
      </Grid>
    </Box>
  );
};

export default Analytics;

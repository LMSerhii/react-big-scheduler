import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Project, Resource } from "../../types";
import { useStyles } from "./styles";

interface ProjectDetailsProps {
  project: Project;
  teamMembers: Resource[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  teamMembers
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            {project.name} - Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="textSecondary">
                Total Hours: {project.totalHours}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Allocated Hours: {project.allocatedHours}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Deadline: {project.deadline.toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>
                Team Members:
              </Typography>
              {teamMembers.map((member) => (
                <Typography
                  key={member.id}
                  variant="body2"
                  className={classes.teamMember}
                >
                  {member.name} - {member.role}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectDetails;

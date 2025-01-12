import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default
  },
  header: {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden"
  },
  schedulerBody: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "auto"
  },
  projectRow: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: 80
  },
  analytics: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper
  }
}));

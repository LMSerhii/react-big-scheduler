import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  monthsRow: {
    display: "flex",
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: 36
  },
  monthCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0.5)
  },
  daysRow: {
    display: "flex",
    height: 48
  },
  dayCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0.5)
  },
  weekend: {
    backgroundColor: theme.palette.action.hover
  },
  dayNumber: {
    fontWeight: 500
  },
  dayName: {
    color: theme.palette.text.secondary
  },
  gridLines: {
    display: "flex",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none"
  },
  gridLine: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: "100%"
  },
  weekendGrid: {
    backgroundColor: theme.palette.action.hover
  }
}));

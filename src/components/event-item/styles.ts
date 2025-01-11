import { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  width: number;
  left: number;
  transform?: { x: number; y: number };
  bgColor?: string;
}

export const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    position: "absolute",
    height: "80%",
    top: "10%",
    display: "flex",
    width: ({ width }) => `${width}px`,
    left: ({ left }) => `${left}px`,
    transform: ({ transform }) =>
      transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: ({ bgColor }) => bgColor || theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: "move",
    userSelect: "none",
    overflow: "hidden",
    boxShadow: theme.shadows[2],
    transition: theme.transitions.create(["box-shadow"]),
    "&:hover": {
      boxShadow: theme.shadows[4]
    }
  },
  dragHandle: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0.5),
    cursor: "grab",
    "&:active": {
      cursor: "grabbing"
    }
  },
  content: {
    flex: 1,
    padding: theme.spacing(0.5, 1),
    display: "flex",
    flexDirection: "column",
    minWidth: 0 // Для роботи text-overflow
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(0.5)
  },
  title: {
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  deleteButton: {
    padding: 2,
    marginLeft: theme.spacing(0.5),
    color: "inherit",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)"
    }
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.25)
  },
  detailText: {
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  resizeHandle: {
    width: 4,
    cursor: "col-resize",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    "&:active": {
      backgroundColor: "rgba(255, 255, 255, 0.3)"
    }
  }
}));

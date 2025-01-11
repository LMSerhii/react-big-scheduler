import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledEventBoxProps {
  width: number;
  left: number;
  transform?: { x: number; y: number };
  bgColor?: string;
}

export const StyledEventBox = styled(Box, {
  shouldForwardProp: (prop) =>
    !["width", "left", "transform", "bgColor"].includes(prop as string)
})<StyledEventBoxProps>(({ theme, width, left, transform, bgColor }) => ({
  position: "absolute",
  height: "80%",
  top: "10%",
  display: "flex",
  width: `${width}px`,
  left: `${left}px`,
  transform: transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: bgColor || theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  cursor: "move",
  userSelect: "none",
  overflow: "hidden",
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(["box-shadow"]),
  "&:hover": {
    boxShadow: theme.shadows[4]
  }
}));

export const DragHandle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 0.5),
  cursor: "grab",
  "&:active": {
    cursor: "grabbing"
  }
}));

export const Content = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(0.5, 1),
  display: "flex",
  flexDirection: "column",
  minWidth: 0
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(0.5)
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  padding: 2,
  marginLeft: theme.spacing(0.5),
  color: "inherit",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
}));

export const Details = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.25)
}));

export const DetailText = styled(Typography)(({ theme }) => ({
  display: "block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));

export const ResizeHandle = styled(Box)(({ theme }) => ({
  width: 4,
  cursor: "col-resize",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  "&:active": {
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  }
}));

export const styles = {
  container: {
    position: "absolute" as const,
    height: "30px",
    backgroundColor: "#1890ff",
    borderRadius: "3px",
    color: "white",
    padding: "2px 4px",
    fontSize: "12px",
    cursor: "move",
    userSelect: "none" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    flex: 1
  },
  resizeHandle: {
    position: "absolute" as const,
    right: 0,
    bottom: 0,
    width: "10px",
    height: "100%",
    cursor: "e-resize"
  }
};

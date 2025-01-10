export const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const
  },
  header: {
    height: 50,
    borderBottom: "1px solid #e0e0e0"
  },
  content: {
    flex: 1,
    overflow: "auto"
  },
  resourceRow: {
    display: "flex",
    borderBottom: "1px solid #e0e0e0"
  },
  eventsContainer: {
    position: "relative" as const,
    flex: 1
  }
};

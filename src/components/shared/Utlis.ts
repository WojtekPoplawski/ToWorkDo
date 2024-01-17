export const getNextAssigned = (
  assigned: "none" | "todo" | "working" | "verification" | "done",
): "none" | "todo" | "working" | "verification" | "done" => {
  const nextAssigned = new Map<
    "none" | "todo" | "working" | "verification" | "done",
    "none" | "todo" | "working" | "verification" | "done"
  >([
    ["none", "todo"],
    ["todo", "working"],
    ["working", "verification"],
    ["verification", "done"],
    ["done", "none"],
  ]);
  return nextAssigned.get(assigned) || "none";
};
export const getPreviousAssigned = (
  assigned: "none" | "todo" | "working" | "verification" | "done",
): "none" | "todo" | "working" | "verification" | "done" => {
  const beforeAssigned = new Map<
    "none" | "todo" | "working" | "verification" | "done",
    "none" | "todo" | "working" | "verification" | "done"
  >([
    ["none", "done"],
    ["todo", "none"],
    ["working", "todo"],
    ["verification", "working"],
    ["done", "verification"],
  ]);
  return beforeAssigned.get(assigned) || "none";
};

import { TFunction } from "i18next";

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

export const secondsToSpend = (
  seconds: number,
  t: TFunction<"translation", undefined>,
) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return hours === 0
    ? `${minutes % 60} ${t("minutes")}`
    : `${hours} ${t("hours")} ${t("and")} ${minutes % 60} ${t("minutes")}`;
};

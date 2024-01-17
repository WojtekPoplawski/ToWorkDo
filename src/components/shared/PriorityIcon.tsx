import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  Remove,
} from "@mui/icons-material";

type PriorityIconType = {
  priority: -2 | -1 | 0 | 1 | 2;
  fontSize?: "small" | "inherit" | "medium" | "large";
};

const PriorityIcon = ({ priority, fontSize = "medium" }: PriorityIconType) => {
  const priorityMap = new Map<string, JSX.Element>([
    ["2", <KeyboardDoubleArrowUp fontSize={fontSize} />],
    ["1", <KeyboardArrowUp fontSize={fontSize} />],
    ["0", <Remove fontSize={fontSize} />],
    ["-1", <KeyboardArrowDown fontSize={fontSize} />],
    ["-2", <KeyboardDoubleArrowDown fontSize={fontSize} />],
  ]);
  return <>{priorityMap.get(priority.toString())}</>;
};
export default PriorityIcon;

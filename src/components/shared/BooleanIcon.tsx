import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

type BooleanIconType = {
  value: boolean | 0 | 1 | 2 | 3 | 4;
};

const BooleanIcon = ({ value }: BooleanIconType) => {
  const handleBoolean = () => {
    switch (value) {
      case 0:
        return false;
      case 1:
        return true;
      case true:
        return true;
      case false:
        return false;
    }
  };
  return handleBoolean() ? <CheckIcon /> : <ClearIcon />;
};
export default BooleanIcon;

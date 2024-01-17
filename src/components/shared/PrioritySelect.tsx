import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

type PrioritySelectType = {
  value: -2 | -1 | 0 | 1 | 2 | undefined | null;
  handleValueChange: (value: -2 | -1 | 0 | 1 | 2 | null) => void;
};

const PrioritySelect = ({ value, handleValueChange }: PrioritySelectType) => {
  const { t } = useTranslation();

  const getPriorityLabel = (priority: number | null) => {
    switch (priority) {
      case 2:
        return t("highest_priority");
      case 1:
        return t("high_priority");
      case 0:
        return t("neutral_priority");
      case -1:
        return t("low_priority");
      case -2:
        return t("lowest_priority");
      default:
        return t("neutral_priority");
    }
  };

  const options = [2, 1, 0, -1, -2];
  const mapOption = (option: number | null) => {
    switch (option) {
      case 2:
        return 2;
      case 1:
        return 1;
      case 0:
        return 0;
      case -1:
        return -1;
      case -2:
        return -2;
      default:
        return 0;
    }
  };

  return (
    <Autocomplete
      options={[2, 1, 0, -1, -2]}
      getOptionLabel={(option) => getPriorityLabel(option)}
      renderInput={(params) => <TextField {...params} />}
      value={value}
      onChange={(event, value) => handleValueChange(mapOption(value))}
    />
  );
};

export default PrioritySelect;

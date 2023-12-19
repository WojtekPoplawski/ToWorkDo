import { Autocomplete, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

type PrioritySelectType = {
  value: number | undefined | null;
  handleValueChange: (value: number | null) => void;
};

const PrioritySelect = ({ value, handleValueChange }: PrioritySelectType) => {
  console.log(value);
  const { t } = useTranslation();

  const getPrioirtyLabel = (priority: number | null) => {
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

  return (
    <Autocomplete
      options={[2, 1, 0, -1, -2]}
      getOptionLabel={(option) => getPrioirtyLabel(option)}
      renderInput={(params) => <TextField {...params} />}
      value={value}
      onChange={(event, value) => handleValueChange(value)}
    />
  );
};

export default PrioritySelect;

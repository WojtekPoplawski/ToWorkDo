import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  Remove,
} from "@mui/icons-material";
import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

type PrioritySelectType = {
  value: number | undefined | null;
  handleValueChange: (value: number | null) => void;
};

const PrioritySelect = ({ value, handleValueChange }: PrioritySelectType) => {
  const [priority, setPriority] = useState<number | undefined | null>(
    value || null
  );
  useEffect(() => {
    priority && handleValueChange(priority);
  }, [priority]);

  const getPiorityIcon = (priority: number | undefined | null) => {
    switch (priority) {
      case -2:
        return <KeyboardDoubleArrowDown color="error" />;
      case -1:
        return <KeyboardArrowDown color="warning" />;
      case 0:
        return <Remove color="primary" />;
      case 1:
        return <KeyboardArrowUp color="info" />;
      case 2:
        return <KeyboardDoubleArrowUp color="success" />;
      default:
        return <Remove color="primary" />;
    }
  };
  const handlePiorityChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setPriority(value);
  };

  return (
    <Autocomplete
      options={[-2, -1, 0, 1, 2]}
      getOptionLabel={(option) => option.toString()}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {getPiorityIcon(option)}
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {getPiorityIcon(Number(params.inputProps.value))}
              </InputAdornment>
            ),
          }}
        />
      )}
      value={priority || 0}
      onChange={handlePiorityChange}
    />
  );
};

export default PrioritySelect;

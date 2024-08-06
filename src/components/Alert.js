import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["Option 1", "Option 2"];

export default function Alert() {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
    </div>
  );
}

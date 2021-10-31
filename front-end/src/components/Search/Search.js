import React, { useState, useEffect } from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Search = ({ setFlights, originalFlights }) => {
  const [searchParam, setSearchParam] = useState("flightNumber");
  const [searchValue, setSearchValue] = useState("");

  const changeSearchParam = (e) => {
    setSearchParam(e.target.value);
    setSearchValue("");
  };

  const searchFunc = (e) => {
    const filteredFlights = originalFlights.filter((flight) =>
      JSON.stringify(flight[searchParam])
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFlights(filteredFlights);
    setSearchValue(e.target.value);
  };

  return (
    <div className="searchBar">
      <Box sx={{ display: "inline" }}>
        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel id="demo-simple-select-label">Search Param</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Search Param"
            onChange={changeSearchParam}
          >
            <MenuItem value="flightNumber">Flight Number</MenuItem>
            <MenuItem value="airport">Airport</MenuItem>
            <MenuItem value="economySeats">Economoy Seats</MenuItem>
            <MenuItem value="businessSeats">Business Seats</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "inline" }}>
        <TextField
          id="outlined-basic"
          label="Search Term"
          variant="outlined"
          value={searchValue}
          onChange={searchFunc}
        />
      </Box>
    </div>
  );
};

export default Search;

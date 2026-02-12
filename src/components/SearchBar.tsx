import { useState, useRef } from "react";
import { Box, Input, Button } from "@mui/material";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setValue("");
    inputRef.current?.blur();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Input
        inputRef={inputRef}
        id="searchBar"
        type="search"
        autoComplete="off"
        fullWidth
        disableUnderline
        placeholder={value ? "" : "Find a TV show you may like"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{
          style: {
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
            color: "white",
          },
        }}
        sx={{
          maxWidth: "500px",
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
          color: "white",
          padding: 2,
          "& input:focus::placeholder": {
            opacity: 0,
          },
        }}
      />
    </Box>
  );
};

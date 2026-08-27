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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Input
        id="tv-show-search"
        name="tv-show-search"
        inputRef={inputRef}
        type="search"
        autoComplete="off"
        fullWidth
        disableUnderline
        placeholder="Find a TV show you may like"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{
          enterKeyHint: "search",
          "aria-label": "Search TV shows",
        }}
        sx={{
          maxWidth: "500px",
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
          color: "white",
          padding: 2,
          "& input": {
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
          },
          "& input:focus::placeholder": {
            opacity: 0,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!value.trim()}
        sx={{
          height: 56,
          px: 3,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 700,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

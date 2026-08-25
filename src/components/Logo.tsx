import { Box, Typography } from "@mui/material";

interface LogoProps {
  image: string;
  title: string;
}

export const Logo = ({ image, title }: LogoProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        component="img"
        src={image}
        alt={`${title} logo`}
        sx={{ width: 50, height: 50 }}
      />
      <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </Box>
  );
};

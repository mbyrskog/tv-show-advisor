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
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

import { Box, Typography, Stack } from "@mui/material";
import { FiveStarRating } from "./FiveStarRating";
import { TVShow } from "../types/tvShow";

interface TVShowDetailProps {
  tvShow: TVShow;
}

export const TVShowDetail = ({ tvShow }: TVShowDetailProps) => {
  const hasRating = tvShow.vote_average > 0;
  const rating = tvShow.vote_average / 2;

  return (
    <Box sx={{ mx: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
        {tvShow.name}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {hasRating ? (
          <>
            <FiveStarRating rating={rating} />
            <Typography variant="body1" color="text.secondary">
              {rating.toFixed(1)}/5
            </Typography>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No rating yet
          </Typography>
        )}
      </Stack>
      <Typography variant="body1" color="text.secondary">
        {tvShow.overview || "No overview available."}
      </Typography>
    </Box>
  );
};

import { Rating } from "@mui/material";

interface FiveStarRatingProps {
  rating: number;
}

export const FiveStarRating = ({ rating }: FiveStarRatingProps) => {
  return <Rating value={rating} precision={0.5} readOnly />;
};

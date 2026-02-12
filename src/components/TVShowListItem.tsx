import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { VITE_SMALL_IMG_COVER_BASE_URL } from "../config/config";
import { TVShow } from "../types/tvShow";

interface TVShowListItemProps {
  tvShow: TVShow;
  onClick: (tvShow: TVShow) => void;
}

export const TVShowListItem = ({ tvShow, onClick }: TVShowListItemProps) => {
  const imageUrl = tvShow.backdrop_path
    ? VITE_SMALL_IMG_COVER_BASE_URL + tvShow.backdrop_path
    : undefined;
  return (
    <Card sx={{ width: 250, borderRadius: 2, boxShadow: 3 }}>
      <CardActionArea onClick={() => onClick(tvShow)}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={tvShow.name}
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap>
            {tvShow.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { VITE_SMALL_IMG_COVER_BASE_URL } from "../config/config";
import { TVShow } from "../types/tvShow";

const MAX_TITLE_CHAR = 20;

interface TVShowListItemProps {
  tvShow: TVShow;
  onClick: (tvShow: TVShow) => void;
}

export const TVShowListItem = ({ tvShow, onClick }: TVShowListItemProps) => {
  return (
    <Card sx={{ width: 250, borderRadius: 2, boxShadow: 3 }}>
      <CardActionArea onClick={() => onClick(tvShow)}>
        {/* TV Show Image */}
        <CardMedia
          component="img"
          height="140"
          image={VITE_SMALL_IMG_COVER_BASE_URL + tvShow.backdrop_path}
          alt={tvShow.name}
        />

        {/* TV Show Title */}
        <CardContent>
          <Typography variant="subtitle1" noWrap>
            {tvShow.name.length > MAX_TITLE_CHAR
              ? tvShow.name.slice(0, MAX_TITLE_CHAR) + "..."
              : tvShow.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

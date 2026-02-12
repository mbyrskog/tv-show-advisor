import { TVShow } from "../types/tvShow";
import { TVShowListItem } from "./TVShowListItem";
import { Box, Typography } from "@mui/material";

interface TVShowListProps {
  tvShowList: TVShow[];
  onClickItem: (tvShow: TVShow) => void;
}

export const TVShowList = ({ tvShowList, onClickItem }: TVShowListProps) => {
  if (tvShowList.length === 0) {
    return null;
  }
  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Recommendations:
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Box sx={{ display: "inline-flex", gap: 2, mb: 2 }}>
          {tvShowList.map((tvShow) => (
            <TVShowListItem
              key={tvShow.id}
              onClick={onClickItem}
              tvShow={tvShow}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

import { useEffect, useState } from "react";
import { TVShowService } from "./services/tvShowService";
import { VITE_BACKDROP_BASE_URL } from "./config/config";
import { Box, Container, Grid } from "@mui/material";
import { Logo } from "./components/Logo";
import { SearchBar } from "./components/SearchBar";
import { TVShowDetail } from "./components/TVShowDetail";
import { TVShowList } from "./components/TVShowList";
import logoImg from "./assets/logo.png";
import { TVShow } from "./types/tvShow";

export const App = () => {
  const [currentTVShow, setCurrentTVShow] = useState<TVShow | null>(null);
  const [recommendationList, setRecommendationList] = useState<TVShow[]>([]);

  const fetchPopular = async (): Promise<void> => {
    try {
      const popularTVShowList = await TVShowService.fetchPopular();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong when fetching the popular TV shows");
    }
  };

  const fetchRecommendations = async (tvShowId: number): Promise<void> => {
    try {
      const recommendationListResp =
        await TVShowService.fetchRecommendations(tvShowId);
      if (recommendationListResp.length > 0) {
        setRecommendationList(recommendationListResp.slice(0, 10));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong fetching the recommendations");
    }
  };

  const updateCurrentTVShow = (tvShow: TVShow): void => {
    setCurrentTVShow(tvShow);
  };

  const fetchByTitle = async (title: string): Promise<void> => {
    try {
      const searchResponse = await TVShowService.fetchByTitle(title);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong searching for a TV show");
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${VITE_BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
        color: "white",
        p: 2,
      }}
    >
      {/* Header */}
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 3 }}>
            <Logo
              title="What to watch"
              subtitle="Find a show you may like"
              image={logoImg}
            />
          </Grid>

          {/* Search bar */}
          <Grid size={{ xs: 12, sm: 8 }} sx={{ display: "flex", flexGrow: 1 }}>
            <SearchBar onSubmit={fetchByTitle} />
          </Grid>
        </Grid>
      </Container>

      {/* TV Show Details */}
      <Container sx={{ flexGrow: 1 }}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </Container>

      {/* Recommended Shows */}
      <Container>
        {currentTVShow && (
          <TVShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </Container>
    </Box>
  );
};

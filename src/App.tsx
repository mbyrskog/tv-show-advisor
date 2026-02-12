import { useEffect, useState } from "react";
import { TVShowService } from "./services/tvShowService";
import { VITE_BACKDROP_BASE_URL } from "./config/config";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { Logo } from "./components/Logo";
import { SearchBar } from "./components/SearchBar";
import { TVShowDetail } from "./components/TVShowDetail";
import { TVShowList } from "./components/TVShowList";
import logoImg from "./assets/logo.png";
import { TVShow } from "./types/tvShow";

export const App = () => {
  const [currentTVShow, setCurrentTVShow] = useState<TVShow | null>(null);
  const [tvShowList, setTvShowList] = useState<TVShow[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const backgroundStyle = currentTVShow
    ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${VITE_BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
    : "black";

  const fetchPopular = async (): Promise<void> => {
    try {
      const popularTVShowList = await TVShowService.fetchPopular();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong when fetching the popular TV shows");
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchRecommendations = async (tvShowId: number): Promise<void> => {
    try {
      const recommendationListResp =
        await TVShowService.fetchRecommendations(tvShowId);
      setTvShowList(recommendationListResp.slice(0, 10));
    } catch (error) {
      console.error(error);
      setTvShowList([]);
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
    if (!initialLoading && currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow, initialLoading]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: backgroundStyle,
        color: "white",
        p: 2,
      }}
    >
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 3 }}>
            <Logo
              title="What to watch"
              subtitle="Find a show you may like"
              image={logoImg}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }} sx={{ display: "flex", flexGrow: 1 }}>
            <SearchBar onSubmit={fetchByTitle} />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ flexGrow: 1 }}>
        {initialLoading ? (
          <Box sx={{ display: "grid", placeItems: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          currentTVShow && <TVShowDetail tvShow={currentTVShow} />
        )}
      </Container>
      <Container>
        {currentTVShow && (
          <TVShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={tvShowList}
          />
        )}
      </Container>
    </Box>
  );
};

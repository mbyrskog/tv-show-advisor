import { VITE_BACKDROP_BASE_URL } from "./config/config";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Logo } from "./components/Logo";
import { SearchBar } from "./components/SearchBar";
import { TVShowDetail } from "./components/TVShowDetail";
import { TVShowList } from "./components/TVShowList";
import logoImg from "./assets/logo.png";
import { ToastContainer } from "react-toastify";
import { useTVShows } from "./hooks/useTVShows";

export const App = () => {
  const {
    currentTVShow,
    selectTVShow,
    recommendations,
    initialLoading,
    loadError,
    loadPopular,
    searchByTitle,
  } = useTVShows();

  const backgroundStyle = currentTVShow?.backdrop_path
    ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("${VITE_BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
    : "black";

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
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Logo title="What to watch" image={logoImg} />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }} sx={{ display: "flex", flexGrow: 1 }}>
            <SearchBar onSubmit={searchByTitle} />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ flexGrow: 1 }}>
        {initialLoading ? (
          <Box sx={{ display: "grid", placeItems: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : loadError && !currentTVShow ? (
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Typography variant="h6" gutterBottom>
              Could not load TV shows.
            </Typography>
            <Button variant="contained" onClick={loadPopular}>
              Retry
            </Button>
          </Box>
        ) : (
          currentTVShow && <TVShowDetail tvShow={currentTVShow} />
        )}
      </Container>
      <Container>
        {currentTVShow && (
          <TVShowList onClickItem={selectTVShow} tvShowList={recommendations} />
        )}
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        closeOnClick
      />
    </Box>
  );
};

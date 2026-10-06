import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as tvShowService from "../services/tvShowService";
import { TVShow } from "../types/tvShow";

export const useTVShows = () => {
  const [currentTVShow, setCurrentTVShow] = useState<TVShow | null>(null);
  const [recommendations, setRecommendations] = useState<TVShow[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const latestSearchId = useRef(0);

  const loadPopular = async (): Promise<void> => {
    setInitialLoading(true);
    setLoadError(false);
    try {
      const popularTVShowList = await tvShowService.fetchPopular();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      } else {
        setLoadError(true);
      }
    } catch (error) {
      console.error(error);
      setLoadError(true);
      toast.error("Something went wrong when fetching the popular TV shows");
    } finally {
      setInitialLoading(false);
    }
  };

  const searchByTitle = async (title: string): Promise<void> => {
    const searchId = ++latestSearchId.current;
    try {
      const searchResponse = await tvShowService.fetchByTitle(title);
      if (searchId !== latestSearchId.current) return;
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      } else {
        toast.warn(`No TV show found for "${title}"`);
      }
    } catch (error) {
      if (searchId !== latestSearchId.current) return;
      console.error(error);
      toast.error("Something went wrong searching for a TV show");
    }
  };

  useEffect(() => {
    loadPopular();
  }, []);

  useEffect(() => {
    if (initialLoading || !currentTVShow) return;

    let ignore = false;
    tvShowService
      .fetchRecommendations(currentTVShow.id)
      .then((list) => {
        if (!ignore) setRecommendations(list.slice(0, 10));
      })
      .catch((error) => {
        if (ignore) return;
        console.error(error);
        setRecommendations([]);
        toast.error("Something went wrong fetching the recommendations");
      });

    return () => {
      ignore = true;
    };
  }, [currentTVShow, initialLoading]);

  return {
    currentTVShow,
    selectTVShow: setCurrentTVShow,
    recommendations,
    initialLoading,
    loadError,
    loadPopular,
    searchByTitle,
  };
};

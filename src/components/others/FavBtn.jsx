import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FavoriteButton = ({ movieId }) => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const isLiked = favorites.includes(movieId);

  const toggleFavorite = () => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId) 
        : [...prevFavorites, movieId];

      localStorage.setItem("favorites", JSON.stringify(newFavorites)); 

      
      window.dispatchEvent(new Event("favoritesUpdated"));

      return newFavorites;
    });
  };

  return (
    <div className="absolute top-0 right-0 w-9 h-9 bg-white z-10 bg-opacity-80 rounded-bl-md">
      <FontAwesomeIcon
        className="absolute top-2 right-2 text-pink-600 text-xl drop-shadow-lg cursor-pointer"
        icon={isLiked ? faHeart : regularHeart}
        onClick={toggleFavorite} 
        size="lg"
        title={isLiked ? "Remove from favorites" : "Add to favorites"}
      />
    </div>
  );
};

export default FavoriteButton;

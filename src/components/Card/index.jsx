import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { PiStarFourFill, PiLinkedinLogo, PiHeart, PiHeartFill } from "react-icons/pi";
import { Tag } from "../../components/Tag";
import { useNavigate } from "react-router-dom";

export function Card({ data, onClick }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(data.favorited);

  const handleProfileClick = () => {
    onClick(data.id);
  };

  const toggleFavoriteProfile = async (e) => {
    e.stopPropagation(); // Evita a propagação do evento de clique para o card quando clicar no botão de favorito
    
    try {
      const token = localStorage.getItem("user_token");
      const favoriteEndpoint = `https://api.plataformadodale.site/api/recruiters/add-remove-favorite-student?student=${data.id}`;
      
      const response = await fetch(favoriteEndpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsFavorite(!isFavorite); // Alterna o estado de favorito com base na resposta da requisição
      } else {
        console.error("Failed to toggle favorite:", response.statusText);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <Container onClick={handleProfileClick}>
      <button className="fav-btn" onClick={toggleFavoriteProfile}>
        {isFavorite ? (
          <PiHeartFill size={20} color="red" />
        ) : (
          <PiHeart size={20} color="red" />
        )}
      </button>

      <img src={data.profilePicture} alt="" />
      <div className="name-age">
        <h1 id="name">{data.name}</h1>
        <p id="age">, {data.age}</p>
      </div>
      <p id="city">{data.city}</p>
      <div className="education">
        <p id="gc-trail">{data.gcTrail}</p>
        <p id="education-level">{data.educationLevel}</p>
        <p id="course">{data.courseInstitution}</p>
        <p id="course-completion">{data.yearOfCourseCompletion}</p>
      </div>
      <div className="links">
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
          <PiLinkedinLogo />
        </a>
      </div>
    </Container>
  );
}

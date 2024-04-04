import React, { useState } from "react";
import { Container } from "./styles";
import {
  PiStarFourFill,
  PiLinkedinLogo,
  PiHeart,
  PiHeartFill,
} from "react-icons/pi";
import { Tag } from "../../components/Tag";
import { useNavigate } from "react-router-dom";

export function Card({ data, onClick }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const handleProfileClick = () => {
    onClick(data.id);
  };

  const handleFavoriteProfile = (e) => {
    e.stopPropagation(); // Evita a propagação do evento de clique para o card quando clicar no botão de favorito
    setIsFavorite(!isFavorite);
  };

  return (
    <Container onClick={handleProfileClick}>
      <button className="fav-btn" onClick={handleFavoriteProfile}>
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

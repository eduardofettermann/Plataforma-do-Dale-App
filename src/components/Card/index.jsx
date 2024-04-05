// Card.js

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

  // Separar o nome completo em partes
  const fullNameParts = data.name.split(" ");
  // Pegar apenas os três primeiros nomes
  let firstName = fullNameParts[0];
  let secondName = fullNameParts[1];
  let thirdName = fullNameParts[2];
  let fourthName = '';
  // Verificar se o terceiro nome tem três letras ou menos
  if (thirdName && thirdName.length <= 3) {
    // Se tiver, adicionar o quarto nome
    fourthName = fullNameParts[3] ? fullNameParts[3] : '';
  }

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
        {/* Mostrar até quatro nomes, mas apenas se o terceiro tiver três letras ou menos */}
        <h1 id="name">{firstName} {secondName} {thirdName} {fourthName}</h1>
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






import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, Content } from "./style";
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate

export function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Obtenha a função de navegação

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleStudentsClick = () => {
    navigate('/students');
  };

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        showSearchInput={false}
        searchValue=""
        handleSearchChange={() => {}}
        handleEnterPress={() => {}}
        showRightMenu={false}
        toggleFilter={() => {}}
        handleHomeClick={handleHomeClick}
        handleStudentsClick={handleStudentsClick}
      />
      <Container>
        <Content>
          <div>
            <h1>Encontre os melhores talentos com os nossos filtros!</h1>
            <button onClick={handleStudentsClick}>Buscar Talentos</button> {/* Adicione um evento onClick para chamar a função handleButtonClick */}
          </div>
        </Content>
      </Container>
    </>
  );
}


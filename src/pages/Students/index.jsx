// index.jsx da página Home

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, ContainerCard } from "./styles";
import { Card } from "../../components/Card";
import { MultiSelect } from "../../components/MultiSelect";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Students() {
  const [searchValue, setSearchValue] = useState("");
  const [gcTrailFilter, setGcTrailFilter] = useState("");
  const [educationLevelFilter, setEducationLevelFilter] = useState("");
  const [hardSkillsFilter, setHardSkillsFilter] = useState("");
  const [softSkillsFilter, setSoftSkillsFilter] = useState("");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarFilterOpen, setIsSidebarFilterOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      filterCards();
    }
  };

  const filterCards = () => {
    const filtered = cards.filter(
      (card) =>
        card.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        card.gcTrail.toLowerCase().includes(gcTrailFilter.toLowerCase()) &&
        card.educationLevel
          .toLowerCase()
          .includes(educationLevelFilter.toLowerCase()) &&
        card.hardSkills.some((skill) =>
          skill.description
            .toLowerCase()
            .includes(hardSkillsFilter.toLowerCase())
        ) &&
        card.softSkills.some((skill) =>
          skill.description
            .toLowerCase()
            .includes(softSkillsFilter.toLowerCase())
        )
    );
    setFilteredCards(filtered);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("user_token"); // Obtém o token do localStorage
        const response = await api.get("recruiters/students", {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho de autorização
          },
        });
  
        // Ordena os alunos com base na propriedade 'favorited'
        const sortedStudentsByFavorited = response.data.sort((a, b) => {
          // Alunos com 'favorited' true devem vir primeiro
          return b.favorited - a.favorited;
        });
  
        setCards(sortedStudentsByFavorited);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    if (
      searchValue.trim() === "" &&
      gcTrailFilter.trim() === "" &&
      educationLevelFilter.trim() === "" &&
      hardSkillsFilter.trim() === "" &&
      softSkillsFilter.trim() === ""
    ) {
      setFilteredCards([]);
    } else {
      filterCards();
    }
  }, [
    searchValue,
    gcTrailFilter,
    educationLevelFilter,
    hardSkillsFilter,
    softSkillsFilter,
  ]);

  const handleProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleStudentsClick = () => {
    navigate("/students");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleFilter = () => {
    setIsSidebarFilterOpen(!isSidebarFilterOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const closeFilter = () => {
    setIsSidebarFilterOpen(false);
  };

  const handleGcTrailFilterChange = (gcTrailFilter) => {
    setGcTrailFilter(gcTrailFilter);
  };

  const handleEducationLevelFilterChange = (educationLevelFilter) => {
    setEducationLevelFilter(educationLevelFilter);
  };

  const handleHardSkillsFilterChange = (hardSkillsFilter) => {
    setHardSkillsFilter(hardSkillsFilter);
  };

  const handleSoftSkillsFilterChange = (softSkillsFilter) => {
    setSoftSkillsFilter(softSkillsFilter);
  };

  return (
    <Container>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        showSearchInput={true}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleEnterPress={handleEnterPress}
        showRightMenu={true}
        toggleFilter={toggleFilter}
        handleHomeClick={handleHomeClick}
        handleStudentsClick={handleStudentsClick}
      />

      {isSidebarFilterOpen && (
        <MultiSelect
          handleGcTrailFilterChange={handleGcTrailFilterChange}
          handleEducationLevelFilterChange={handleEducationLevelFilterChange}
          handleHardSkillsFilterChange={handleHardSkillsFilterChange}
          handleSoftSkillsFilterChange={handleSoftSkillsFilterChange}
        />
      )}

      <ContainerCard>
        {searchValue.trim() === "" &&
        gcTrailFilter.trim() === "" &&
        educationLevelFilter.trim() === "" &&
        hardSkillsFilter.trim() === "" &&
        softSkillsFilter.trim() === ""
          ? cards.map((card) => (
              <Card
                key={String(card.id)}
                data={card}
                hardSkills={card.hardSkills}
                softSkills={card.softSkills}
                onClick={() => handleProfile(card.id)}
              />
            ))
          : filteredCards.map((card) => (
              <Card
                key={String(card.id)}
                data={card}
                onClick={() => handleProfile(card.id)}
              />
            ))}
      </ContainerCard>
    </Container>
  );
}

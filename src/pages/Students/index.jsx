import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, ContainerCard } from "./styles";
import { Card } from "../../components/Card";
import { MultiSelect } from "../../components/MultiSelect";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Students() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    gcTrail: "",
    educationLevel: "",
    hardSkills: [],
    softSkills: [],
  });
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
    const filtered = cards.filter((card) => {
      const { gcTrail, educationLevel, hardSkills, softSkills } = filters;
      return (
        card.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (gcTrail === "" || card.gcTrail.toLowerCase() === gcTrail.toLowerCase()) &&
        (educationLevel === "" || card.educationLevel.toLowerCase() === educationLevel.toLowerCase()) &&
        (hardSkills.length === 0 || hardSkills.some((skill) => card.hardSkills.map(s => s.description.toLowerCase()).includes(skill.toLowerCase()))) &&
        (softSkills.length === 0 || softSkills.some((skill) => card.softSkills.map(s => s.description.toLowerCase()).includes(skill.toLowerCase())))
      );
    });
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
      filters.gcTrail === "" &&
      filters.educationLevel === "" &&
      filters.hardSkills.length === 0 &&
      filters.softSkills.length === 0
    ) {
      setFilteredCards([]);
    } else {
      filterCards();
    }
  }, [searchValue, filters]);

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

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
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
          handleGcTrailFilterChange={(gcTrail) => handleFilterChange({ ...filters, gcTrail })}
          handleEducationLevelFilterChange={(educationLevel) => handleFilterChange({ ...filters, educationLevel })}
          handleHardSkillsFilterChange={(hardSkills) => handleFilterChange({ ...filters, hardSkills })}
          handleSoftSkillsFilterChange={(softSkills) => handleFilterChange({ ...filters, softSkills })}
          filters={filters}
        />
      )}

      <ContainerCard>
        {searchValue.trim() === "" &&
        filters.gcTrail === "" &&
        filters.educationLevel === "" &&
        filters.hardSkills.length === 0 &&
        filters.softSkills.length === 0
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


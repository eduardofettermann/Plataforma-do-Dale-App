import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Select } from "./style";

export const MultiSelect = ({
  handleGcTrailFilterChange,
  handleEducationLevelFilterChange,
  handleHardSkillsFilterChange,
  handleSoftSkillsFilterChange,
}) => {
  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [gcTrailValue, setGcTrailValue] = useState("");
  const [educationLevelValue, setEducationLevelValue] = useState("");
  const [hardSkillsValue, setHardSkillsValue] = useState("");
  const [softSkillsValue, setSoftSkillsValue] = useState("");

  useEffect(() => {
    const fetchHardSkills = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await axios.get(
          "https://api.plataformadodale.site/api/skills/hard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedSkills = response.data.map(skill => skill.description).sort();
        setHardSkills(sortedSkills);
      } catch (error) {
        console.error("Error fetching hard skills:", error);
      }
    };

    const fetchSoftSkills = async () => {
      try {
        const token = localStorage.getItem("user_token");
        const response = await axios.get(
          "https://api.plataformadodale.site/api/skills/soft",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedSkills = response.data.map(skill => skill.description).sort();
        setSoftSkills(sortedSkills);
      } catch (error) {
        console.error("Error fetching hard skills:", error);
      }
    };
    
    fetchHardSkills();
    fetchSoftSkills();
  }, []);

  const handleGcTrailInputChange = (event) => {
    const inputValue = event.target.value;
    setGcTrailValue(inputValue);
    handleGcTrailFilterChange(inputValue.trim());
  };

  const handleEducationLevelInputChange = (event) => {
    const inputValue = event.target.value;
    setEducationLevelValue(inputValue);
    handleEducationLevelFilterChange(inputValue.trim());
  };

  const handleHardSkillsInputChange = (event) => {
    const inputValue = event.target.value;
    setHardSkillsValue(inputValue);
    handleHardSkillsFilterChange(inputValue.trim());
  };

  const handleSoftSkillsInputChange = (event) => {
    const inputValue = event.target.value;
    setSoftSkillsValue(inputValue);
    handleSoftSkillsFilterChange(inputValue.trim());
  };

  return (
    <Container>
      <Select value={gcTrailValue} onChange={handleGcTrailInputChange}>
        <option value="">Filtrar por Trilha</option>
        <option value="Programacão">Programação</option>
        <option value="Gestão e Vendas">Gestão e Vendas</option>
        <option value="UX/UI Design">UX/UI Design</option>
        <option value="Marketing Digital">Marketing Digital</option>
      </Select>

      <Select
        value={educationLevelValue}
        onChange={handleEducationLevelInputChange}
      >
        <option value="">Filtrar por Nível de Educação</option>
        <option value="Ensino Médio em andamento">
          Ensino Médio em andamento
        </option>
        <option value="Ensino Médio completo">Ensino Médio completo</option>
        <option value="Ensino Superior em andamento">
          Ensino Superior em andamento
        </option>
        <option value="Ensino Superior completo">
          Ensino Superior completo
        </option>
      </Select>

      <Select value={hardSkillsValue} onChange={handleHardSkillsInputChange}>
        <option value="">Filtrar por Hard Skills</option>
        {hardSkills.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </Select>

      <Select value={softSkillsValue} onChange={handleSoftSkillsInputChange}>
        <option value="">Filtrar por Soft Skills</option>
        {softSkills.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </Select>
    </Container>
  );
};













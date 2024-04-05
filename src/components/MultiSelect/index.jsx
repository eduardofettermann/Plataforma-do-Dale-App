import React, { useState, useEffect } from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import { Container, CustomSelect } from "./style";
import { PiNutFill } from "react-icons/pi";

const animatedComponents = makeAnimated();

export const MultiSelect = ({
  handleGcTrailFilterChange,
  handleEducationLevelFilterChange,
  handleHardSkillsFilterChange,
  handleSoftSkillsFilterChange,
}) => {
  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [selectedGcTrail, setSelectedGcTrail] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [selectedHardSkills, setSelectedHardSkills] = useState([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const hardSkillsResponse = await axios.get(
          "https://api.plataformadodale.site/api/skills/hard"
        );
        const softSkillsResponse = await axios.get(
          "https://api.plataformadodale.site/api/skills/soft"
        );

        const sortedHardSkills = hardSkillsResponse.data
          .map((skill) => skill.description)
          .sort();

        const sortedSoftSkills = softSkillsResponse.data
          .map((skill) => skill.description)
          .sort();

        setHardSkills(sortedHardSkills);
        setSoftSkills(sortedSoftSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  const handleGcTrailInputChange = (selectedOption) => {
    setSelectedGcTrail(selectedOption.value);
    handleGcTrailFilterChange(selectedOption.value);
  };

  const handleEducationLevelInputChange = (selectedOption) => {
    setSelectedEducationLevel(selectedOption.value);
    handleEducationLevelFilterChange(selectedOption.value);
  };

  return (
    <Container>
      <CustomSelect
  placeholder="Filtrar por Trilha"
  value={selectedGcTrail ? { value: selectedGcTrail, label: selectedGcTrail } : null}
  onChange={handleGcTrailInputChange}
  options={[
    { value: "", label: "Filtrar por Trilha" },
    { value: "Programacão", label: "Programação" },
    { value: "Gestão e Vendas", label: "Gestão e Vendas" },
    { value: "UX/UI Design", label: "UX/UI Design" },
    { value: "Marketing Digital", label: "Marketing Digital" }
  ]}
/>

<CustomSelect
  placeholder="Filtrar por Nível de Educação"
  value={selectedEducationLevel ? { value: selectedEducationLevel, label: selectedEducationLevel } : null}
  onChange={handleEducationLevelInputChange}
  options={[
    { value: "", label: "Filtrar por Nível de Educação" },
    { value: "Ensino Médio em andamento", label: "Ensino Médio em andamento" },
    { value: "Ensino Médio completo", label: "Ensino Médio completo" },
    { value: "Ensino Superior em andamento", label: "Ensino Superior em andamento" },
    { value: "Ensino Superior completo", label: "Ensino Superior completo" }
  ]}
/>


      <CustomSelect
        placeholder="Filtrar por Hard Skills"
        components={animatedComponents}
        isMulti
        onChange={(items) => {
          setSelectedHardSkills(items);
          handleHardSkillsFilterChange(items.map((item) => item.value));
        }}
        options={hardSkills.map((skill) => ({
          value: skill,
          label: skill,
        }))}
      />

      <CustomSelect
        placeholder="Filtrar por Soft Skills"
        components={animatedComponents}
        isMulti
        onChange={(items) => {
          setSelectedSoftSkills(items);
          handleSoftSkillsFilterChange(items.map((item) => item.value));
        }}
        options={softSkills.map((skill) => ({
          value: skill,
          label: skill,
        }))}
      />
    </Container>
  );
};




















import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 3.2rem;

  font-family: "Montserrat", sans-serif;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_200};
`;

export const ContainerCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 3.2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

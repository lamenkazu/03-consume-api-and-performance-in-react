import styled from "styled-components";

export const Container = styled.header`
  background: ${({ theme }) => theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;

  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  border-radius: 6px;
  padding: 0 1.25rem;

  background: ${({ theme }) => theme["green-500"]};
  color: ${({ theme }) => theme["white"]};
  font-weight: bold;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme["green-700"]};
    transition: background-color 2ms;
  }
`;

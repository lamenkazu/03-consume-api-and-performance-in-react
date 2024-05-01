import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    padding: 1rem;

    background-color: ${({ theme }) => theme["gray-900"]};
    color: ${({ theme }) => theme["gray-300"]};

    &::placeholder {
      color: ${({ theme }) => theme["gray-500"]};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75;

    border: 0;
    border-radius: 6px;
    padding: 1rem;

    font-weight: bold;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme["green-300"]};
    color: ${({ theme }) => theme["green-300"]};

    &:hover {
      background-color: ${({ theme }) => theme["green-500"]};
      border-color: ${({ theme }) => theme["green-500"]};
      color: ${({ theme }) => theme["white"]};

      transition: background-color 5ms, color 5ms, border-color 5ms;
    }
  }
`;

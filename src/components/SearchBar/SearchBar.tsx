import React, { useState } from "react";
import styled from "styled-components";

interface SearchBarProps {
  onSearch: (searchValue: string) => void;
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 5px;
`;

const Button = styled.input`
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    resetInputField();
  };

  return (
    <Form className="search">
      <Input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <Button onClick={callSearchFunction} type="submit" value="SEARCH" />
    </Form>
  );
};

export default SearchBar;

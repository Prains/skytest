// components/UserList.tsx
import React, { useEffect, useState } from "react";
import { GithubUser, GithubUserDetail } from "../../interfaces/types";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import styled from "styled-components";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<GithubUserDetail | null>(
    null
  );
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue) {
      getUsers(searchValue, currentPage);
    }
  }, [searchValue, currentPage]);

  const getUsers = async (searchValue: string, page: number) => {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchValue}&page=${page}&per_page=10`
    );
    setUsers(res.data.items);
    setTotalPages(Math.ceil(res.data.total_count / 10));
  };

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    setCurrentPage(1);
  };

  const handleUserClick = async (login: string) => {
    const res = await axios.get(`https://api.github.com/users/${login}`);
    setSelectedUser(res.data);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <UsersContainer>
        {users.map((user) => (
          <UserCard
            key={user.login}
            onClick={() => handleUserClick(user.login)}
          >
            <img src={user.avatar_url} alt={user.login} />
            <p>{user.login}</p>
          </UserCard>
        ))}
      </UsersContainer>
      <Pagination>
        {Array.from(Array(totalPages), (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </Pagination>
      {selectedUser && (
        <UserDetails>
          <h2>{selectedUser.login}</h2>
          <p>Followers: {selectedUser.followers}</p>
          <p>Following: {selectedUser.following}</p>
          <p>Public repos: {selectedUser.public_repos}</p>
        </UserDetails>
      )}
    </div>
  );
};

const UsersContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 200px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    background-color: #4caf50;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const UserDetails = styled.div`
  text-align: center;
  margin: 20px 0;

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;
  }
`;

export default UserList;

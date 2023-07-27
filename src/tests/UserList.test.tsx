import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import UserList from "../components/UserList/UserList";

jest.mock("axios");

const mockAxios = axios as jest.Mocked<typeof axios>;

test("calls axios and renders user list", async () => {
  mockAxios.get.mockImplementation((url) => {
    if (url.includes("search")) {
      return Promise.resolve({
        data: {
          items: [
            { login: "user1", avatar_url: "url1" },
            { login: "user2", avatar_url: "url2" },
          ],
          total_count: 2,
        },
      });
    } else {
      return Promise.resolve({
        data: { login: "user1", followers: 5, following: 3, public_repos: 2 },
      });
    }
  });

  const { findByText, getByText } = render(<UserList />);

  expect(await findByText("user1")).toBeInTheDocument();
  expect(getByText("user2")).toBeInTheDocument();
});

test("shows user details when a user card is clicked", async () => {
  mockAxios.get.mockImplementation((url) => {
    if (url.includes("search")) {
      return Promise.resolve({
        data: {
          items: [
            { login: "user1", avatar_url: "url1" },
            { login: "user2", avatar_url: "url2" },
          ],
          total_count: 2,
        },
      });
    } else {
      return Promise.resolve({
        data: { login: "user1", followers: 5, following: 3, public_repos: 2 },
      });
    }
  });

  const { findByText, getByText } = render(<UserList />);

  fireEvent.click(await findByText("user1"));

  expect(await findByText("Followers: 5")).toBeInTheDocument();
  expect(getByText("Following: 3")).toBeInTheDocument();
  expect(getByText("Public repos: 2")).toBeInTheDocument();
});

test("paginates users", async () => {
  mockAxios.get.mockImplementation((url) => {
    if (url.includes("page=2")) {
      return Promise.resolve({
        data: {
          items: [
            { login: "user3", avatar_url: "url3" },
            { login: "user4", avatar_url: "url4" },
          ],
          total_count: 4,
        },
      });
    } else {
      return Promise.resolve({
        data: {
          items: [
            { login: "user1", avatar_url: "url1" },
            { login: "user2", avatar_url: "url2" },
          ],
          total_count: 4,
        },
      });
    }
  });

  const { findByText, getByText } = render(<UserList />);

  expect(await findByText("user1")).toBeInTheDocument();
  expect(getByText("user2")).toBeInTheDocument();

  fireEvent.click(getByText("2"));

  expect(await findByText("user3")).toBeInTheDocument();
  expect(getByText("user4")).toBeInTheDocument();
});

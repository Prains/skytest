import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar/SearchBar";

test("calls onSearch with the input value on form submit", () => {
  const onSearch = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <SearchBar onSearch={onSearch} />
  );

  fireEvent.change(getByPlaceholderText("Search Github Users"), {
    target: { value: "test-user" },
  });
  fireEvent.click(getByText("Search"));

  expect(onSearch).toHaveBeenCalledWith("test-user");
});

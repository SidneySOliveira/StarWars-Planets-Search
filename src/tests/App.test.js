import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("I am your test", () => {
  render(<App />);
  const searchButton = screen.getByRole("textbox");
  expect(searchButton).toBeInTheDocument();

  const nameFilter = screen.getByTestId("name-filter");
  expect(nameFilter).toBeInTheDocument();
  userEvent.type(nameFilter, "tatone");
  expect(nameFilter.value).toBe("tatone");

  const columnFilter = screen.getByTestId("column-filter");
  expect(columnFilter).toBeInTheDocument();

  const comparisonFilter = screen.getByTestId("comparison-filter");
  expect(columnFilter).toBeInTheDocument();

  const valueFilter = screen.getByTestId("value-filter");
  expect(columnFilter).toBeInTheDocument();
  userEvent.type(valueFilter, "numerico");
  expect(valueFilter.value).toBe("");
  const valueNumeric = 214;
  userEvent.type(valueFilter, valueNumeric);
  expect(valueFilter.value).toBe(valueNumeric);

  const filterNumericButton = screen.getByRole("button", { name: /filtrar/i });
  expect(filterNumericButton).toBeInTheDocument();
  userEvent.click(filterNumericButton);
  const filteredValue = screen.getByText(/population maior que 0/i);
  expect(filteredValue).toBeInTheDocument();
  const delFiltredButton = screen.getByRole("button", { name: /x/i });
  expect(delFiltredButton).toBeInTheDocument();

  const columnHeader = screen.getByRole("columnheader", { name: /name/i });
  expect(columnHeader).toBeInTheDocument();
});

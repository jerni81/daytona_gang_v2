import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Dashboard from "./../Dashboard";
import Firebase from "./../../config";

let name = { displayName: "AJ", uid: "11" };

it.skip("renders user name", () => {
  render(<Dashboard userFirebase={name} />);

  expect(screen.getByTestId("Dashboard").hasChildNodes());
});

it("Draft link works", () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <Dashboard userFirebase={name} />
    </Router>
  );

  expect(screen.getByTestId("Nav").hasChildNodes());

  userEvent.click(screen.getByTestId("DraftTab"));
  expect(screen.getByTestId("NextEvent")).toBeInTheDocument();

  userEvent.click(screen.getByTestId("ScheduleTab"));
  expect(screen.getByTestId("SchedulePage")).toBeInTheDocument();

  userEvent.click(screen.getByTestId("HomeTab"));
  expect(screen.getAllByText("Home")).toHaveLength(14);

  // userEvent.click(screen.getByText('Sign-out'))
  // expect(screen.getByTestId("SignIn")).toBeInTheDocument();
});

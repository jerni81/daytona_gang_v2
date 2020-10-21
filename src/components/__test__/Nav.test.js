import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Nav from "./../Nav";
import Dashboard from "../Dashboard";

describe.skip("test nav links work", () => {
  it.skip("Draft link works", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Nav />
      </Router>
    );

    expect(screen.getByTestId("Nav").hasChildNodes());

    // userEvent.click(screen.getByTestId("DraftTab"))

    // expect(screen.getByTestId("NextEvent").toBeInTheDocument())
  });
});

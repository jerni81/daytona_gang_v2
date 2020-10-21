const { ExpansionPanelActions } = require("@material-ui/core");

describe("My First Test", () => {
  it("Visits Daytona Gang", () => {
    cy.visit("http://localhost:3000/");
  });

  it("sign in ", () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/users/*",
      status: 200,
    }).as("getPostUsers");

    cy.route({
      method: "GET",
      url: "/events",
      status: 200,
    }).as("fetchData");

    cy.get("#ui-sign-in-email-input").type("ajjernigan87@gmail.com");
    cy.get(".firebaseui-id-submit").click();
    cy.get("#ui-sign-in-password-input").type("daytona");
    cy.get(".firebaseui-id-submit").click();
  });
});

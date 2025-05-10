describe("Header Component", () => {
  it("should display the correct title", () => {
    cy.visit("/");
    cy.get("h1").should("contain.text", "Robert Vitoriano");
  });
});

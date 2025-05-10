describe("Home Page", () => {
  it("should call the vehicles API on page load", () => {
    cy.intercept("GET", "https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate*").as("getVehicles");

    cy.visit("/");

    cy.wait("@getVehicles").its("response.statusCode").should("eq", 200);
  });
  
});

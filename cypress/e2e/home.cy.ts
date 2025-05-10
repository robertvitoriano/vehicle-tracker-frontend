describe("Home Page", () => {
  it("should call the vehicles API on page load", () => {
    cy.intercept("GET", "https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate*").as("getVehicles");

    cy.visit("/");

    cy.wait("@getVehicles").its("response.statusCode").should("eq", 200);
  });
  
  it("should call the vehicles API on page load and after scrolling down", () => {
    cy.intercept("GET", "https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate?type=tracked&page=1&perPage=20").as("getVehicles");
    cy.intercept("GET","https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate?type=tracked&page=2&perPage=20").as("getVehiclesAfterScroll")
    cy.visit("/");
    cy.wait("@getVehicles").its("response.statusCode").should("eq", 200);
    cy.get(".page-container").scrollTo("bottom");
    cy.wait("@getVehiclesAfterScroll").its("response.statusCode").should("eq", 200);
  });
  
});

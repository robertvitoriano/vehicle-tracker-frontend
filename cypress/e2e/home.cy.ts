const API_URL = "https://develop-back-rota.rota361.com.br/recruitment/vehicles/list-with-paginate";
const PAGE_CONTAINER_SELECTOR = ".page-container";

describe("Home Page", () => {
  beforeEach(() => {
    
    cy.intercept("GET", `${API_URL}?type=tracked&page=1&perPage=20`).as("getVehicles");
    cy.visit("/");
  });

  context("Initial Page Load", () => {
    it("should call the vehicles API on page load", () => {
      
      cy.wait("@getVehicles").its("response.statusCode").should("eq", 200);
      
    });
  });

  context("Infinite Scrolling", () => {
    it("should call the vehicles API after scrolling down", () => {
      cy.intercept("GET", `${API_URL}?type=tracked&page=2&perPage=20`).as("getVehiclesAfterScroll");

      cy.wait("@getVehicles").its("response.statusCode").should("eq", 200);

      cy.get(PAGE_CONTAINER_SELECTOR).scrollTo("bottom");

      cy.wait("@getVehiclesAfterScroll").its("response.statusCode").should("eq", 200);
    });
  });
});

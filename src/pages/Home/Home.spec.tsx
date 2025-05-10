import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./Home";


const queryClient = new QueryClient();

describe("Home Component", () => {
  it("should render the header and call the vehicles API", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText("Lista")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Buscar por placa ou frota")).toBeInTheDocument();
    });
  });
});

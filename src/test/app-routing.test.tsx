import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import App from "@/App";
import { CartProvider } from "@/lib/cart";

describe("App routing", () => {
  it("renders the home page for / instead of the not-found page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CartProvider>
          <App />
        </CartProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /student sports/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "404" })).not.toBeInTheDocument();
  });
});

"use client";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button } from "@/src/components/client/button/button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("rendering children", () => {
    render(<Button>Button</Button>);

    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  it("disabled state checking", () => {
    render(<Button disabled>Disabled button</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("loading state checking", () => {
    render(<Button isLoading>Loading button</Button>);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("applies variant classes", () => {
    render(<Button variant="secondary">Styled button</Button>);

    expect(screen.getByRole("button")).toHaveClass("border-secondary");
  });

  it("full width class", () => {
    render(<Button fullWidth>Full width button</Button>);

    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("applies medium size", () => {
    render(<Button size="medium">Medium size button</Button>);

    expect(screen.getByRole("button")).toHaveClass("p-3");
  });

  it("onClick calls", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

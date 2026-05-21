"use client";

import { Input } from "@/src/components/client/input/input";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

interface TestFormProps {
  defaultValues?: { testEmail: string };
  errorMessage?: string;
}

function TestForm({ defaultValues = { testEmail: "" }, errorMessage }: TestFormProps) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const onSubmit = jest.fn();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="testEmail">
        <Input.Label label="Email Address" />
        <Input.Field register={register} type="email" data-testid="input-field" />
        <Input.TextError errorMessage={errorMessage} data-testid="error-message" />
      </Input>
      <button type="submit">Submit</button>
    </form>
  );
}

describe("Input (Compound Component)", () => {
  it("should throw an error when Input sub-components are rendered outside the Input parent", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Input.Label label="Test" />)).toThrow(
      "useInput must be used inside a provider"
    );

    consoleError.mockRestore();
  });

  it("should correctly link label and input via context name matching", () => {
    render(<TestForm />);

    const inputElement = screen.getByTestId("input-field");
    const labelElement = screen.getByText("Email Address");

    expect(inputElement).toHaveAttribute("id", "testEmail");
    expect(labelElement).toHaveAttribute("for", "testEmail");
  });

  it("should allow typing and sync state correctly with react-hook-form", async () => {
    render(<TestForm />);
    const user = userEvent.setup();
    const inputElement = screen.getByTestId("input-field");

    expect(inputElement).toHaveValue("");

    await user.type(inputElement, "test@example.com");

    expect(inputElement).toHaveValue("test@example.com");
  });

  it("should correctly disable the input field when disabled prop is provided", () => {
    function DisabledTestForm() {
      const { register } = useForm();
      return (
        <Input name="disabledInput">
          <Input.Field register={register} disabled={true} data-testid="disabled-field" />
        </Input>
      );
    }

    render(<DisabledTestForm />);
    const inputElement = screen.getByTestId("disabled-field");

    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass("disabled:cursor-not-allowed");
  });

  it("should render error message when errorMessage prop is passed", () => {
    const { rerender } = render(<TestForm errorMessage="" />);

    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();

    rerender(<TestForm errorMessage="Invalid email address" />);

    const errorElement = screen.getByText("Invalid email address");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("text-red-500");
  });
});

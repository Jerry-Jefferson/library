"use client";

import ItemCard from "@/src/components/client/itemCard/itemCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockedBookId = "65c2b3e4f1a2b3c4d5e6f7a9";

const setStateMock = jest.fn();

jest.mock("../src/shared/hooks/useFavorite", () => {
  const React = jest.requireActual("react");

  return {
    useFavorite: () => {
      const [isFavorite, setIsFavorite] = React.useState(false);

      const toggle = () => {
        setIsFavorite((prev: boolean) => !prev);
        setStateMock();
      };

      return {
        isFavorite,
        toggle,
      };
    },
  };
});

it("should change favorite icon color after click", async () => {
  const user = userEvent.setup();

  render(
    <ItemCard name="test">
      <ItemCard.Favorite bookId={mockedBookId} />
    </ItemCard>
  );

  const favoriteButton = screen.getByRole("button");
  const icon = favoriteButton.querySelector("svg");

  expect(icon).toHaveClass("text-secondary");

  await user.click(favoriteButton);

  expect(icon).toHaveClass("text-primary");
});

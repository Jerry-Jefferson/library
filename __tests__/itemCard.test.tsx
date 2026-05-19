"use client";

import ItemCard from "@/src/components/client/itemCard/itemCard";
import { IGenreSerialized } from "@/src/models/genre";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockToggleFavorite = jest.fn();

jest.mock("../src/shared/hooks/useFavorite", () => ({
  useFavorite: ({ bookId }: { bookId: string }) => ({
    isFavorite: false,
    toggle: () => mockToggleFavorite(bookId),
  }),
}));

const mockGenres: IGenreSerialized[] = [
  { _id: "65c2b3e4f1a2b3c4d5e6f7a1", title: "Fantasy" },
  { _id: "65c2b3e4f1a2b3c4d5e6f7a2", title: "Drama" },
];

const mockedBookId = "65c2b3e4f1a2b3c4d5e6f7a9";

describe("Item Card(Compound Component)", () => {
  it("should throw an error when Item Card sub-components are rendered outside the parent", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<ItemCard.Avatar alt="Test" view="rounded" src="" />)).toThrow(
      "useCard must be used inside a provider"
    );

    consoleError.mockRestore();
  });

  it("should render the parent and children without errors", () => {
    render(
      <ItemCard name="test">
        <ItemCard.Avatar alt="test" src="" view="rounded" />
        <ItemCard.Title content="Test title" />
        <ItemCard.Information content="Test info" color="secondary" />
        <ItemCard.Badge genres={mockGenres} />
        <ItemCard.Favorite bookId={mockedBookId} />
      </ItemCard>
    );

    expect(screen.getByAltText("test")).toBeInTheDocument();
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test info")).toBeInTheDocument();
    expect(screen.getByText("Fantasy")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render children in any order without errors", () => {
    const { unmount } = render(
      <ItemCard name="test">
        <ItemCard.Avatar alt="avatar-first" src="" view="rounded" />
        <ItemCard.Title content="Title second" />
      </ItemCard>
    );

    expect(screen.getByAltText("avatar-first")).toBeInTheDocument();
    expect(screen.getByText("Title second")).toBeInTheDocument();

    unmount();

    render(
      <ItemCard name="test">
        <ItemCard.Title content="Title first" />
        <ItemCard.Avatar alt="avatar-now-second" src="" view="rounded" />
      </ItemCard>
    );

    const titleFirst = screen.getByText("Title first");
    const avatarSecond = screen.getByAltText("avatar-now-second");

    expect(titleFirst).toBeInTheDocument();
    expect(avatarSecond).toBeInTheDocument();

    const positionMask = titleFirst.compareDocumentPosition(avatarSecond);
    expect(positionMask & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("should trigger favorite toggle and change state on click", async () => {
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
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockedBookId);
  });
});

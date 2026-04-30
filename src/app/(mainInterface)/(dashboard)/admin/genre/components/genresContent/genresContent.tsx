import { getAllGenres } from "@/lib/modules/genres/genres";
import { IGenreSerialized } from "@/src/models/genre";

export interface GenresRenderProps {
  genres: IGenreSerialized[] | null;
}

export interface GenresContentProps {
  children: (data: GenresRenderProps) => React.ReactNode;
}

export default async function GenresContent({ children }: GenresContentProps) {
  const genres = await getAllGenres();

  return (
    <>
      {children({
        genres,
      })}
    </>
  );
}

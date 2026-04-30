import { Suspense } from "react";
import GenresContent from "../../genre/components/genresContent/genresContent";
import { GenreManagementList } from "../components/genreManagementList/genreManagementList";

export default function GenresManagement() {
  return (
    <Suspense fallback={<div>Loading genres...</div>}>
      <GenresContent>{(data) => <GenreManagementList {...data} />}</GenresContent>
    </Suspense>
  );
}

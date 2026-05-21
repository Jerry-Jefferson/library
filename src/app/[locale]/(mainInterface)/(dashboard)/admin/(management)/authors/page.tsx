import { ITEMS_PER_PAGE } from "@/src/shared/constants/itemsPerPage";
import { Suspense } from "react";
import { ItemsSkeleton } from "../../../../components/itemsSkeleton/itemsSkeleton";
import { AuthorManagementList } from "../components/authorManagementList/authorManagementList";
import AuthorsContent from "@/src/app/[locale]/(mainInterface)/(public)/components/authorsContent/authorsContent";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
export interface AuthorsProps {
  searchParams: Promise<{ genres?: string; page?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Authors",
  });

  return {
    title: t("managementTitle"),
    description: t("managementDescription"),

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function AuthorsManagement({ searchParams }: AuthorsProps) {
  return (
    <Suspense
      fallback={
        <ItemsSkeleton
          className="h-[250px]"
          gridClassName="grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-4"
          itemsNumber={ITEMS_PER_PAGE.TWELVE}
        />
      }
    >
      <AuthorsContent searchParams={searchParams} itemsPerPage={ITEMS_PER_PAGE.TWELVE}>
        {(data) => <AuthorManagementList {...data} />}
      </AuthorsContent>
    </Suspense>
  );
}

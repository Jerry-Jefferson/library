import { useRouter, useSearchParams } from "next/navigation";

export type ModalType = "review" | "delete" | "edit";

export function useModalQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modal = searchParams?.get("modal");

  const openModal = (type: ModalType) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("modal", type);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("modal");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { modal, openModal, closeModal };
}

import { Spinner } from "@/src/components/client/spinner/spinner";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner width="100px" color="green" />
    </div>
  );
}

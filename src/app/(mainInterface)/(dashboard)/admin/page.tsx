import { Button } from "@/src/components/client/button/button";

export default function Admin() {
  return (
    <div>
      <p>Admin</p>
      <div className="w-[50%] flex justify-between gap-6">
        <Button size="small" variant="secondary">
          This is btn
        </Button>
        <Button size="small" variant="primary" disabled>
          Lala
        </Button>
      </div>
    </div>
  );
}

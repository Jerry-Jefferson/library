export function FormHeader({ entityLabel }: { entityLabel: string }) {
  return (
    <div className="text-5xl font-bold">
      <p className="text-[clamp(14px,0.5rem+4vw,50px)]">Add New</p>
      <p className="text-primary text-[clamp(14px,0.5rem+4vw,50px)]">{entityLabel} Entry</p>
    </div>
  );
}

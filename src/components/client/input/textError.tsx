export interface TextErrorProps {
  errorMessage: string | undefined;
}

export function TextError({ errorMessage }: TextErrorProps) {
  if (!errorMessage) return null;
  return <p className="text-red-500 text-sm pt-2">{errorMessage}</p>;
}

import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading() {
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <ProgressSpinner className="mb-3" />
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Loading...</h1>
      </div>
    </div>
  );
}

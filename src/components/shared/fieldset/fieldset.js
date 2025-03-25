import { Fieldset } from "primereact/fieldset";

export default function SharedFieldset({ children, legend }) {
  return (
    <Fieldset className="border-gray-300" legend={legend}>
      {children}
    </Fieldset>
  );
}

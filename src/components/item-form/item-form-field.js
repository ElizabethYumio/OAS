import { ZERO } from "@/common/constants";
import moment from "moment";

export default function NewItemFormField({ field, value, onChange }) {
  const { id, label, grid, component: Component, ...rest } = field;

  function handleChange(e) {
    let value;
    if (id === "endDate") {
      value = moment(e?.value);
    } else if (id === "startPrice") {
      value = e?.value || ZERO;
    } else {
      value = e?.value ?? e?.target?.value;
    }

    onChange(id, value);
  }

  function getValue() {
    return id === "endDate" ? value?.toDate() : value;
  }

  return (
    <div className="p-field">
      <label htmlFor={id}>{label}</label>
      <Component id={id} value={getValue()} onChange={handleChange} {...rest} />
    </div>
  );
}

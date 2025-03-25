export default function ProfileFormField({ field, value, onChange }) {
  const { id, label, grid, component: Component, ...rest } = field;

  function handleChange(e) {
    let value;
    value = e?.value ?? e?.target?.value ?? "";

    onChange(id, value);
  }

  function getValue() {
    return value ?? "";
  }

  return (
    <div className="p-field">
      <label htmlFor={id}>{label}</label>
      <Component id={id} value={getValue()} onChange={handleChange} {...rest} />
    </div>
  );
}

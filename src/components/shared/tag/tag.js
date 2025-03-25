import { Tag } from "primereact/tag";

export default function SharedTag({ value, color, className, ...props }) {
  return (
    <Tag
      value={value}
      style={{ backgroundColor: color }}
      className={`shadow-2 ${className}`}
      {...props}
    ></Tag>
  );
}

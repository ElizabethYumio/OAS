import { Button } from "primereact/button";

export default function SharedButton({ className, ...props }) {
  return <Button className={`shadow-2 ${className}`} {...props}></Button>;
}

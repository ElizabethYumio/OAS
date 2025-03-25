import { Dialog } from "primereact/dialog";

import SharedButton from "../button/button";

export default function SharedDialog({
  visible,
  onHide,
  header = "Confirmation",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmIcon = "pi pi-check",
  cancelIcon = "pi pi-times",
  confirmSeverity = "primary",
  cancelSeverity = "secondary",
}) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={header}
      footer={
        <div>
          <SharedButton
            label={cancelLabel}
            icon={cancelIcon}
            severity={cancelSeverity}
            onClick={onCancel || onHide}
            className="p-button-text"
          />
          <SharedButton
            label={confirmLabel}
            icon={confirmIcon}
            severity={confirmSeverity}
            onClick={onConfirm}
            autoFocus
          />
        </div>
      }
    >
      <p>{message}</p>
    </Dialog>
  );
}

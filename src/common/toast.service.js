import { createRef } from "react";

export const toastRef = createRef();

export const showToast = ({
  detail,
  summary = "Success!",
  severity = "success",
  life = 3000,
} = {}) => {
  toastRef.current?.show({
    severity,
    summary,
    detail,
    life,
  });
};

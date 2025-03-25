import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Toast } from "primereact/toast";

import { toastRef } from "@/common/toast.service";

import { useLoginStore } from "@/stores/login";

import Sidebar from "./sidebar";

export default function Layout({ children }) {
  const router = useRouter();
  const isAuthorized = useLoginStore((state) => state.isAuthorized);

  useEffect(() => {
    if (!isAuthorized()) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid surface-100">
      <Toast ref={toastRef} />
      <div className="col-2">
        <Sidebar></Sidebar>
      </div>
      <div className="col-10">{children}</div>
    </div>
  );
}

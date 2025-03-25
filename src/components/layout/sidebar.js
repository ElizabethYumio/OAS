import { useRouter } from "next/navigation";

import { Menu } from "primereact/menu";

import { useLoginStore } from "@/stores/login";

export default function Sidebar({ children }) {
  const router = useRouter();

  const currentUser = useLoginStore((state) => state.currentUser);
  const removeCurrentUser = useLoginStore((state) => state.removeCurrentUser);

  function handleLogoutOnClick() {
    removeCurrentUser();
    router.push("/login");
  }

  function renderMenuHeader() {
    const currentUsername = currentUser?.username;

    return (
      <div className="px-3">
        {currentUsername ? (
          <h4>Welcome, {currentUsername}!</h4>
        ) : (
          <h4>Fetching username...</h4>
        )}
      </div>
    );
  }

  const items = [
    {
      template: renderMenuHeader,
    },
    {
      separator: true,
    },
    {
      label: "Browse",
      items: [
        {
          label: "Items",
          icon: "pi pi-shopping-cart",
          command: () => router.push("/"),
        },
      ],
    },
    {
      label: "Profile",
      items: [
        {
          label: "My Items",
          icon: "pi pi-list",
          command: () => router.push("/my-items"),
        },
        {
          label: "Bids",
          icon: "pi pi-credit-card",
          command: () => router.push("/bids"),
        },
        {
          label: "Edit Profile",
          icon: "pi pi-user",
          command: () => router.push("/profile"),
        },
      ],
    },
    {
      label: "Other",
      items: [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: handleLogoutOnClick,
        },
      ],
    },
  ];

  return (
    <div className="h-screen flex flex-column justify-content-between">
      <Menu model={items} className="w-full"></Menu>
    </div>
  );
}

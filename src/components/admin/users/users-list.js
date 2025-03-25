import { useRouter } from "next/navigation";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

import { formatVNCurrency, formatVNDate } from "@/common/utils";

import SharedFieldset from "../../shared/fieldset/fieldset";
import Loading from "../../shared/loading/loading";
import { deleteUser } from "@/api/user.service";

const columns = [
  {
    field: "username",
    header: "Username",
    style: { width: "25%" },
    alignHeader: "left",
    align: "left",
  },
  {
    field: "avatarUrl",
    header: "User Avatar",
    style: { width: "10%" },
    alignHeader: "left",
    align: "left",
    body: renderImageCell,
  },
  {
    field: "email",
    header: "Email",
    style: { width: "22.5%" },
    alignHeader: "right",
    align: "right",
    body: renderEmail,
  },
  {
    field: "updatedDate",
    header: "Last Updated",
    style: { width: "10%" },
    alignHeader: "right",
    align: "right",
    body: renderUpdatedDateCell,
  },
];

function renderWinningCell(bid) {
  const tagProps = {
    value: () => (bid.isWinning ? "Yes" : "No"),
    severity: () => (bid.isWinning ? "success" : "warning"),
    icon: () => (
      <i
        className={bid.isWinning ? "pi pi-check" : "pi pi-exclamation-triangle"}
        style={{ fontSize: "1rem" }}
      ></i>
    ),
  };

  return (
    <div className="flex justify-content-center">
      <Tag
        className="text-base flex gap-2 pl-3 my-auto"
        value={tagProps.value()}
        severity={tagProps.severity()}
        icon={tagProps.icon()}
      ></Tag>
    </div>
  );
}

function renderEmail(user) {
  return user.email;
}

function renderImageCell(user) {
  return (
    <div className="w-8rem h-8rem border-round-md shadow-4">
      <Image
        imageClassName="border-round-md"
        src={user.avatar_url}
        alt={user.username}
        width="100%"
        height="100%"
      ></Image>
    </div>
  );
}

function renderUpdatedDateCell(bid) {
  return formatVNDate(bid.updatedDate);
}

export default function UserList({ users, loading }) {
  const router = useRouter();

  function renderNavButton(user) {
    function fetchDeleteUser(){
      deleteUser(user.id);
    }
    return (
      <Button
        label="Delete"
        icon="pi pi-arrow-right"
        className="p-button-sm p-button-outlined"
        onClick={fetchDeleteUser}
      ></Button>
    );
  }

  return (
    <SharedFieldset legend="Users">
      {loading && <Loading />}
      {!loading && users.length > 0 && (
        <DataTable
          className="border-1 border-gray-200 border-round-lg"
          stripedRows
          value={users}
        >
          {columns.map((column) => (
            <Column key={column.field} {...column}></Column>
          ))}
          <Column
            header="Action"
            body={renderNavButton}
            align="center"
            alignHeader="center"
          ></Column>
        </DataTable>
      )}
    </SharedFieldset>
  );
}

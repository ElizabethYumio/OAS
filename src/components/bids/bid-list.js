import { useRouter } from "next/navigation";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image } from "primereact/image";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";

import { formatVNCurrency, formatVNDate } from "@/common/utils";

import SharedFieldset from "../shared/fieldset/fieldset";
import Loading from "../shared/loading/loading";

const columns = [
  {
    field: "itemName",
    header: "Item Name",
    style: { width: "25%" },
    alignHeader: "left",
    align: "left",
  },
  {
    field: "itemImageUrl",
    header: "Image",
    style: { width: "10%" },
    alignHeader: "left",
    align: "left",
    body: renderImageCell,
  },
  {
    field: "amount",
    header: "Amount",
    style: { width: "22.5%" },
    alignHeader: "right",
    align: "right",
    body: renderAmountCell,
  },
  {
    field: "isWinning",
    header: "Winning",
    style: { width: "22.5%" },
    alignHeader: "center",
    body: renderWinningCell,
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

function renderAmountCell(bid) {
  return formatVNCurrency(bid.amount);
}

function renderImageCell(bid) {
  return (
    <div className="w-8rem h-8rem border-round-md shadow-4">
      <Image
        imageClassName="border-round-md"
        src={bid.itemImageUrl}
        alt={bid.itemName}
        width="100%"
        height="100%"
      ></Image>
    </div>
  );
}

function renderUpdatedDateCell(bid) {
  return formatVNDate(bid.updatedDate);
}

export default function BidList({ bids, loading }) {
  const router = useRouter();

  function renderNavButton(bid) {
    return (
      <Button
        label="View"
        icon="pi pi-arrow-right"
        className="p-button-sm p-button-outlined"
        onClick={() => router.push(`/item/${bid.itemId}`)}
      ></Button>
    );
  }

  return (
    <SharedFieldset legend="Bid List">
      {loading && <Loading />}
      {!loading && bids.length > 0 && (
        <DataTable
          className="border-1 border-gray-200 border-round-lg"
          stripedRows
          value={bids}
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

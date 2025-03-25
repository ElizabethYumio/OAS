import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getItemById } from "@/api/item.service";
import { postCreateBidForCurrentUser } from "@/api/bid.service";

import { formatVNCurrency, getItemState, mapDataToItem } from "@/common/utils";
import { showToast } from "@/common/toast.service";
import { ITEM_STATE, TITLE_HEADER_WITH_BUTTON } from "@/common/constants";

import ItemDetails from "./item-details";
import SharedCard from "../shared/card/card";
import ItemBids from "./item-bids";
import SharedButton from "../shared/button/button";

export default function Item({ id }) {
  const router = useRouter();
  const params = useParams();

  const [item, setItem] = useState(null);
  const [itemState, setItemState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateBidDisabled, setIsCreateBidDisabled] = useState(true);

  function isItemStateFromCurrentUser() {
    return itemState === ITEM_STATE.FROM_CURRENT_USER;
  }

  function getItem() {
    if (!id) {
      return;
    }

    setLoading(() => true);
    getItemById(id).then((data) => {
      setItem(() => mapDataToItem(data));
      setLoading(() => false);
      setIsCreateBidDisabled(() => false);
    });
  }

  function handleCreateBid(amount) {
    postCreateBidForCurrentUser({
      itemId: id,
      amount,
    }).then((data) => {
      showToast({
        detail: `Your bid of ${formatVNCurrency(amount)} has been placed.`,
      });
      setIsCreateBidDisabled(() => true);
      getItem();
    });
  }

  useEffect(() => {
    setItemState(() => getItemState(item));
  }, [item]);

  useEffect(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderHeader() {
    return (
      <div className={TITLE_HEADER_WITH_BUTTON.OUTER_DIV_CLASS}>
        <h3 className={TITLE_HEADER_WITH_BUTTON.H3_CLASS}>Item Details</h3>
        {isItemStateFromCurrentUser() && (
          <SharedButton
            className="m-0"
            severity="info"
            label="Edit Item"
            icon="pi pi-pen-to-square"
            onClick={() => router.push(`/item/${params.id}/edit`)}
          ></SharedButton>
        )}
      </div>
    );
  }

  return (
    <SharedCard backNav header={renderHeader()}>
      <div className="grid">
        <div className="col-8">
          <ItemDetails
            item={item}
            itemState={itemState}
            loading={loading}
            onCreateBid={handleCreateBid}
            isCreateBidDisabled={isCreateBidDisabled}
          />
        </div>
        <div className="col-4">
          <ItemBids item={item} loading={loading} />
        </div>
      </div>
    </SharedCard>
  );
}

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Image } from "primereact/image";

import { ITEM_STATE } from "@/common/constants";

import {
  formatVNCurrency,
  formatVNDate,
  getItemState,
  mapDataListToTags,
} from "@/common/utils";

import { useLoginStore } from "@/stores/login";

import SharedCard from "../shared/card/card";
import SharedButton from "../shared/button/button";
import SharedTag from "../shared/tag/tag";

export default function Item({ item }) {
  const router = useRouter();

  const currentUser = useLoginStore((state) => state.currentUser);

  const [itemState, setItemState] = useState(ITEM_STATE.NEUTRAL);

  function getWinningBid() {
    return item?.bids[0]?.amount;
  }

  function isItemStateFromCurrentUser() {
    return itemState == ITEM_STATE.FROM_CURRENT_USER;
  }

  function getMinimumValue() {
    return Math.max(getWinningBid() ?? 0, item?.startPrice ?? 0);
  }

  const navButtonProps = {
    severity: () => (isItemStateFromCurrentUser() ? "info" : "primary"),
    label: () => (isItemStateFromCurrentUser() ? "Edit" : "View"),
  };

  function navigateToItemDetails() {
    router.push(`/item/${item?.id}`);
  }

  useEffect(() => {
    setItemState(() => getItemState(item));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  function renderTags() {
    const tags = mapDataListToTags(item?.tags);

    if (tags && tags.length > 0) {
      return (
        <div className="flex gap-1">
          {tags.map((tag) => (
            <SharedTag
              key="tag.id"
              value={tag.name}
              color={tag.primeColor}
            ></SharedTag>
          ))}
        </div>
      );
    }
  }

  function renderItemInfo() {
    return (
      <div className="flex flex-grow-1 flex-column gap-3 justify-content-center">
        <h4 className="p-card-title m-0">
          {item?.name || "PLACEHOLDER ITEM NAME"}
        </h4>
        {renderTags()}
        <div className="flex flex-column gap-2">
          <div className="flex align-items-center">
            <strong className="w-3">Current: </strong>
            <p className="w-7 m-0">{formatVNCurrency(getMinimumValue())}</p>
          </div>
          <div className="flex align-items-center">
            <strong className="w-3">End: </strong>
            <p className="w-7 m-0">{formatVNDate(item?.endDate)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SharedCard unstyled>
      <div className="w-full p-3 flex gap-3">
        <div className="w-12rem h-12rem">
          <Image
            imageClassName="w-12rem h-12rem border-round-md shadow-3"
            width="100%"
            height="100%"
            src={item?.image_url}
            alt={item?.name}
          ></Image>
        </div>
        <div className="p-1 w-full flex flex-column justify-content-between">
          {renderItemInfo()}
          <div className="flex justify-content-end">
            <SharedButton
              className="h-2rem"
              label={navButtonProps.label()}
              severity={navButtonProps.severity()}
              onClick={navigateToItemDetails}
            ></SharedButton>
          </div>
        </div>
      </div>
    </SharedCard>
  );
}

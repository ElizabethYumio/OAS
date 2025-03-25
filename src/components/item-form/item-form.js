import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { showToast } from "@/common/toast.service";
import { ITEM_STATE } from "@/common/constants";
import { getItemState, mapDataToItem } from "@/common/utils";

import { createItem, getItemById, updateItem } from "@/api/item.service";

import SharedCard from "../shared/card/card";

import ItemFormFields from "./item-form-fields";

export default function ItemForm({ itemId }) {
  const router = useRouter();

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [itemState, setItemState] = useState(ITEM_STATE.NEUTRAL);

  function isItemStateFromCurrentUser() {
    return itemState === ITEM_STATE.FROM_CURRENT_USER;
  }

  function getTitle() {
    if (loading) {
      return "Loading...";
    } else if (isItemStateFromCurrentUser()) {
      return "Edit Item";
    }
    return "Create New Item";
  }

  function fetchItem() {
    if (!itemId) {
      return;
    }

    setLoading(() => true);
    getItemById(itemId).then((data) => {
      setItem(() => mapDataToItem(data));
      setLoading(() => false);
    });
  }

  function onSubmit(data) {
    const submitFn = isItemStateFromCurrentUser() ? updateItem : createItem;

    submitFn(data).then(
      () => {
        showToast({
          detail: `${
            isItemStateFromCurrentUser() ? "Updated" : "Created"
          } Item '${data?.name}!'`,
          summary: "Success!",
        });
        !isItemStateFromCurrentUser() && router.push("/my-items");
      },
      (error) => {}
    );
  }

  useEffect(() => {
    setItemState(() => getItemState(item));
  }, [item]);

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <SharedCard backNav title={getTitle()}>
      <ItemFormFields
        loading={loading}
        item={item}
        itemState={itemState}
        onSubmit={onSubmit}
      />
    </SharedCard>
  );
}

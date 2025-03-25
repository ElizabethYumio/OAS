import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "primereact/button";

import SharedCard from "../shared/card/card";

import ItemList from "./item-list";
import ItemFilter from "./item-filter";

import {
  getItemsByCurrentUser,
  getItemsExcludingCurrentUser,
} from "@/api/item.service";

import { EMPTY_STRING, TITLE_HEADER_WITH_BUTTON } from "@/common/constants";
import { mapDataListToItems } from "@/common/utils";

const SEARCH_PARAMS = {
  QUERY: "query",
  TAGS: "tags",
};

export default function Items({ isCurrentUser } = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  function fetchItems() {
    // Get queries from SearchParams
    const query = searchParams.get(SEARCH_PARAMS.QUERY) ?? EMPTY_STRING;
    const tags = searchParams.get(SEARCH_PARAMS.TAGS) ?? "";

    // Fetch from API
    const getFn = isCurrentUser
      ? getItemsByCurrentUser
      : getItemsExcludingCurrentUser;

    setLoading(() => true);
    getFn({ query, tags }).then((data) => {
      setItems(() => mapDataListToItems(data));
      setLoading(() => false);
    });
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function renderHeader() {
    const title = isCurrentUser ? "My Items" : "Browse Items";

    return (
      <div className={TITLE_HEADER_WITH_BUTTON.OUTER_DIV_CLASS}>
        <h3 className={TITLE_HEADER_WITH_BUTTON.H3_CLASS}>{title}</h3>
        {isCurrentUser && (
          <Button
            className="m-0"
            label="New Item"
            icon="pi pi-plus"
            onClick={() => router.push("/my-items/new")}
          ></Button>
        )}
      </div>
    );
  }

  return (
    <SharedCard header={renderHeader()}>
      <div className="grid">
        <div className="col-9">
          <ItemList items={items} loading={loading} />
        </div>
        <div className="col-3">
          <ItemFilter />
        </div>
      </div>
    </SharedCard>
  );
}

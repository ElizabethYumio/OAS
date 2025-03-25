import { useEffect, useState } from "react";

import SharedCard from "../shared/card/card";
import BidList from "./bid-list";

import { getBidsByCurrentUser } from "@/api/bid.service";
import { mapDataListByMapping } from "@/common/utils";

const bidMapping = {
  id: "id",
  itemId: "item.id",
  itemImageUrl: "item.image_url",
  itemName: "item.name",
  amount: "amount",
  isWinning: "is_winning",
  updatedDate: "updated_date",
};

export default function Bids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchBids() {
    setLoading(() => true);
    getBidsByCurrentUser().then((data) => {
      setBids(() => mapDataListByMapping(data, bidMapping));
      setLoading(() => false);
    });
  }

  // Fetch active bids
  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <SharedCard title="Bids">
      <BidList bids={bids} loading={loading}></BidList>
    </SharedCard>
  );
}

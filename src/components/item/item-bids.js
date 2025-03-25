import { formatVNCurrency, mapDataToUser } from "@/common/utils";

import { Image } from "primereact/image";

import SharedFieldset from "../shared/fieldset/fieldset";
import { ZERO } from "@/common/constants";
import SharedTag from "../shared/tag/tag";

export default function ItemBids({ item }) {
  function renderItemBid(bid, index) {
    const buyer = mapDataToUser(bid.buyer);

    function isWinning() {
      return index === ZERO;
    }

    return (
      <li
        key={bid.id}
        className="flex justify-content-between align-items-center"
      >
        <div className="flex gap-3 align-items-center">
          <div className="w-6rem h-6rem shadow-2">
            <Image
              src={buyer?.avatarUrl}
              alt={buyer?.username}
              width="100%"
              height="100%"
              className="w-full h-full"
            ></Image>
          </div>
          <div className="flex flex-column gap-2">
            <div className="flex gap-2">
              <span className="text-lg font-bold">{bid.buyer?.username}</span>
              {isWinning() && <SharedTag value="Winning"></SharedTag>}
            </div>
            <span className="text-sm text-600">{bid.buyer?.email}</span>
          </div>
        </div>

        <div className="text-lg font-bold text-right">
          {formatVNCurrency(bid?.amount)}
        </div>
      </li>
    );
  }

  return (
    <SharedFieldset legend="Bids">
      <div className="-m-2">
        {item?.bids && item.bids.length > 0 ? (
          <ul className="list-none p-0 m-0">
            {item.bids.map((bid, index) => renderItemBid(bid, index))}
          </ul>
        ) : (
          <p className="text-center text-600">
            No bids available for this item.
          </p>
        )}
      </div>
    </SharedFieldset>
  );
}

import { ZERO } from "@/common/constants";

import Item from "./item";

import Loading from "../shared/loading/loading";
import SharedFieldset from "../shared/fieldset/fieldset";

export default function ItemList({ items, loading }) {
  function renderLoading() {
    if (loading) {
      return <Loading />;
    }
  }

  function renderNoItems() {
    if (!loading && (!items || items.length === ZERO)) {
      return (
        <div className="w-full h-12rem flex align-items-center justify-content-center">
          <p>No items!</p>
        </div>
      );
    }
  }

  function renderItemList() {
    if (!loading && items && items.length > ZERO) {
      return (
        <div className="-m-3 grid">
          {items.map((item) => (
            <div className="col-6" key={item.id}>
              <Item key={item?.id} item={item}></Item>
            </div>
          ))}
        </div>
      );
    }
  }

  return (
    <SharedFieldset legend="Item List">
      {renderLoading()}
      {renderNoItems()}
      {renderItemList()}
    </SharedFieldset>
  );
}

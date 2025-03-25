import { useEffect, useState } from "react";

import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";

import {
  formatVNCurrency,
  formatVNDate,
  mapDataListToTags,
} from "@/common/utils";
import { ITEM_STATE, ZERO } from "@/common/constants";

import SharedFieldset from "../shared/fieldset/fieldset";
import Loading from "../shared/loading/loading";
import SharedButton from "../shared/button/button";
import SharedTag from "../shared/tag/tag";
import SharedDialog from "../shared/dialog/dialog";

export default function ItemDetails({
  item,
  itemState,
  loading,
  onCreateBid,
  isCreateBidDisabled,
}) {
  const [amount, setAmount] = useState(0);
  const [isDebounce, setIsDebounce] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  function isInvalidWithStep() {
    return (amount - item?.startPrice) % item?.step !== ZERO;
  }

  function getHighestBid() {
    return parseInt(item?.bids[0]?.amount ?? 0);
  }

  function getMinimumValidAmount() {
    const highestBid = getHighestBid() ?? 0;
    const startPrice = item?.startPrice ?? 0;

    return Math.max(highestBid + item?.step, startPrice);
  }

  function isItemStateFromCurrentUser() {
    return itemState === ITEM_STATE.FROM_CURRENT_USER;
  }

  function isInvalidAmount() {
    return amount < getMinimumValidAmount();
  }

  function getInputErrorMessage() {
    if (isItemStateFromCurrentUser()) {
      return "You cannot place bids on your own item.";
    }
    if (amount <= getHighestBid()) {
      return "Current value is less than the winning bid!";
    }
    if (amount < item?.startPrice) {
      return "Current value is less than Starting price!";
    }
    if (isInvalidWithStep()) {
      return "Current value must follow the step increase!";
    }
    return null;
  }

  const submitButtonProps = {
    disabled: () => {
      return (
        isItemStateFromCurrentUser() ||
        isInvalidAmount() ||
        isInvalidWithStep() ||
        isDebounce ||
        isCreateBidDisabled
      );
    },
    label: () => {
      if (isItemStateFromCurrentUser()) {
        return "Can't bid!";
      } else if (isInvalidAmount() || isInvalidWithStep()) {
        return "Invalid!";
      }
      return "Place Bid";
    },
    icon: () => {
      if (
        isItemStateFromCurrentUser() ||
        isInvalidAmount() ||
        isInvalidWithStep()
      ) {
        return "pi pi-exclamation-circle";
      }
      return "pi pi-check";
    },
    severity: () => {
      if (isItemStateFromCurrentUser()) {
        return "secondary";
      } else if (isInvalidAmount() || isInvalidWithStep()) {
        return "danger";
      }
      return "success";
    },
  };

  function handleCreateBidOnClick() {
    setShowConfirmDialog(() => true);
  }

  function submitBid() {
    if (isDebounce) {
      return;
    }

    setIsDebounce(true);

    onCreateBid(amount);

    setTimeout(() => {
      setIsDebounce(false);
    }, 1000);

    setShowConfirmDialog(() => false);
  }

  useEffect(() => {
    setAmount(() => getMinimumValidAmount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.startPrice, item?.bids]);

  function renderConfirmationDialogMessage() {
    return (
      <p>
        Confirm placing Bid of <strong>{formatVNCurrency(amount)}</strong> for{" "}
        <strong>{item?.name}</strong>.
      </p>
    );
  }

  function renderConfirmationDialog() {
    return (
      <SharedDialog
        visible={showConfirmDialog}
        onHide={() => setShowConfirmDialog(() => false)}
        header="Confirm Bid"
        message={renderConfirmationDialogMessage()}
        onConfirm={submitBid}
        onCancel={() => setShowConfirmDialog(() => false)}
      ></SharedDialog>
    );
  }

  function renderTags() {
    const tags = mapDataListToTags(item?.tags);

    if (tags && tags.length > 0) {
      return (
        <div className="flex">
          <strong className="my-auto w-3">Tags: </strong>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <SharedTag
                key="tag.id"
                value={tag.name}
                color={tag.primeColor}
              ></SharedTag>
            ))}
          </div>
        </div>
      );
    }
  }

  function renderItemImage() {
    return (
      <div className="w-full h-25rem shadow-7 border-1 border-gray-200 border-round-lg">
        <Image
          src={item?.imageUrl}
          alt={item?.name}
          width="100%"
          height="100%"
          imageClassName="p-2 border-round-lg"
        />
      </div>
    );
  }

  function renderBidInput() {
    return (
      <div className="grid">
        <div className="col-8">
          <InputNumber
            disabled={isItemStateFromCurrentUser()}
            step={item?.step}
            showButtons
            className="w-full"
            value={amount}
            onValueChange={(e) => setAmount(() => e.value)}
            mode="currency"
            currency="VND"
            placeholder="Enter your bid"
          />
          <small>{getInputErrorMessage()}</small>
        </div>
        <div className="col-4">
          <SharedButton
            disabled={submitButtonProps.disabled()}
            label={submitButtonProps.label()}
            icon={submitButtonProps.icon()}
            severity={submitButtonProps.severity()}
            onClick={handleCreateBidOnClick}
          />
        </div>
      </div>
    );
  }

  function renderItemInformation() {
    return (
      <div className="flex flex-column gap-3">
        <div className="flex align-items-center">
          <strong className="w-3">Starting price: </strong>
          <span>{formatVNCurrency(item?.startPrice)}</span>
        </div>
        <div className="flex align-items-center">
          <strong className="w-3">Highest Bid: </strong>
          <span>{formatVNCurrency(item?.bids[0]?.amount)}</span>
        </div>
        <div className="flex align-items-center">
          <strong className="w-3">Step: </strong>
          <span>{formatVNCurrency(item?.step)}</span>
        </div>
        <div className="flex align-items-center">
          <strong className="w-3">Ends on: </strong>
          <span>{formatVNDate(item?.endDate)}</span>
        </div>
      </div>
    );
  }

  function renderItemDetails() {
    return (
      <div className="mx-3 flex flex-column gap-3">
        <h1 className="my-auto">{item?.name}</h1>
        {renderItemInformation()}
        {renderTags()}
        {renderBidInput()}
        <p className="mt-5">{item?.description}</p>
      </div>
    );
  }

  function renderLoading() {
    if (loading && !item) {
      return <Loading />;
    }
  }

  function renderItem() {
    if (item) {
      return (
        <div className="grid">
          <div className="col-5">{renderItemImage()}</div>
          <div className="col-7">{renderItemDetails()}</div>
        </div>
      );
    }
  }

  return (
    <SharedFieldset legend="Item">
      {renderLoading()}
      {renderConfirmationDialog()}
      {renderItem()}
    </SharedFieldset>
  );
}

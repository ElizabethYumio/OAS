import React, { useEffect, useState } from "react";
import moment from "moment";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Image } from "primereact/image";

import { PRIME_DATE_FORMAT, VI_VN, VND, ITEM_STATE } from "@/common/constants";

import SharedFieldset from "../shared/fieldset/fieldset";
import Loading from "../shared/loading/loading";
import SharedButton from "../shared/button/button";

import ItemFormField from "./item-form-field";

const formFields = [
  {
    id: "name",
    label: "Name",
    component: InputText,
    type: "text",
    required: true,
    grid: { cols: 6 },
  },
  {
    id: "imageUrl",
    label: "Image URL",
    component: InputText,
    type: "text",
    grid: { cols: 6 },
  },
  {
    id: "startPrice",
    label: "Start Price",
    component: InputNumber,
    mode: "currency",
    currency: VND,
    locale: VI_VN,
    required: true,
    grid: { cols: 6 },
  },
  {
    id: "step",
    label: "Step",
    component: InputNumber,
    mode: "currency",
    currency: VND,
    locale: VI_VN,
    required: true,
    grid: { cols: 6 },
  },
  {
    id: "endDate",
    label: "End Date",
    component: Calendar,
    dateFormat: PRIME_DATE_FORMAT.DDMMYY_SLASH,
    showIcon: true,
    required: true,
    grid: { cols: 6 },
  },
  {
    id: "description",
    label: "Description",
    component: InputTextarea,
    rows: 6,
    grid: { cols: 12 },
  },
];

const initialFormData = {
  name: "",
  imageUrl: "",
  description: "",
  startPrice: 0,
  endDate: moment(),
};

export default function NewItemForm({ item, loading, onSubmit, itemState }) {
  const [formData, setFormData] = useState(item ?? initialFormData);

  const submitButtonProps = {
    severity: () => (isItemStateFromCurrentUser() ? "info" : "primary"),
    label: () => (isItemStateFromCurrentUser() ? "Edit Item" : "Create Item"),
    icon: () =>
      isItemStateFromCurrentUser() ? "pi pi-pen-to-square" : "pi pi-plus",
  };

  function isItemStateFromCurrentUser() {
    return itemState === ITEM_STATE.FROM_CURRENT_USER;
  }

  function handleChange(id, value) {
    setFormData(() => ({ ...formData, [id]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  useEffect(() => {
    setFormData(() => item);
  }, [item]);

  function renderPreviewImage() {
    return (
      <div className="flex justify-content-center">
        <div className="w-full h-22rem border-1 border-round border-gray-300 p-3">
          {formData.imageUrl ? (
            <Image
              src={formData.imageUrl || "a"}
              alt="Item Image Preview"
              imageClassName="w-full h-full"
            ></Image>
          ) : (
            <div
              className="flex align-items-center justify-content-center"
              style={{ height: "100%" }}
            >
              <i className="pi pi-image" style={{ fontSize: "2rem" }} />
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderFormFields() {
    return (
      <div className="p-fluid grid">
        {formFields.map((field) => (
          <div key={field.id} className={`col-${field.grid?.cols}`}>
            <ItemFormField
              field={field}
              value={formData[field.id]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    );
  }

  function renderLoading() {
    if (loading) {
      return <Loading />;
    }
  }

  function renderForm() {
    if (!loading && item) {
      return (
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="col-9">{renderFormFields()}</div>
            <div className="col-3">{renderPreviewImage()}</div>
          </div>
          <div className="flex justify-content-end mt-2">
            <SharedButton
              type="submit"
              severity={submitButtonProps.severity()}
              label={submitButtonProps.label()}
              icon={submitButtonProps.icon()}
            />
          </div>
        </form>
      );
    }
  }

  return (
    <SharedFieldset legend="Item Form">
      {renderLoading()}
      {renderForm()}
    </SharedFieldset>
  );
}

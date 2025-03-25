import { useEffect, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";

import SharedFieldset from "../shared/fieldset/fieldset";
import Loading from "../shared/loading/loading";
import SharedButton from "../shared/button/button";

import ProfileFormField from "./profile-form-field";

const formFields = [
  {
    id: "username",
    label: "Username",
    component: InputText,
    type: "text",
    required: true,
    grid: { cols: 6 },
  },
  {
    id: "email",
    label: "Email",
    component: InputText,
    type: "email",
    required: true,
    grid: { cols: 6 },
  },
  {
    id: "password",
    label: "Password",
    component: InputText,
    type: "password",
    grid: { cols: 6 },
  },
  {
    id: "address",
    label: "Address",
    component: InputText,
    type: "text",
    grid: { cols: 6 },
  },
  {
    id: "phone",
    label: "Phone",
    component: InputText,
    type: "text",
    grid: { cols: 6 },
  },
  {
    id: "avatarUrl",
    label: "Avatar URL",
    component: InputText,
    type: "text",
    grid: { cols: 6 },
  },
  {
    id: "payment_info",
    label: "Payment Info",
    component: InputText,
    type: "text",
    required: true,
    grid: { cols: 6 },
  },
];

const initialFormData = {
  username: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  avatarUrl: "",
  payment_info: "",
};

export default function ProfileForm({ user, loading, onSubmit }) {
  const [formData, setFormData] = useState(user ?? initialFormData);

  function handleChange(id, value) {
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  function renderAvatarPreview() {
    return (
      <div className="flex justify-content-center">
        <div className="w-full h-22rem border-1 border-round border-gray-300 p-3">
          {formData.avatarUrl ? (
            <Image
              src={formData.avatarUrl}
              alt="Avatar Preview"
              imageClassName="w-full h-full shadow-4 border-round-lg"
              width="100%"
              height="100%"
            />
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
            <ProfileFormField
              field={field}
              value={formData[field.id]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <SharedFieldset legend="User Profile Form">
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="col-9">{renderFormFields()}</div>
            <div className="col-3">{renderAvatarPreview()}</div>
          </div>
          <div className="flex justify-content-end mt-2">
            <SharedButton
              type="submit"
              label="Save Profile"
              icon="pi pi-save"
            />
          </div>
        </form>
      )}
    </SharedFieldset>
  );
}

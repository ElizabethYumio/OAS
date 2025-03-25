import { useEffect, useState } from "react";

import { mapDataToUser } from "@/common/utils";
import { showToast } from "@/common/toast.service";

import { getCurrentUser, updateCurrentUser } from "@/api/user.service";

import SharedCard from "../shared/card/card";
import ProfileForm from "./profile-form";

export default function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  function fetchUser() {
    setLoading(() => true);
    getCurrentUser().then((data) => {
      setUser(() => mapDataToUser(data));
      setLoading(() => false);
    });
  }

  function postUpdateUser(data) {
    updateCurrentUser(data).then((data) => {
      setUser(() => mapDataToUser(data));
      showToast({
        detail: `User updated!`,
      });
    });
  }

  function handleSubmit(data) {
    postUpdateUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <SharedCard backNav title="Profile">
      <ProfileForm
        user={user}
        loading={loading}
        onSubmit={handleSubmit}
      ></ProfileForm>
    </SharedCard>
  );
}

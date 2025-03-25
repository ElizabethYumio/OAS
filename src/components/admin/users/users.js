import { useEffect, useState } from "react";

import SharedCard from "../../shared/card/card";
import UserList from "./users-list";

import { getUser } from "@/api/user.service";
import { mapDataListByMapping } from "@/common/utils";

const userMapping = {
  id: "id",
  username: "username",
  avatar_url: "avatar_url",
  username: "username",
  created_date: "created_date",
  email: "email",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchUsers() {
    setLoading(() => true);
    getUser().then((data) => {
      setUsers(() => mapDataListByMapping(data, userMapping));
      setLoading(() => false);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SharedCard title="Users">
      <UserList users={users} loading={loading}></UserList>
    </SharedCard>
  );
}
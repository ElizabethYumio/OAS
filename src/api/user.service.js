import { API_PATHS, EMPTY_STRING, HTTP_METHODS } from "@/common/constants";
import { commonFetch } from "@/common/utils";
import { useLoginStore } from "@/stores/login";

export async function getCurrentUser() {
  const currentUserId = useLoginStore.getState().currentUser?.id;

  const path = `${API_PATHS.USER}/${currentUserId}`;
  return await commonFetch({ path });
}


export async function getUser() {
  
  const path = `${API_PATHS.USER}`;
  return await commonFetch({ path });
}


export async function deleteUser(userid) {
  
  const path = `${API_PATHS.USER}/${userid}`;
  return await commonFetch({ path, method: HTTP_METHODS.DELETE });
}

export async function updateCurrentUser({
  username,
  email,
  password,
  address,
  phone,
  avatarUrl,
  payment_info,
} = {}) {
  const currentUserId = useLoginStore.getState().currentUser?.id;

  const path = `${API_PATHS.USER}/${currentUserId}`;
  return await commonFetch({
    path,
    method: HTTP_METHODS.PUT,
    data: { username, email, password, address, phone, avatar_url: avatarUrl, payment_info },
  });
}

export async function createUser({
  username,
  email,
  password,
  address = EMPTY_STRING,
  phone = EMPTY_STRING,
  avatarUrl = EMPTY_STRING,
} = {}) {
  const path = `${API_PATHS.USER}`;
  return await commonFetch({
    path,
    method: HTTP_METHODS.POST,
    data: { username, email, password, address, phone, avatar_url: avatarUrl },
  });
}

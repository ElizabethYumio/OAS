import { commonFetch } from "@/common/utils";
import { HTTP_METHODS } from "@/common/constants";

const ADMIN_LOGIN_PATH = "admins/login";

export async function postLoginAdmin({ username, password } = {}) {
  return await commonFetch({
    path: ADMIN_LOGIN_PATH,
    method: HTTP_METHODS.POST,
    data: { username, password },
  });
}

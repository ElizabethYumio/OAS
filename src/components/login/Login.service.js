import { commonFetch } from "@/common/utils";
import { HTTP_METHODS } from "@/common/constants";

const USER_LOGIN_PATH = "user/login";

export async function postLoginUser({ username, password } = {}) {
  return await commonFetch({
    path: USER_LOGIN_PATH,
    method: HTTP_METHODS.POST,
    data: { username, password },
  });
}

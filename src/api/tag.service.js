import { API_PATHS } from "@/common/constants";
import { commonFetch } from "@/common/utils";

export async function getTags() {
  const path = `${API_PATHS.TAG}`;
  return await commonFetch({ path });
}

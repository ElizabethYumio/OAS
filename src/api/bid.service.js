import { API_PATHS, HTTP_METHODS } from "@/common/constants";
import { commonFetch } from "@/common/utils";
import { useLoginStore } from "@/stores/login";

export async function getBidsByCurrentUser() {
  const currentUserId = useLoginStore.getState().currentUser?.id;

  const searchParams = new URLSearchParams({
    buyer_id: currentUserId,
  });

  const path = `${API_PATHS.BID}?${searchParams.toString()}`;

  return await commonFetch({
    path,
  });
}

export async function postCreateBidForCurrentUser({ itemId, amount } = {}) {
  const currentUserId = useLoginStore.getState().currentUser?.id;

  const path = API_PATHS.BID;

  return await commonFetch({
    path,
    method: HTTP_METHODS.POST,
    data: {
      buyer_id: currentUserId,
      item_id: itemId,
      amount,
    },
  });
}

import {
  API_PATHS,
  HTTP_METHODS,
  ITEM_STATUS,
  MOMENT_DATE_FORMAT,
} from "@/common/constants";
import { commonFetch } from "@/common/utils";
import { useLoginStore } from "@/stores/login";
import moment from "moment";

const SEARCH_PARAM = {
  QUERY: "query",
  USERID: "user_id",
  TAGS: "tags",
  EXCLUDING_USERID: "excluding_user_id",
};

export async function getItems({ query = "" }) {
  const searchParams = new URLSearchParams();
  searchParams.set(SEARCH_PARAM.QUERY, query);

  const path = `${API_PATHS.ITEM}?${searchParams.toString()}`;
  return await commonFetch({ path });
}

export async function getItemsExcludingCurrentUser({
  query = "",
  tags = "",
} = {}) {
  const currentUserId = useLoginStore.getState().currentUser?.id;

  const searchParams = new URLSearchParams();
  searchParams.set(SEARCH_PARAM.QUERY, query);
  searchParams.set(SEARCH_PARAM.TAGS, tags);
  searchParams.set(SEARCH_PARAM.EXCLUDING_USERID, currentUserId);

  const path = `${API_PATHS.ITEM}?${searchParams.toString()}`;
  return await commonFetch({ path });
}

export async function getItemsByCurrentUser({ query = "", tags = "" }) {
  const currentUserId = useLoginStore.getState().currentUser?.id;

  const searchParams = new URLSearchParams();
  searchParams.set(SEARCH_PARAM.QUERY, query);
  searchParams.set(SEARCH_PARAM.TAGS, tags);
  searchParams.set(SEARCH_PARAM.USERID, currentUserId);

  const path = `${API_PATHS.ITEM}?${searchParams.toString()}`;
  return await commonFetch({ path });
}

export async function getItemById(id) {
  const path = `${API_PATHS.ITEM}/${id}`;
  return await commonFetch({ path });
}

export async function createItem({
  name,
  imageUrl,
  description,
  startPrice,
  endDate,
  step,
} = {}) {
  const user_id = useLoginStore.getState().currentUser?.id;
  const end_date = moment(endDate).format(
    MOMENT_DATE_FORMAT.YYYYMMDD_CONNECTOR
  );

  const path = `${API_PATHS.ITEM}`;

  return await commonFetch({
    path,
    method: HTTP_METHODS.POST,
    data: {
      name,
      image_url: imageUrl,
      description,
      start_price: startPrice,
      step,
      end_date,
      user_id,
      status: ITEM_STATUS.NEW,
    },
  });
}

export async function updateItem({
  id,
  name,
  imageUrl,
  description,
  startPrice,
  endDate,
  status = ITEM_STATUS.NEW,
} = {}) {
  const end_date = moment(endDate).format(
    MOMENT_DATE_FORMAT.YYYYMMDD_CONNECTOR
  );

  const path = `${API_PATHS.ITEM}/${id}`;

  return await commonFetch({
    path,
    method: HTTP_METHODS.PUT,
    data: {
      name,
      image_url: imageUrl,
      description,
      start_price: startPrice,
      end_date,
      status,
    },
  });
}

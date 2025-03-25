import { useLoginStore } from "@/stores/login";
import {
  HTTP_CONTENT_TYPES,
  ITEM_STATE,
  MOMENT_DATE_FORMAT,
} from "./constants";
import moment from "moment";

export async function commonFetch({
  path,
  method,
  data,
  contentType = HTTP_CONTENT_TYPES.APPLICATION_JSON,
} = {}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": contentType,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * Converts an object into a URLSearchParams instance.
 * @param {Object} params - The object to convert.
 * @returns {URLSearchParams} - The URLSearchParams instance.
 */
export function getUrlSearchParams(params) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  return searchParams;
}

export function formatVNCurrency(number) {
  if (isNaN(number)) {
    number = 0;
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0, // You can adjust the fraction digits based on the requirement
  }).format(number);
}

export function formatVNDate(date) {
  date = moment(date);
  return date?.format(MOMENT_DATE_FORMAT.DDMMYYYY_SLASH);
}

export function getItemState(item) {
  const currentUserId = useLoginStore.getState().currentUser.id;

  return currentUserId == item?.user?.id
    ? ITEM_STATE.FROM_CURRENT_USER
    : ITEM_STATE.NEUTRAL;
}

//#region Mapping functions
export function mapDataToItem(data) {
  return {
    ...data,
    imageUrl: data.image_url,
    startPrice: parseInt(data.start_price),
    step: parseInt(data.step),
    endDate: moment(data.end_date),
    createdDate: data.created_date,
    updatedDate: data.updated_date,
  };
}

export function mapDataListToItems(data) {
  return data.map((item) => mapDataToItem(item));
}

export function mapDataToUser(data) {
  return {
    ...data,
    avatarUrl: data.avatar_url,
    createdDate: data.created_date,
    updatedDate: data.updated_date,
  };
}

export function mapDataListToUsers(data) {
  return data.map((user) => mapDataToUser(user));
}

export function mapDataToTag(data) {
  return {
    ...data,
    primeColor: data.prime_color,
    createdDate: data.created_date,
    updatedDate: data.updated_date,
  };
}

export function mapDataListToTags(data) {
  return data.map((tag) => mapDataToTag(tag));
}
//#endregion

// Utility function to resolve nested properties like "bid.item.name"
function resolvePath(obj, path) {
  return path.split(".").reduce((prev, curr) => prev && prev[curr], obj);
}

export function mapDataByMapping(data, mappings) {
  const mappedItem = {};
  for (const [key, value] of Object.entries(mappings)) {
    mappedItem[key] = resolvePath(data, value);
  }
  return mappedItem;
}

export function mapDataListByMapping(data, mappings) {
  return data.map((row) => mapDataByMapping(row, mappings));
}

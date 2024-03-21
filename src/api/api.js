import { thunder } from "./axios";

export const getEntries = async () => {
  // 获取当前时间的时间戳（以毫秒为单位）
  const currentTimeStamp = new Date().getTime();

  // 计算30天前的时间戳
  const thirtyDaysAgoTimeStamp = currentTimeStamp - 30 * 24 * 60 * 60 * 1000;

  // 将时间戳转换为Unix时间戳（以秒为单位）
  const unixTimeStamp = Math.floor(thirtyDaysAgoTimeStamp / 1000);

  return await thunder.request({
    method: "get",
    url: `/v1/entries?order=published_at&direction=desc&published_after=${unixTimeStamp}&limit=0`,
  });
};

export const getFeeds = async () => {
  return await thunder.request({
    method: "get",
    url: "/v1/feeds",
  });
};

export const getCategories = async () => {
  return await thunder.request({
    method: "get",
    url: "/v1/categories",
  });
};

export const updateEntries = async (entryId, newStatus) => {
  return await thunder.request({
    method: "put",
    url: "/v1/entries",
    data: {
      entry_ids: [entryId],
      status: newStatus,
    },
  });
};

export const getCurrentUser = async () => {
  return await thunder.request({
    method: "get",
    url: `/v1/me`,
  });
};

export const markUserEntriesAsRead = async (userId) => {
  return await thunder.request({
    method: "put",
    url: `/v1/users/${userId}/mark-all-as-read`,
  });
};

export const markCategoryEntriesAsRead = async (categoryId) => {
  return await thunder.request({
    method: "put",
    url: `/v1/categories/${categoryId}/mark-all-as-read`,
  });
};

export const markFeedEntriesAsRead = async (id) => {
  return await thunder.request({
    method: "put",
    url: `/v1/feeds/${id}/mark-all-as-read`,
  });
};

export const toggleEntryBookmark = async (entry) => {
  return await thunder.request({
    method: "put",
    url: `/v1/entries/${entry.id}/bookmark`,
  });
};
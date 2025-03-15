import api from ".";

export const getOrders = async ({
  id = "692196525",
  page = 1,
  pageSize = 5,
}) => {
  return await api.get(
    `/orders?telegram_id=${id}&page=${page}&page_size=${pageSize}`
  );
};

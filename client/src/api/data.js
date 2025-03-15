import api from ".";

export const getData = async (id = "692196525") => {
  return await api.get(`/data?telegram_id=${id}`);
};

import api from ".";

export const getProfile = async (id = "692196525") => {
  return await api.get(`/profil?telegram_id=${id}`);
};

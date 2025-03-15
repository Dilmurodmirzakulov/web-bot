import api from ".";

export const createOrder = async (body) => {
  return await api.post(`/order-create`, body);
};

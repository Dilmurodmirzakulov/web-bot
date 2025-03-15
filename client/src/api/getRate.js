import api from ".";

export const getRate = async ({
  id = "692196525",
  from = "",
  to = "",
  city = 0,
  amount = 0,
}) => {
  return await api.get(
    `/rate?telegram_id=${id}&from_currency=${from}&to_currency=${to}&city=${city}&amount=${amount}`
  );
};

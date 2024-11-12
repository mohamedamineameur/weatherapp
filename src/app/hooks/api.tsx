import axios from "axios";

export const useApi = () => {
  const get = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  return { get };
};


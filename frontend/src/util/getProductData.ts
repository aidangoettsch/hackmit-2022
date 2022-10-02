import { ProductType } from "../types/product";
import axios from "axios";
export const getData = async (): Promise<ProductType[]> => {
  try {
    const response = await axios.get("/sample.json");
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};

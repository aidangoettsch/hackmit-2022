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

export const getCategoryNames = (): string[] => {
  return ["Produce", "Dairy", "Carbohydrate", "Meat", "Beverage"];
};

export const getCategoryItemsByCategoryName = async (
  category: string
): Promise<ProductType[]> => {
  try {
    const response = await axios.get("/sample.json");

    return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
};

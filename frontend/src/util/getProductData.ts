import { ExistingOrderType, OrderItem, ProductType } from "../types/product";
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

export const getCategoryNames = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    resolve(["Produce", "Dairy", "Carbohydrate", "Meat", "Beverage"]);
  });
};

export const getCategoryItemsByCategoryName = async (
  category: string,
  count: number = -1
): Promise<ProductType[]> => {
  try {
    const response = await axios.get("/sample.json");

    return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const getItemsBySearchTerm = async (
  searchTerm: string,
  count: number = -1
): Promise<ProductType[]> => {
  try {
    const response = await axios.get("/sample.json");

    return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const getOrders = async (): Promise<ExistingOrderType[]> => {
  try {
    // const response = await axios.get("/sample.json");
    // return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
};

export const pushNewOrder = async (items: OrderItem[]) => {
  try {
    // const response = await axios.post("/sample.json", items);
    // return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderStatus = async (
  id: string
): Promise<ExistingOrderType> => {
  // try {
  //   return {
  //
  //   }
  // } catch (error) {
  //   console.error(error);
  // }

  return {
    time: new Date().toLocaleTimeString(),
    status: 4,
    price: 3.99,
    users: [
      {
        name: "albhog",
        location: "halal burger",
        host: true,
      },
      {
        name: "alll!!!!",
        location: "bread",
        host: false,
      },
    ],
  };
};

/**
 *

---
GET
/category?key=string&view=integer

returns array of ProductType where category matches. length should be `view`, should be optional

---
GET
/search?key=value&view=integer

returns array of ProductType where search matches (search algorithm up 2 u)

---
GET
/orders

returns array of ExistingOrderType

---
POST
/orders
{
    "time": time,
    "items": items
}

adds order to orders
 */

export const getSustainableItems = async (
  query: string
): Promise<ProductType[]> => {
  try {
    const response = await axios.get("/sample.json");

    return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
};

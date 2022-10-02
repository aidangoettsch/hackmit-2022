import { ExistingOrderType, OrderItem, ProductType } from "../types/product";
import axios from "axios";
import departments from "./departments";
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
  return Object.values(departments).map(d => d.name)
};

export const getCategoryItemsByCategoryName = async (
  category: string,
  count: number = -1
): Promise<ProductType[]> => {
  try {
    const categorySlug = Object.entries(departments).find(([_, v]) => (v.name === category))!![0]
    const queryString = new URLSearchParams({ category: categorySlug, count: count.toString() })

    const response = await axios.get(`/api/category?${queryString}`);

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
    const queryString = new URLSearchParams({ key: searchTerm, count: count.toString() })

    const response = await axios.get(`/api/category?${queryString}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }

  return [];
};

// export const getOrders = async (): Promise<ExistingOrderType[]> => {
//   try {
//     // const response = await axios.get("/sample.json");
//     // return response.data;
//   } catch (error) {
//     console.error(error);
//   }
//
//   return [];
// };

export const pushNewOrder = async (time: string, user: string, location: string, items: OrderItem[]) : Promise<{
  userId: number,
  orderId: number,
}> => {
  try {
    const response = await axios.post("/api/orders", {
      time,
      user,
      location,
      items
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderStatus = async (id: string): Promise<ExistingOrderType> => {
  try {
    const response = await axios.get(`/api/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
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

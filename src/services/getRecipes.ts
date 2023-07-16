import axios from "axios";

export const getRecipes = async (page: number) => {
  try {
    const response = await axios(
      `https://api.punkapi.com/v2/beers?page=${page}`
    );

    if (response.data.length === 0) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

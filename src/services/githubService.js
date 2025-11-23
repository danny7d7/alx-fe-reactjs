import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`
    );
    return response.data;
  } catch (error) {
    // Re-throw the error so the component can handle it
    throw error;
  }
};

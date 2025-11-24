import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

/**
 * Fetches user data from the GitHub API for a given username
 * @param {string} username - The GitHub username to search for
 * @returns {Promise} A promise that resolves to the user data or rejects with an error
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Searches for GitHub users using the Search API with advanced criteria
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.query - Username or keyword to search
 * @param {string} searchParams.location - Location filter (e.g., "San Francisco")
 * @param {number} searchParams.minRepos - Minimum number of repositories
 * @param {number} searchParams.page - Page number (default: 1)
 * @param {number} searchParams.perPage - Results per page (default: 30, max: 100)
 * @returns {Promise} A promise that resolves to search results with pagination info
 */
export const searchUsers = async ({
  query,
  location = "",
  minRepos = "",
  page = 1,
  perPage = 30,
}) => {
  try {
    // Build the search query string
    let searchQuery = query.trim();

    // Add location qualifier if provided
    if (location.trim()) {
      searchQuery += ` location:"${location.trim()}"`;
    }

    // Add repository count qualifier if provided
    if (minRepos) {
      const repoCount = parseInt(minRepos);
      if (!isNaN(repoCount) && repoCount > 0) {
        searchQuery += ` repos:>=${repoCount}`;
      }
    }

    const response = await axios.get(`${GITHUB_API_BASE_URL}/search/users`, {
      params: {
        q: searchQuery,
        page: page,
        per_page: Math.min(perPage, 100), // GitHub API max is 100
      },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    // Extract pagination info from Link header
    const linkHeader = response.headers.link;
    let pagination = {
      hasNext: false,
      hasPrev: false,
      nextPage: null,
      prevPage: null,
      lastPage: null,
    };

    if (linkHeader) {
      const links = linkHeader.split(",").map((link) => link.trim());
      links.forEach((link) => {
        const [url, rel] = link.split(";");
        const cleanUrl = url.trim().slice(1, -1);
        const cleanRel = rel.trim().replace(/rel="(.+)"/, "$1");

        if (cleanRel === "next") {
          pagination.hasNext = true;
          const match = cleanUrl.match(/[?&]page=(\d+)/);
          if (match) pagination.nextPage = parseInt(match[1]);
        } else if (cleanRel === "prev") {
          pagination.hasPrev = true;
          const match = cleanUrl.match(/[?&]page=(\d+)/);
          if (match) pagination.prevPage = parseInt(match[1]);
        } else if (cleanRel === "last") {
          const match = cleanUrl.match(/[?&]page=(\d+)/);
          if (match) pagination.lastPage = parseInt(match[1]);
        }
      });
    }

    // Fetch detailed user data for each user in the results
    const users = response.data.items;
    const detailedUsers = await Promise.all(
      users.map(async (user) => {
        try {
          const userDetails = await axios.get(user.url, {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          });
          return userDetails.data;
        } catch (error) {
          // If fetching details fails, return basic user info
          return {
            ...user,
            location: null,
            public_repos: null,
            bio: null,
          };
        }
      })
    );

    return {
      users: detailedUsers,
      totalCount: response.data.total_count,
      pagination: {
        ...pagination,
        currentPage: page,
        perPage: Math.min(perPage, 100),
      },
    };
  } catch (error) {
    throw error;
  }
};

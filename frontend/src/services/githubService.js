import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  },
});

export const githubService = {
  async getProfile(username) {
    const { data } = await githubApi.get(`/users/${username}`);
    return data;
  },

  async getRepos(username) {
    const { data } = await githubApi.get(`/users/${username}/repos`, {
      params: { sort: 'updated', per_page: 20, type: 'owner' },
    });
    return data;
  },

  async getLanguages(username, repoName) {
    const { data } = await githubApi.get(`/repos/${username}/${repoName}/languages`);
    return data;
  },

  async getCommits(username, repoName) {
    const { data } = await githubApi.get(`/repos/${username}/${repoName}/commits`, {
      params: { per_page: 5 },
    });
    return data;
  },

  async getPinnedRepos(username) {
    // GitHub doesn't expose pinned repos via REST API; use placeholder data
    return null;
  },
};

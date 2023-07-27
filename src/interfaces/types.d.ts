export interface GithubUser {
  login: string;
  avatar_url: string;
  repos_url: string;
  score: number;
}

export interface GithubUserDetail {
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
}
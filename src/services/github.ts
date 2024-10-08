import { GithubGraphQLQuery, GithubUserEndpoint } from "@/constant/Github";

export const FetchGithub = async () => {
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  const res = await fetch(GithubUserEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GithubGraphQLQuery,
    }),
  });

  const status: number = res.status;
  const responseJson = await res.json();

  if (status > 400) {
    return { status, data: {} };
  }

  return { status, data: responseJson.data.user };
};

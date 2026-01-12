const GithubGraphQLQuery = `{
    user(login: "MuhammadMiftaa") {
      contributionsCollection {
        contributionCalendar {
          colors
          totalContributions
          months {
            firstDay
            name
            totalWeeks
          }
          weeks {
            contributionDays {
              color
              contributionCount
              date
            }
            firstDay
          }
        }
      }
    }
  }
`;

const GithubUserEndpoint = "https://api.github.com/graphql";

export const FetchGithub = async () => {
  const NEXT_PUBLIC_GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const res = await fetch(GithubUserEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_GITHUB_TOKEN}`,
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

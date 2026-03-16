import { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = process.env.GITHUB_TOKEN;
  const result = await fetch(GithubUserEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GithubGraphQLQuery,
    }),
  });

  const json = await result.json();
  res.json({ data: json.data?.user });
}

export const GithubGraphQLQuery = `{
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

export const GithubUserEndpoint = "https://api.github.com/graphql";

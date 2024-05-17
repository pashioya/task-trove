import { graphql } from '~/lib/graphql';

export const fetchMeQuery = graphql(`
  query fetchMe {
    me {
      id
      name
      email
      is_pending
    }
  }
`);

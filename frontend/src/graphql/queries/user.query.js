import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query GetAuthUsers {
    authUser {
      _id
      username
      name
      profilePicture
      gender
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      username
      profilePicture
      # relationships
      transactions {
        _id
        description
        amount
        category
        location
        paymentType
        date
      }
    }
  }
`;

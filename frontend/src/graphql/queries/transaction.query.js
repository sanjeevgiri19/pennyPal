import { gql } from "@apollo/client";

// All
export const GET_TRANSACTIONs = gql`
  query GetTransactions {
    transactions {
      _id
      paymentType
      description
      
      category
      amount
      date
      location
      user {
        _id
        name
        username
        profilePicture
      }
    }
  }
`;



// single/specific transaction
export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      paymentType
      description
      category
      amount
      date
      location
      user {
        _id
        name
        username
        profilePicture
      }
    }
  }
`;

// transaction statistics, for future use, if applied Types
// export const GET_TRANSACTION_STATISTICS = gql`
//   query GetTransactionStatistics {
//     categoryStatistics {
//       type
//       amount
//       category
//       description
//       date
//       paymentType
//     }
//   }
// `;


export const GET_TRANSACTION_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;

//relations
// export const GET_TRANSACTION_STATISTICS = gql`
//   query GetTransactionStatistics {
//     transactions {
//       _id
//       type
//       amount
//       category
//     }
//     categoryStatistics {
//       category
//       totalAmount
//     }
//   }
// `;

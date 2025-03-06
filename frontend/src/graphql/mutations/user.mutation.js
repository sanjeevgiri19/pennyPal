import { gql } from "@apollo/client";

 const SIGN_UP = gql`
  mutation SignUp($input: signUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;

 const LOGIN = gql`
   mutation Login($input: logInInput!) {
     login (input: $input) {
       _id
       name
       username
     }
   }
 `;

 const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

export { LOGIN, LOGOUT, SIGN_UP}
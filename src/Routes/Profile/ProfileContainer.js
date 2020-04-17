import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import ProfilePresenter from "./ProfilePresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useInput from "../../Hooks/useInput";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const EDIT_USER = gql`
  mutation editUser($username: String, $bio: String) {
    editUser(username: $username, bio: $bio) {
      username
      bio
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
export default withRouter(
  ({
    match: {
      params: { username },
    },
    history,
  }) => {
    const usernameI = useInput("");
    const bioI = useInput("");
    const { data, loading } = useQuery(GET_USER, {
      variables: { username },
    });
    const [logOut] = useMutation(LOG_OUT);
    const [editUserMuation] = useMutation(EDIT_USER, {
      variables: { username: usernameI.value, bio: bioI.value },
    });

    return (
      <ProfilePresenter
        loading={loading}
        logOut={logOut}
        history={history}
        data={data}
        editUserMuation={editUserMuation}
        bioI={bioI}
        usernameI={usernameI}
      />
    );
  }
);

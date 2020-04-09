import React from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 75vh;
`;

export default () => {
  const { data } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      {!data && <Loader />}
      {data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};

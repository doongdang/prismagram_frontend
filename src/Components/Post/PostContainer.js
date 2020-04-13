import React, { useState, useEffect, useCallback } from "react";
import Proptypes from "prop-types";
import { useMutation, useQuery } from "@apollo/react-hooks";

import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { ME } from "../../SharedQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location,
}) => {
  const [isLikedS, setisLikedS] = useState(isLiked);
  const [likeCountS, setlikeCountS] = useState(likeCount);
  const [currentItem, setcurrentItem] = useState(0);
  const [selfComments, setselfComments] = useState([]);
  const comment = useInput("");
  const { data: meQuery } = useQuery(ME);

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  const slide = useCallback(() => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setcurrentItem(0), 3000);
    } else {
      setTimeout(() => setcurrentItem(currentItem + 1), 3000);
    }
  }, [currentItem, files.length]);
  useEffect(() => {
    slide();
  }, [currentItem, slide]);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setisLikedS(false);
      setlikeCountS(likeCountS - 1);
    } else {
      setisLikedS(true);
      setlikeCountS(likeCountS + 1);
    }
  };

  const onKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
      comment.setValue("");
      addCommentMutation();
      e.preventDefault();
      setselfComments([
        ...selfComments,
        {
          id: Math.floor(Math.random() * 100),
          text: comment.value,
          user: { username: meQuery.me.username },
        },
      ]);
    }
    return;
  };

  return (
    <PostPresenter
      user={user}
      files={files}
      caption={caption}
      likeCount={likeCountS}
      location={location}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setisLikedS={setisLikedS}
      setlikeCountS={setlikeCountS}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyDown={onKeyDown}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: Proptypes.string.isRequired,
  user: Proptypes.shape({
    id: Proptypes.string.isRequired,
    avatar: Proptypes.string,
    username: Proptypes.string.isRequired,
  }).isRequired,
  files: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      url: Proptypes.string.isRequired,
    })
  ).isRequired,
  likeCount: Proptypes.number.isRequired,
  isLiked: Proptypes.bool.isRequired,
  comments: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string.isRequired,
      text: Proptypes.string.isRequired,
      user: Proptypes.shape({
        id: Proptypes.string.isRequired,
        username: Proptypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: Proptypes.string.isRequired,
  location: Proptypes.string,
  createdAt: Proptypes.string.isRequired,
};

export default PostContainer;

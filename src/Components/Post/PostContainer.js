import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";

import PostPresenter from "./PostPresenter";
import useInput from "../../Hooks/useInput";

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

  const comment = useInput("");

  useEffect(() => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setcurrentItem(0), 3000);
    } else {
      setTimeout(() => setcurrentItem(currentItem + 1), 3000);
    }
  }, [currentItem, files]);

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

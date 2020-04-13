import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setisFollowingS] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });
  const onClick = () => {
    if (isFollowingS === true) {
      setisFollowingS(false);
      try {
        unfollowMutation();
      } catch (error) {
        console.log(error);
        toast.error("Can`t Unfollow");
      }
    } else {
      setisFollowingS(true);
      try {
        followMutation();
      } catch (error) {
        console.log(error);
        toast.error("Can`t Follow");
      }
    }
  };

  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;

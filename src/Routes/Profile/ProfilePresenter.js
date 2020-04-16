import React, { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";
import { Pencil } from "../../Components/Icons";
import Input from "../../Components/Input";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  margin-bottom: 10px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Fullname = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const EditButton = styled.button`
  border: 0;
  background-color: inherit;
`;
const EditCancel = styled.button`
  width: 55px;
  border: ${(props) => props.theme.boxBorder};
  color: white;
  background-color: lightpink;
  text-align: center;
`;
const EditSave = styled.button`
  width: 55px;
  border: ${(props) => props.theme.boxBorder};
  background-color: lightgreen;
  color: white;
  text-align: center;
`;

export default ({
  loading,
  data,
  logOut,
  usernameI,
  bioI,

  editUserMuation,
}) => {
  const [editModeN, seteditModeN] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    if (usernameI !== "") {
      try {
        const {
          data: { editUser },
        } = await editUserMuation();

        if (!editUser) {
          toast.error("Can`t Change Username.");
        } else {
          toast.success("Username is Changed.");
        }
        console.log(usernameI.value);
        window.location.replace(`${usernameI.value}`);
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      }
    }
  };
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              {editModeN ? (
                <>
                  <Input placeholder={"New Username"} {...usernameI} />
                  <EditSave
                    onClick={(e) => {
                      onClick(e);
                    }}
                  >
                    {"Save"}
                  </EditSave>
                </>
              ) : (
                <Username>{username}</Username>
              )}

              {isSelf ? (
                <>
                  {editModeN ? (
                    <>
                      <EditCancel onClick={() => seteditModeN(false)}>
                        {"Cancel"}
                      </EditCancel>
                    </>
                  ) : (
                    <EditButton onClick={() => seteditModeN(true)}>
                      <Pencil size={20} />
                    </EditButton>
                  )}

                  <Button onClick={logOut} text="Log Out" />
                </>
              ) : (
                <FollowButton id={id} isFollowing={isFollowing} />
              )}
            </UsernameRow>

            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <Fullname text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
};

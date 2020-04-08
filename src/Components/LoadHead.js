import React from "react";
import styled from "styled-components";
import { HeartEmpty, Compass, User, Logo } from "./Icons";

const Input = styled.input`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.3;
    font-weight: 200;
  }
`;

const Header = styled.header`
  width: 100%;
  border: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const HeaderIcons = styled.a`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default () => {
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Logo />
        </HeaderColumn>
        <HeaderColumn>
          <form>
            <Input placeholder="Requesting from Server" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderIcons>
            <Compass />
          </HeaderIcons>
          <HeaderIcons>
            <HeartEmpty />
          </HeaderIcons>
          <HeaderIcons>
            <User />
          </HeaderIcons>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};

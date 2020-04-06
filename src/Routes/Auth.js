import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
`;

export default () => {
  const [action, setAction] = useState("LogIn");

  return (
    <Wrapper>
      {action === "LogIn" ? <Box>Log In</Box> : <Box>Sign Up</Box>}
    </Wrapper>
  );
};

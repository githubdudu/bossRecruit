import NavBar from "Components/NavBar";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled('div')`
  margin-top: 45px;
`;
function WithNavBar({ title="Loading", children, ...props }) {
  return (
    <>
      <NavBar {...props}>
        {title}
      </NavBar>
      <Container>
        {children}
      </Container>
    </>
  )
}

WithNavBar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}

export default WithNavBar;

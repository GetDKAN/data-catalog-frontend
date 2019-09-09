import styled from "styled-components";

export default styled.div`
  background-color: ${props => props.theme.navBarBackgroundColor};
  background-image: ${props => props.theme.navBarBackgroundImage};
  position: relative;
  display: block;
  clear: both;
  z-index: 1;
  &:after {
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    background: rgba(0, 0, 0, 0.2);
  }
  .navbar-expand-md {
    padding: 0;
  }
  .navbar-toggler {
    margin: .5rem 1rem;
  }
  .nav-item a {
    display: inline-flex;
    padding: 0.9em 1.2em;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    outline: 0;
    font-weight: 500;
    color: ${props => props.theme.navBarLink};
    transition: all 0.2s linear;

    &:hover {
      color: ${props => props.theme.navBarLink};
      text-decoration: none;
      background-color: ${props => props.theme.navBarLinkHoverBack};
    }
    &.active {
      background-color: none !important;
      box-shadow: inset 0 -4px 0 ${props => props.theme.navBarLinkActiveHoverBack};
      text-decoration: none;
      color: ${props => props.theme.navBarLink};
    }
    &:hover.active,
    &:focus.active {
      background-color: none !important;
      box-shadow: inset 0 -4px 0 ${props => props.theme.navBarLinkActiveHoverBack};
      color: ${props => props.theme.navBarLink};
    }
  }

  @media screen and (max-width: 768px) {
    .nav-item {
      display: block;
      width: 100%;
      a {
        display: block;
      }
    }
  }
`;

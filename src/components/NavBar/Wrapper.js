import styled from 'styled-components';

export default styled.div`
  &.base-styles {
    background-color: ${(props) => props.theme.navBarBackgroundColor};
    background-image: ${(props) => props.theme.navBarBackgroundImage};
    position: relative;
    display: block;
    clear: both;
    height: 90px;
    padding-top: 20px;
    z-index: 1;
  
  ul.navbar-nav {
    background: white;
    margin: 0;
  }
  .navbar-expand-md {
    padding: 0;
  }
  .navbar-toggler {
    margin: 0.5rem 1rem;
  }
  .nav-item a {
    display: inline-flex;
    padding: 0.9em 1.2em;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    font-weight: 400;
    font-size: 1.7rem;
    color: ${(props) => props.theme.navBarLink};

  }
  .navbar-brand {
    img {
      width: 150px;
      height: auto;
      margin-right: 20px;
    }
  }
  .collapse {
    border: none;
    &.show {
      border: 1px solid ${(props) => props.theme.borderColor};
      border-top: none;
    }
  }

  @media screen and (max-width: 767px) {
    .nav-item {
      display: block;
      width: 100%;
      a {
        display: block;
      }
    }
  }
}
`;

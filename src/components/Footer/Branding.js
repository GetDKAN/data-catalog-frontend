import styled from 'styled-components';

const Branding = styled.div`
  flex-grow: 2;
  max-width: 50%;
  h3 {
    font-weight: 500;
    font-size: 30px;
    margin: 20px 0 5px;
  }
  img {
    width: 150px;
    height: auto;
  }
  p {
    margin: 1em 2em 1em 0;
  }
  .social {
    margin: 1em 0;
    a {
      color: ${props => props.theme.linkHoverColor};
      &:hover,
      &:focus {
        color: ${props => props.theme.secondary};
      }
    }
    i {
      font-size: 25px;
      margin: 0 1em 1em 0;
    }
  }
`;

export default Branding;

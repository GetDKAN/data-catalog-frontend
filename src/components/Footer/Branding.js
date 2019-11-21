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
    i {
      font-size: 25px;
      opacity: 0.3;
      margin: 0 1em 1em 0;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default Branding;

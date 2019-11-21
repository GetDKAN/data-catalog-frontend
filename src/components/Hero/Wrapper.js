import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
  padding: 40px 0;
  display: flex;
  align-items: flex-start;
  align-content: stretch;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;

  .hero-title {
    color: white;
  }
  .block {
    position: relative;
    margin: auto;
    color: white;
    padding: 20px;
    min-width: 30%;
    max-width: 50%;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.5px;
    &.center {
      text-align: center;
    }
  }
  h1,
  h2 {
    margin-top: 0;
  }
  .btn-hero a {
    color: ${(props) => props.theme.primaryDark};
    &:hover,
    &:focus {
      color: ${(props) => props.theme.primaryDark};
      text-decoration: none;
    }
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export default Wrapper;

import styled from 'styled-components';
import defaultTheme from '../../theme/default';

const Wrapper = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-size: 790px;
  background-position: 70% 102%;
  background-color: ${defaultTheme.heroBackgroundColor};
  padding: 40px 0;
  height: 650px;

  .hero-title {
    color: white;
    font-size: 40px;
    font-family: 'IBM-Plex-Sans-bold', 'Helvetica Neue', Arial, sans-serif;
    font-weight: bold;
    text-align: left;
    line-height: 1.2;
    &.first {
      margin-top: 30px;
    }
  }

  form.hero-search {
    position: absolute;
    bottom: 110px;
    padding: 15px 30px 15px 30px;
    margin: auto;
    background-color: #0B3242;
    min-width: 600px;
    .form-group {
      padding-right: 75px;
    }
    input {
      border-radius: 0;
      border: none;
    }
    h2 {
      color: #ffffff;
      font-size: 25px;
      line-height: 1.2;
      margin-bottom: 16px;
    }
    button[type="submit"] {
      background: ${defaultTheme.heroBackgroundColor};
      color: #ffffff;
      border-radius: 0;
      border-color: transparent;
      width: 50px;
    }
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    form {
      min-width: 50%;
      max-width: 80%;
    }
  }
`;

export default Wrapper;

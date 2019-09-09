import styled from 'styled-components';

const H3 = styled.h3`
  background-color: ${props => props.theme.primaryDust};
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #323A45;
  letter-spacing: .5px;
  border: 1px solid ${props => props.theme.borderColor};
  padding: 13px 16px;
  margin: 0;
`;

export default H3;

import styled from 'styled-components';

const Wrapper = styled.div`
  .density-1 .rt-tbody .rt-td {
    padding: 21px 5px;
  }
  .density-2 .rt-tbody .rt-td {
    padding: 14px 5px;
  }
  .density-3 .rt-tbody .rt-td {
    padding: 5px 5px;
  }
  .-striped .rt-tr.-odd {
    background-color: rgba(0,0,0,.05);
  }
  .-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background-color: #FFFEEE;
  }
`;

export default Wrapper;

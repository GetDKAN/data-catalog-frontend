import styled from "styled-components";
import { Dialog } from "@cmsgov/design-system-core";

const StyledDialog = styled(Dialog)`
  &.ds-c-dialog {
    padding: 8px 0 0;
    width: 100%;
    z-index: 12;
  }
  .ds-c-dialog__close {
    background: none;
    padding-left: 0;
    text-decoration: none;
    &::before {
      font-family: fontAwesome !important;
      content: "\f00d";
      font-weight: 400;
      font-size: 22px;
      color: ${props => props.theme.textColor};
    }
    &:hover,
    &:focus {
      background: none;
    }
  }
  .dialog-title {
    font-size: 18px;
  }

  .ds-c-dialog__header {
    padding: 16px 24px;
  }
  .column-labels {
    background: ${props => props.theme.grayDust};
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
  }
  .ds-c-dialog__actions {
    margin: 0;
    padding: 8px 24px;
    display: flex;
    justify-content: flex-end;
    button {
      background: ${props => props.theme.primaryDark};
      color: white;
      border-radius: 25px;
      font-size: 14px;
    }
  }
`;

export default StyledDialog;

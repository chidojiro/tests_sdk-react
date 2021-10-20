import styled from "@emotion/styled";

import { Checkbox as AntdCheckbox } from "antd";

const Checkbox = styled(AntdCheckbox)`
  display: flex;
  align-items: center;
  width: 16px;
  height: 16px;

  .ant-checkbox {
    transform: translateY(-3px);
  }
`;

const Styled = { Checkbox };

export default Styled;

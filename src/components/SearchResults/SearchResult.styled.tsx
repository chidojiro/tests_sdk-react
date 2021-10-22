import styled from "@emotion/styled";
import { Pagination as AntdPagination, Tag as AntdTag } from "antd";

const Pagination = styled(AntdPagination)`
  .ant-pagination-total-text {
    margin-right: auto;
  }
`;

const Tag = styled(AntdTag)`
  display: flex;
  align-items: center;
`;

const Styled = { Pagination, Tag };

export default Styled;

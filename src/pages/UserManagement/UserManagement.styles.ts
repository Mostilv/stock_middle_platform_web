import styled from 'styled-components';
import { Card } from 'antd';
import {
  PageBody,
  PageContainer,
  PageHeader,
} from '../../components/PageLayout';

export const UserManagementContainer = styled(PageContainer)`
  gap: 16px;
`;

export const UserManagementHeader = styled(PageHeader)`
  width: 100%;

  .header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
    flex-wrap: wrap;
  }
`;

export const UserManagementBody = styled(PageBody)`
  padding-bottom: 8px;
`;

export const UserManagementCard = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: var(--page-panel-shadow);

  .ant-card-body {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .ant-btn {
    height: 32px;
  }
`;

export const SearchContainer = styled.div`
  .ant-input-search {
    width: 280px;
  }

  .ant-input-affix-wrapper {
    border-radius: 6px;
  }
`;

import styled from 'styled-components';
import { Button } from 'antd';
import {
  PageBody,
  PageContainer,
  PageHeader,
} from '../../components/PageLayout';

export const PortfolioContainer = styled(PageContainer)`
  gap: 16px;
`;

export const PortfolioContent = styled(PageBody)`
  padding-bottom: 8px;
`;

export const PortfolioHeader = styled(PageHeader)`
  width: 100%;

  .header-content {
    h1 {
      font-size: 18px;
      font-weight: 700;
      color: var(--app-text-primary);
      margin: 0;
    }

    span {
      font-size: 13px;
      color: var(--app-text-secondary);
    }
  }

  .header-actions {
    .ant-btn {
      height: 40px;
      padding: 0 24px;
    }
  }
`;

export const StatisticsRow = styled.div`
  margin-bottom: 24px;

  .ant-row {
    .ant-col {
      .ant-card {
        border-radius: 8px;
        box-shadow: var(--page-panel-shadow);
        border: 1px solid var(--app-border-color);
        transition: box-shadow 0.2s ease;
        height: 100%;

        &:hover {
          box-shadow: var(--page-panel-shadow);
        }

        .ant-card-body {
          padding: 16px;
        }

          .ant-statistic {
            .ant-statistic-title {
              font-size: 12px;
              margin-bottom: 8px;
              color: var(--app-text-secondary);
            }

            .ant-statistic-content {
              font-size: 18px;
              font-weight: 600;
          }
        }
      }
    }
  }
`;

export const PortfolioCard = styled.div`
  background: var(--app-surface);
  border-radius: 8px;
  box-shadow: var(--page-panel-shadow);
  border: 1px solid var(--app-border-color);
  overflow: hidden;

  .ant-table-wrapper {
    .ant-table {
      .ant-table-thead > tr > th {
        background-color: #fafafa;
        font-weight: 600;
      }
    }
  }
`;

export const ActionTag = styled.span<{ $action: 'buy' | 'sell' | 'hold' }>`
  &.ant-tag {
    background-color: ${props => {
      switch (props.$action) {
        case 'buy':
          return '#f6ffed';
        case 'sell':
          return '#fff2f0';
        case 'hold':
          return '#e6f7ff';
        default:
          return '#f0f0f0';
      }
    }};
    border-color: ${props => {
      switch (props.$action) {
        case 'buy':
          return '#b7eb8f';
        case 'sell':
          return '#ffccc7';
        case 'hold':
          return '#91d5ff';
        default:
          return '#d9d9d9';
      }
    }};
    color: ${props => {
      switch (props.$action) {
        case 'buy':
          return '#52c41a';
        case 'sell':
          return '#ff4d4f';
        case 'hold':
          return '#1890ff';
        default:
          return '#666';
      }
    }};
  }
`;

export const StatusTag = styled.span<{
  $status: 'pending' | 'completed' | 'cancelled';
}>`
  &.ant-tag {
    background-color: ${props => {
      switch (props.$status) {
        case 'completed':
          return '#f6ffed';
        case 'pending':
          return '#fff7e6';
        case 'cancelled':
          return '#fff2f0';
        default:
          return '#f0f0f0';
      }
    }};
    border-color: ${props => {
      switch (props.$status) {
        case 'completed':
          return '#b7eb8f';
        case 'pending':
          return '#ffd591';
        case 'cancelled':
          return '#ffccc7';
        default:
          return '#d9d9d9';
      }
    }};
    color: ${props => {
      switch (props.$status) {
        case 'completed':
          return '#52c41a';
        case 'pending':
          return '#fa8c16';
        case 'cancelled':
          return '#ff4d4f';
        default:
          return '#666';
      }
    }};
  }
`;

export const ActionButton = styled.button`
  &.ant-btn-text {
    padding: 4px 8px;
    height: auto;
    border: none;
    background: transparent;

    &:hover {
      background-color: #f0f0f0;
    }

    &:disabled {
      color: #d9d9d9;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }
`;

export const FormInput = styled.div`
  .form-input-full-width {
    width: 100%;
  }
`;

export const ClickableButton = styled(Button)`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }
`;

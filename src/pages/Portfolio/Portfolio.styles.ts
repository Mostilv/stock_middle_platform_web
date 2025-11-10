import styled from 'styled-components';
import { Button } from 'antd';

export const PortfolioContainer = styled.div`
  padding: 16px;
  background: #f5f5f5;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const PortfolioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .header-content {
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #666;
      margin: 0;
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.2s ease;
          height: 100%;

          &:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

        .ant-card-body {
          padding: 16px;
        }

        .ant-statistic {
          .ant-statistic-title {
            font-size: 12px;
            margin-bottom: 8px;
            color: #666;
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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

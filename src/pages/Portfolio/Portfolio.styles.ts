import styled from 'styled-components';

export const PortfolioContainer = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const PortfolioHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .header-content {
    h1 {
      font-size: 2rem;
      font-weight: bold;
      color: #1890ff;
      margin-bottom: 8px;
    }

    p {
      font-size: 1rem;
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
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

export const StatusTag = styled.span<{ $status: 'pending' | 'completed' | 'cancelled' }>`
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

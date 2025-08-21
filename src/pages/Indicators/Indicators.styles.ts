import styled from 'styled-components';

export const IndicatorsContainer = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const IndicatorsHeader = styled.div`
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

export const IndicatorsCard = styled.div`
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

export const ActionButton = styled.button`
  &.ant-btn-text {
    padding: 4px 8px;
    height: auto;
    border: none;
    background: transparent;
    
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const StatusTag = styled.span<{ $status: 'active' | 'inactive' }>`
  &.ant-tag {
    background-color: ${props => props.$status === 'active' ? '#f6ffed' : '#fff2f0'};
    border-color: ${props => props.$status === 'active' ? '#b7eb8f' : '#ffccc7'};
    color: ${props => props.$status === 'active' ? '#52c41a' : '#ff4d4f'};
  }
`;

export const TypeTag = styled.span<{ $type: string }>`
  &.ant-tag {
    background-color: ${props => {
      switch (props.$type) {
        case '技术指标':
          return '#e6f7ff';
        case '自定义':
          return '#f6ffed';
        case '基本面':
          return '#fff7e6';
        default:
          return '#f0f0f0';
      }
    }};
    border-color: ${props => {
      switch (props.$type) {
        case '技术指标':
          return '#91d5ff';
        case '自定义':
          return '#b7eb8f';
        case '基本面':
          return '#ffd591';
        default:
          return '#d9d9d9';
      }
    }};
    color: ${props => {
      switch (props.$type) {
        case '技术指标':
          return '#1890ff';
        case '自定义':
          return '#52c41a';
        case '基本面':
          return '#fa8c16';
        default:
          return '#666';
      }
    }};
  }
`;

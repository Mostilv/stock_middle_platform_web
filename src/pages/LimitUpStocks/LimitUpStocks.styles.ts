import styled from 'styled-components';

export const LimitUpStocksContainer = styled.div`
  padding: 16px;
  background: #f5f5f5;
  height: 100vh;
  overflow: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

export const LimitUpStocksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .date-info {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }

    .display-option {
      font-size: 14px;
      color: #666;
    }
  }

  .header-right {
    .ant-checkbox-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
  }
`;

export const SectorFilterBar = styled.div`
  display: flex;
  background: #fff2f0;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  overflow-x: auto;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .sector-header {
    font-weight: 600;
    color: #333;
    min-width: 80px;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }

  .sector-tag {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 12px;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 80px;
    border: 1px solid #e8e8e8;

    &:hover {
      background: #f0f0f0;
    }

    &.selected {
      background: #1890ff;
      color: white;
      border-color: #1890ff;
    }

    .sector-count {
      font-size: 12px;
      color: #666;
      margin-bottom: 2px;
    }

    .sector-name {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .sector-value {
      font-size: 12px;
      color: #999;
    }

    &.selected .sector-count,
    &.selected .sector-value {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

export const LadderTable = styled.div`
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;

  .table-header {
    display: flex;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;

    .header-cell {
      padding: 12px 8px;
      font-weight: 600;
      font-size: 14px;
      color: #333;
      text-align: center;
      border-right: 1px solid #e8e8e8;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.sector-header {
        flex: 1;
        min-width: 120px;
      }
    }
  }

  .table-body {
    .ladder-row {
      display: flex;
      border-bottom: 1px solid #e8e8e8;

      &:last-child {
        border-bottom: none;
      }

      .ladder-level {
        padding: 12px 8px;
        background: #fafafa;
        border-right: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;

        .level-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;

          .level-number {
            font-size: 16px;
            font-weight: 600;
            color: #333;
          }

          .level-count {
            font-size: 12px;
            color: #666;
          }
        }
      }

      .sector-column {
        flex: 1;
        min-width: 120px;
        border-right: 1px solid #e8e8e8;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        &:last-child {
          border-right: none;
        }
      }
    }
  }
`;

export const StockCell = styled.div`
  background: #f8f9fa;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 12px;
  line-height: 1.4;

  .stock-time {
    color: #666;
    font-weight: 500;
  }

  .stock-name {
    color: #333;
    font-weight: 600;
    margin: 2px 0;
  }

  .stock-price {
    color: #1890ff;
    font-weight: 600;
  }

  .stock-change {
    color: #52c41a;
    font-weight: 500;
  }

  .stock-volume {
    color: #666;
    font-size: 11px;
  }

  .stock-ratio {
    color: #999;
    font-size: 11px;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 24px;

  .ant-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const StatsGrid = styled.div`
  margin-bottom: 24px;

  .ant-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
`;

export const LimitUpStocksCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ClickableButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #1890ff;

  &:hover {
    background-color: #e6f7ff;
  }
`;

export const StatusTag = styled.span<{
  $status: 'active' | 'cooling' | 'ended';
}>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$status) {
      case 'active':
        return '#f6ffed';
      case 'cooling':
        return '#fff7e6';
      case 'ended':
        return '#fff2f0';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'active':
        return '#52c41a';
      case 'cooling':
        return '#fa8c16';
      case 'ended':
        return '#ff4d4f';
      default:
        return '#666';
    }
  }};
  border: 1px solid
    ${props => {
      switch (props.$status) {
        case 'active':
          return '#b7eb8f';
        case 'cooling':
          return '#ffd591';
        case 'ended':
          return '#ffccc7';
        default:
          return '#d9d9d9';
      }
    }};
`;

export const ConceptTag = styled.span`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  background-color: #e6f7ff;
  color: #1890ff;
  border: 1px solid #91d5ff;
  margin-right: 4px;
  margin-bottom: 4px;
`;

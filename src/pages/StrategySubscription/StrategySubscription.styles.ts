import styled from 'styled-components';

export const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-height: 0;
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const CardPanel = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

export const PanelBody = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .strategy-table {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .strategy-table .ant-spin-nested-loading,
  .strategy-table .ant-spin-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .ant-table-wrapper,
  .ant-table,
  .ant-table-container,
  .ant-table-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-height: 0;
  }

  .ant-table-body {
    flex: 1;
    overflow: auto;
    height: 100%;
    min-height: 0;
  }

  .strategy-table .ant-table-pagination {
    margin-top: auto;
    align-self: flex-end;
  }

  .blacklist-body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .blacklist-tags {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 8px;
    overflow: auto;
  }
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #0f172a;

  .muted {
    color: #64748b;
    font-weight: 400;
  }
`;

export const ChannelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: #94a3b8;
  border: 1px dashed #e2e8f0;
  border-radius: 10px;
`;

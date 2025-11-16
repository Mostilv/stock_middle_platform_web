import styled from 'styled-components';

export const PageContainer = styled.div`
  --page-panel-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  height: 100vh;
  min-height: 100vh;
  padding: 16px 24px 24px;
  background: #f4f6fb;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const PageHeader = styled.div`
  min-height: 60px;
  background: #ffffff;
  border-radius: 12px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--page-panel-shadow);
  border: 1px solid rgba(15, 23, 42, 0.08);
  flex-wrap: wrap;
`;

export const PageTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PageHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-left: auto;
  justify-content: flex-end;
`;

export const PageBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 4px;
  border-radius: 8px;
`;

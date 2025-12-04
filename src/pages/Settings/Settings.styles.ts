import styled from 'styled-components';
import { Button } from 'antd';
import {
  PageBody,
  PageContainer,
  PageHeader,
} from '../../components/PageLayout';

export const SettingsContainer = styled(PageContainer)`
  gap: 16px;
`;

export const SettingsContent = styled(PageBody)`
  padding: 8px 0 16px;
  margin: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  border: none;
  overflow-x: visible;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SettingsHeader = styled(PageHeader)`
  width: 100%;

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
`;

export const SettingsCard = styled.div`
  margin-bottom: 24px;

  .ant-card {
    border-radius: 8px;
    box-shadow: var(
      --page-panel-shadow,
      0 10px 24px rgba(15, 23, 42, 0.08),
      0 1px 3px rgba(15, 23, 42, 0.05)
    );
    border: 1px solid var(--app-border-color);
    background: var(--app-surface);

    .ant-card-head {
      border-bottom: 1px solid var(--app-border-color);

      .ant-card-head-title {
        font-weight: 600;
        color: var(--app-text-primary);
      }
    }

    .ant-card-body {
      padding: 24px;
    }
  }
`;

export const AccountCard = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 20px 24px;
  border-radius: 10px;
  background: var(--app-surface);
  color: var(--app-text-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid var(--app-border-color);
  box-shadow: var(
    --page-panel-shadow,
    0 10px 24px rgba(15, 23, 42, 0.08),
    0 1px 3px rgba(15, 23, 42, 0.05)
  );

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--app-text-primary);
  }

  p {
    margin: 4px 0 0;
    color: var(--app-text-secondary);
  }
`;

export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AccountActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  .ant-btn {
    border-radius: 999px;
    height: 36px;
    padding: 0 18px;
    font-weight: 500;
  }
`;

export const SettingsForm = styled.div`
  .ant-form {
    .ant-form-item {
      margin-bottom: 16px;
    }

    .ant-form-item-label {
      label {
        font-weight: 500;
        color: var(--app-text-primary);
      }
    }

    .ant-input,
    .ant-select-selector,
    .ant-input-number {
      border-radius: 6px;
      border: 1px solid var(--app-border-color);

      &:hover {
        border-color: #40a9ff;
      }

      &:focus,
      &.ant-input-focused,
      &.ant-select-focused .ant-select-selector {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
    }

    .ant-switch {
      &.ant-switch-checked {
        background-color: #1890ff;
      }
    }
  }
`;

export const FormInput = styled.div`
  .form-input-full-width {
    width: 100%;
  }
`;

export const SettingsActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  .ant-btn {
    height: 40px;
    padding: 0 24px;
    border-radius: 6px;

    &.ant-btn-primary {
      background-color: #1890ff;
      border-color: #1890ff;

      &:hover {
        background-color: #40a9ff;
        border-color: #40a9ff;
      }
    }
  }
`;

export const CardIcon = styled.span`
  margin-right: 8px;
  color: #1890ff;
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

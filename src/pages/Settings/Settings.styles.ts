import styled from 'styled-components';
import { Button } from 'antd';

export const SettingsContainer = styled.div`
  padding: 16px;
  background: #f5f5f5;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-radius: 6px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

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
`;

export const SettingsCard = styled.div`
  &.ant-card {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;

    .ant-card-head {
      border-bottom: 1px solid #f0f0f0;
      
      .ant-card-head-title {
        font-weight: 600;
        color: #333;
      }
    }

    .ant-card-body {
      padding: 24px;
    }
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
        color: #333;
      }
    }

    .ant-input,
    .ant-select-selector,
    .ant-input-number {
      border-radius: 6px;
      border: 1px solid #d9d9d9;
      
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

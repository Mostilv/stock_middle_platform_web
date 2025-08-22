import styled from 'styled-components';
import { Button } from 'antd';

export const SettingsContainer = styled.div`
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const SettingsHeader = styled.div`
  margin-bottom: 24px;

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

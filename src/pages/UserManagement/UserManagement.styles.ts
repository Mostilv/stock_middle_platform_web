import styled from 'styled-components';
import { Card } from 'antd';

export const UserManagementContainer = styled.div`
  padding: 0;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const UserManagementHeader = styled.div`
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  padding: 24px 32px;
  border-bottom: 1px solid #303030;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const UserManagementCard = styled(Card)`
  margin: 24px;
  height: calc(100vh - 140px);
  background: #1f1f1f;
  border: 1px solid #303030;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  .ant-card-body {
    padding: 24px;
    height: 100%;
    overflow: auto;
  }

  .ant-table {
    background: transparent;
    
    .ant-table-thead > tr > th {
      background: #262626;
      border-bottom: 1px solid #303030;
      color: #fff;
      font-weight: 600;
    }

    .ant-table-tbody > tr > td {
      background: #1f1f1f;
      border-bottom: 1px solid #303030;
      color: #fff;
    }

    .ant-table-tbody > tr:hover > td {
      background: #262626 !important;
    }

    .ant-table-pagination {
      .ant-pagination-item {
        background: #262626;
        border-color: #303030;
        
        a {
          color: #fff;
        }
        
        &:hover {
          border-color: #1890ff;
          
          a {
            color: #1890ff;
          }
        }
        
        &.ant-pagination-item-active {
          background: #1890ff;
          border-color: #1890ff;
          
          a {
            color: #fff;
          }
        }
      }
      
      .ant-pagination-prev,
      .ant-pagination-next {
        .ant-pagination-item-link {
          background: #262626;
          border-color: #303030;
          color: #fff;
          
          &:hover {
            border-color: #1890ff;
            color: #1890ff;
          }
        }
      }
      
      .ant-pagination-options {
        .ant-select {
          .ant-select-selector {
            background: #262626;
            border-color: #303030;
            color: #fff;
          }
        }
      }
      
      .ant-pagination-total-text {
        color: #fff;
      }
    }
  }

  .ant-modal {
    .ant-modal-content {
      background: #1f1f1f;
      border: 1px solid #303030;
    }
    
    .ant-modal-header {
      background: #1f1f1f;
      border-bottom: 1px solid #303030;
      
      .ant-modal-title {
        color: #fff;
      }
    }
    
    .ant-modal-body {
      background: #1f1f1f;
      
      .ant-form-item-label > label {
        color: #fff;
      }
      
      .ant-input,
      .ant-input-password {
        background: #262626;
        border-color: #303030;
        color: #fff;
        
        &:hover {
          border-color: #1890ff;
        }
        
        &:focus {
          border-color: #1890ff;
          box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
      }
      
      .ant-switch {
        &.ant-switch-checked {
          background: #1890ff;
        }
      }
    }
  }
`;

export const UserActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const SearchContainer = styled.div`
  .ant-input-search {
    .ant-input {
      background: #262626;
      border-color: #303030;
      color: #fff;
      
      &:hover {
        border-color: #1890ff;
      }
      
      &:focus {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
      
      &::placeholder {
        color: #666;
      }
    }
    
    .ant-input-search-button {
      background: #1890ff;
      border-color: #1890ff;
      
      &:hover {
        background: #40a9ff;
        border-color: #40a9ff;
      }
    }
    
    .ant-input-prefix {
      color: #666;
    }
  }
`;

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .ant-avatar {
    background: #1890ff;
  }
  
  .user-info {
    .username {
      font-weight: 500;
      color: #fff;
      margin-bottom: 2px;
    }
    
    .full-name {
      font-size: 12px;
      color: #999;
    }
  }
`;

export const StatusTag = styled.div`
  .ant-tag {
    border-radius: 4px;
    font-weight: 500;
    
    &.status-active {
      background: #f6ffed;
      border-color: #b7eb8f;
      color: #52c41a;
    }
    
    &.status-inactive {
      background: #fff2f0;
      border-color: #ffccc7;
      color: #ff4d4f;
    }
    
    &.role-admin {
      background: #fffbe6;
      border-color: #ffe58f;
      color: #faad14;
    }
    
    &.role-user {
      background: #f0f5ff;
      border-color: #adc6ff;
      color: #1890ff;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    
    .ant-btn {
      width: 100%;
    }
  }

  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.ant-btn-text {
      color: #fff;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      &.ant-btn-dangerous {
        color: #ff4d4f;
        
        &:hover {
          background: rgba(255, 77, 79, 0.1);
        }
      }
    }
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    margin-bottom: 16px;
  }
`;
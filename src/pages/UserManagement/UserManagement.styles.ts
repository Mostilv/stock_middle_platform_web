import styled from 'styled-components';
import { Card } from 'antd';

export const UserManagementContainer = styled.div`
  min-height: 100vh;
  padding: 24px 32px;
  background: linear-gradient(135deg, #f8fbff 0%, #e8f0ff 100%);
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const UserManagementHeader = styled.div`
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.18) 0%,
    rgba(147, 197, 253, 0.4) 100%
  );
  padding: 24px 32px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.1);
  color: #0f172a;
  margin-bottom: 16px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: inherit;
  }
`;

export const UserManagementCard = styled(Card)`
  margin: 0;
  height: calc(100vh - 140px);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 25px 55px rgba(15, 23, 42, 0.12);
  overflow: hidden;

  .ant-card-body {
    padding: 24px;
    height: 100%;
    overflow: auto;
  }

  .ant-table {
    background: transparent;
    
    .ant-table-thead > tr > th {
      background: #f7faff;
      border-bottom: 1px solid #e2e8f0;
      color: #1f2937;
      font-weight: 600;
    }

    .ant-table-tbody > tr > td {
      background: #ffffff;
      border-bottom: 1px solid #eef2f7;
      color: #334155;
    }

    .ant-table-tbody > tr:hover > td {
      background: #eef5ff !important;
    }

    .ant-table-pagination {
      .ant-pagination-item {
        background: #ffffff;
        border-color: #e2e8f0;
        
        a {
          color: #475569;
        }
        
        &:hover {
          border-color: #4096ff;
          
          a {
            color: #1677ff;
          }
        }
        
        &.ant-pagination-item-active {
          background: #1677ff;
          border-color: #1677ff;
          
          a {
            color: #fff;
          }
        }
      }
      
      .ant-pagination-prev,
      .ant-pagination-next {
        .ant-pagination-item-link {
          background: #ffffff;
          border-color: #e2e8f0;
          color: #64748b;
          
          &:hover {
            border-color: #4096ff;
            color: #1677ff;
          }
        }
      }
      
      .ant-pagination-options {
        .ant-select {
          .ant-select-selector {
            background: #ffffff;
            border-color: #e2e8f0;
            color: #0f172a;
          }
        }
      }
      
      .ant-pagination-total-text {
        color: #94a3b8;
      }
    }
  }

  .ant-modal {
    .ant-modal-content {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 30px 80px rgba(15, 23, 42, 0.2);
    }
    
    .ant-modal-header {
      background: #f7faff;
      border-bottom: 1px solid #e2e8f0;
      
      .ant-modal-title {
        color: #0f172a;
      }
    }
    
    .ant-modal-body {
      background: #ffffff;
      
      .ant-form-item-label > label {
        color: #1f2937;
      }
      
      .ant-input,
      .ant-input-password {
        background: #ffffff;
        border-color: #d7e3ff;
        color: #0f172a;
        
        &:hover {
          border-color: #7aa2ff;
        }
        
        &:focus {
          border-color: #2b7cff;
          box-shadow: 0 0 0 2px rgba(43, 124, 255, 0.18);
        }
      }
      
      .ant-switch {
        background: #cbd5f5;

        &.ant-switch-checked {
          background: #2b7cff;
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
      background: #ffffff;
      border-color: #d7e3ff;
      color: #0f172a;
      
      &:hover {
        border-color: #7aa2ff;
      }
      
      &:focus {
        border-color: #2b7cff;
        box-shadow: 0 0 0 2px rgba(43, 124, 255, 0.18);
      }
      
      &::placeholder {
        color: #94a3b8;
      }
    }
    
    .ant-input-search-button {
      background: #2b7cff;
      border-color: #2b7cff;
      
      &:hover {
        background: #5c9dff;
        border-color: #5c9dff;
      }
    }
    
    .ant-input-prefix {
      color: #94a3b8;
    }
  }
`;

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .ant-avatar {
    background: linear-gradient(135deg, #93c5fd, #3b82f6);
  }
  
  .user-info {
    .username {
      font-weight: 500;
      color: #0f172a;
      margin-bottom: 2px;
    }
    
    .full-name {
      font-size: 12px;
      color: #94a3b8;
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
      color: #475569;
      
      &:hover {
        background: rgba(59, 130, 246, 0.1);
      }
      
      &.ant-btn-dangerous {
        color: #e11d48;
        
        &:hover {
          background: rgba(225, 29, 72, 0.1);
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

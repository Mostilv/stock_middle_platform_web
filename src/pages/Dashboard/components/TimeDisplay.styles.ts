import styled from 'styled-components';

export const TimeDisplayContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 8px 12px 0 12px;
  z-index: 1;

  span {
    color: #e6f7ff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #1890ff;
    }
  }

  .ant-picker {
    background: rgba(0, 0, 0, 0.3) !important;
    border: 1px solid #1890ff !important;
    
    .ant-picker-input > input {
      color: #e6f7ff !important;
    }
    
    .ant-picker-suffix {
      color: #1890ff !important;
    }
  }

  /* 隐藏触发器，仅显示弹层面板 */
  .hidden-picker {
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }
`;

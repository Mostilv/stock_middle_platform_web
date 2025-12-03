import styled from 'styled-components';

export const LoginPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 32px 16px 48px;
  box-sizing: border-box;
  background: radial-gradient(circle at 20% 20%, #ffffff, #f1f5f9);
`;

export const Panel = styled.div`
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 35px 70px rgba(15, 23, 42, 0.15);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #0f172a;

  .login-error {
    margin-bottom: 8px;
  }

  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-input-affix-wrapper,
  .ant-input {
    border-radius: 10px;
  }

  .ant-btn-primary {
    border-radius: 10px;
    font-weight: 600;
    background: linear-gradient(120deg, #2563eb, #0ea5e9);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
  }

  .quick-fill {
    border-top: 1px dashed rgba(148, 163, 184, 0.5);
    padding-top: 16px;

    .badges {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 8px;

      button {
        border: 1px solid rgba(148, 163, 184, 0.6);
        border-radius: 10px;
        padding: 6px 12px;
        background: #f8fafc;
        color: #0f172a;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: #e0f2ff;
          border-color: #3b82f6;
        }
      }

      button:focus {
        outline: none;
      }
    }
  }
`;

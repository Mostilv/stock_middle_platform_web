import styled from 'styled-components';

export const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 4px 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const Panel = styled.div`
  width: 100%;
  max-width: 980px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.08);
  color: #0f172a;
`;

export const PanelBody = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Hero = styled.div`
  grid-column: span 3;
  background: linear-gradient(145deg, #1f2a44, #111827);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);

  h1 {
    margin: 0;
    color: #f8fafc;
    font-size: 26px;
    letter-spacing: 0.3px;
  }

  p {
    margin: 0;
    color: #cbd5e1;
    line-height: 1.6;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: rgba(59, 130, 246, 0.15);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: 999px;
    color: #bfdbfe;
    font-size: 13px;
    width: fit-content;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;

    span {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      color: #e5e7eb;
      cursor: pointer;
    }
  }
`;

export const FormCard = styled.div`
  grid-column: span 2;
  background: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .ant-form-item {
    margin-bottom: 16px;
  }

  .ant-btn-primary {
    background: linear-gradient(120deg, #2563eb, #0ea5e9);
  }
`;

import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { TimeDisplayContainer } from './TimeDisplay.styles';

interface TimeDisplayProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const TimeDisplay: React.FC<TimeDisplayProps> = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <TimeDisplayContainer>
      <Space>
        <ClockCircleOutlined style={{ color: '#1890ff' }} />
        <span>{formatTime(currentTime)}</span>
      </Space>
    </TimeDisplayContainer>
  );
};

export default TimeDisplay;

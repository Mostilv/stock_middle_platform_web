import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { TimeDisplayContainer } from './TimeDisplay.styles';

interface TimeDisplayProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const handleTimeClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date: any) => {
    if (date) {
      onDateChange(date.toDate());
    } else {
      onDateChange(null);
    }
    setShowDatePicker(false);
  };

  // 显示的时间：如果选择了日期就显示选择的日期，否则显示实时时间
  const displayTime = selectedDate || currentTime;

  return (
    <TimeDisplayContainer>
      <Space>
        <ClockCircleOutlined style={{ color: '#1890ff' }} />
        <span onClick={handleTimeClick}>{formatTime(displayTime)}</span>
      </Space>
      {showDatePicker && (
        <DatePicker
          autoFocus
          open={showDatePicker}
          onOpenChange={open => setShowDatePicker(open)}
          getPopupContainer={trigger => trigger.parentElement as HTMLElement}
          onChange={handleDateChange}
          allowClear={true}
          placeholder='选择日期时间'
          disabledDate={current => {
            // 限制只能选择30天前至今天的数据
            const today = dayjs();
            const thirtyDaysAgo = dayjs().subtract(30, 'days');

            return (
              current &&
              (current.isAfter(today) || current.isBefore(thirtyDaysAgo))
            );
          }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid #1890ff',
            color: '#e6f7ff',
          }}
        />
      )}
    </TimeDisplayContainer>
  );
};

export default TimeDisplay;

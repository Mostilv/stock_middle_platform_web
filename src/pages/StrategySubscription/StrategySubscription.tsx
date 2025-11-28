import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Space,
  Statistic,
  Switch,
  Table,
  Tag,
  Typography,
  message,
  type CheckboxValueType,
  type ColumnsType,
} from 'antd';
import {
  ThunderboltOutlined,
  BellOutlined,
  SyncOutlined,
  RadarChartOutlined,
  AimOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {
  PageBody,
  PageContainer,
  PageHeader,
  PageHeaderActions,
  PageTitle,
} from '../../components/PageLayout';
import {
  fetchStrategySubscriptions,
  updateStrategySubscription,
} from './services/subscription.api';
import type {
  StrategySubscriptionItem,
  SignalPreview,
  NotificationChannel,
} from './services/subscription.api';
import {
  CardPanel,
  ChannelRow,
  EmptyState,
  SectionGrid,
  SectionTitle,
  StatsRow,
  SubscriptionContainer,
} from './StrategySubscription.styles';

const { Text } = Typography;

const riskColorMap: Record<StrategySubscriptionItem['riskLevel'], string> = {
  高: 'red',
  中: 'orange',
  低: 'green',
};

const StrategySubscription: React.FC = () => {
  const [strategies, setStrategies] = useState<StrategySubscriptionItem[]>([]);
  const [signals, setSignals] = useState<SignalPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStrategySubscriptions();
      setStrategies(data.strategies || []);
      setSignals(data.recentSignals || []);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : '加载策略订阅数据失败';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubscriptionChange = async (
    record: StrategySubscriptionItem,
    subscribed: boolean,
    channels?: NotificationChannel[],
  ) => {
    setSavingId(record.id);
    try {
      const payloadChannels =
        channels && channels.length > 0 ? channels : record.channels;
      await updateStrategySubscription({
        strategyId: record.id,
        subscribed,
        channels: payloadChannels,
      });
      setStrategies(prev =>
        prev.map(item =>
          item.id === record.id
            ? { ...item, subscribed, channels: payloadChannels }
            : item,
        ),
      );
      message.success(subscribed ? '已订阅该策略' : '已取消订阅');
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : '更新订阅状态失败';
      message.error(msg);
    } finally {
      setSavingId(null);
    }
  };

  const handleChannelChange = async (
    record: StrategySubscriptionItem,
    values: CheckboxValueType[],
  ) => {
    const channels = values as NotificationChannel[];
    setStrategies(prev =>
      prev.map(item =>
        item.id === record.id ? { ...item, channels } : item,
      ),
    );
    if (record.subscribed) {
      await handleSubscriptionChange(record, true, channels);
    }
  };

  const subscribedCount = useMemo(
    () => strategies.filter(item => item.subscribed).length,
    [strategies],
  );

  const columns: ColumnsType<StrategySubscriptionItem> = [
    {
      title: '策略',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record) => (
        <Space direction='vertical' size={4}>
          <Space size={8} wrap>
            <Text strong>{record.name}</Text>
            <Tag color={riskColorMap[record.riskLevel]}>
              风险：{record.riskLevel}
            </Tag>
            <Tag color='blue'>信号：{record.signalFrequency}</Tag>
          </Space>
          <Text type='secondary'>{record.summary}</Text>
          <Space size={6} wrap>
            {(record.tags || []).map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
        </Space>
      ),
    },
    {
      title: '最新信号',
      dataIndex: 'lastSignal',
      key: 'lastSignal',
      width: 160,
      render: (text: string | undefined) =>
        text ? (
          <Space size={6}>
            <ThunderboltOutlined style={{ color: '#f59e0b' }} />
            <span>{text}</span>
          </Space>
        ) : (
          <Text type='secondary'>暂无</Text>
        ),
    },
    {
      title: '近30日表现',
      dataIndex: 'performance',
      key: 'performance',
      width: 140,
      render: (value: number) => (
        <Tag color={value >= 0 ? 'green' : 'red'}>
          {value >= 0 ? '+' : ''}
          {value}%
        </Tag>
      ),
    },
    {
      title: '通知渠道',
      dataIndex: 'channels',
      key: 'channels',
      width: 240,
      render: (_: NotificationChannel[], record) => (
        <ChannelRow>
          <Checkbox.Group
            options={[
              { label: '站内', value: 'app' },
              { label: '邮件', value: 'email' },
              { label: '短信', value: 'sms' },
              { label: 'Webhook', value: 'webhook' },
            ]}
            value={record.channels}
            onChange={values => handleChannelChange(record, values)}
          />
        </ChannelRow>
      ),
    },
    {
      title: '订阅',
      key: 'subscription',
      width: 120,
      render: (_: unknown, record) => (
        <Switch
          checked={record.subscribed}
          loading={savingId === record.id}
          onChange={checked =>
            handleSubscriptionChange(record, checked, record.channels)
          }
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <BellOutlined />
          策略订阅
        </PageTitle>
        <PageHeaderActions>
          <Button icon={<SyncOutlined />} onClick={loadData} loading={loading}>
            刷新
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <PageBody>
        <SubscriptionContainer>
          <Alert
            type='info'
            showIcon
            message='策略订阅与调仓管理是不同的入口'
            description='收到交易信号后，用户可在此按需订阅策略与通知渠道；调仓页保留管理员的策略总开关，不会被订阅操作影响。'
          />

          <StatsRow>
            <Card>
              <Statistic
                title='可订阅策略'
                value={strategies.length}
                prefix={<RadarChartOutlined />}
              />
            </Card>
            <Card>
              <Statistic
                title='已订阅策略'
                value={subscribedCount}
                prefix={<BellOutlined />}
              />
            </Card>
            <Card>
              <Statistic
                title='最新信号'
                value={signals[0]?.strategyName ?? '-'}
                prefix={<ThunderboltOutlined />}
              />
            </Card>
            <Card>
              <Statistic
                title='信号时刻'
                value={signals[0]?.time ?? '-'}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </StatsRow>

          <SectionGrid>
            <CardPanel>
              <SectionTitle>
                <BellOutlined />
                <span>策略列表</span>
                <span className='muted'>选择订阅并配置通知渠道</span>
              </SectionTitle>
              <Table
                rowKey='id'
                columns={columns}
                dataSource={strategies}
                loading={loading}
                pagination={{ pageSize: 6 }}
              />
            </CardPanel>

            <CardPanel>
              <SectionTitle>
                <ThunderboltOutlined />
                <span>最近信号预览</span>
                <span className='muted'>仅展示概要，不影响调仓页</span>
              </SectionTitle>
              <Divider style={{ margin: '12px 0' }} />
              {signals.length === 0 ? (
                <EmptyState>暂无最新信号</EmptyState>
              ) : (
                <Space direction='vertical' size={12} style={{ width: '100%' }}>
                  {signals.map(item => (
                    <Card
                      key={item.id}
                      size='small'
                      style={{ borderRadius: 10 }}
                      title={
                        <Space>
                          <Badge status='processing' />
                          <Text strong>{item.strategyName}</Text>
                        </Space>
                      }
                      extra={<Text type='secondary'>{item.time}</Text>}
                    >
                      <Space direction='vertical' size={4}>
                        <Space>
                          <AimOutlined />
                          <Text>{item.action}</Text>
                        </Space>
                        <Text type='secondary'>{item.expectedImpact}</Text>
                      </Space>
                    </Card>
                  ))}
                </Space>
              )}
            </CardPanel>
          </SectionGrid>
        </SubscriptionContainer>
      </PageBody>
    </PageContainer>
  );
};

export default StrategySubscription;

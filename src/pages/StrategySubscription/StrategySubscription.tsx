import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Card,
  Checkbox,
  Input,
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
  BellOutlined,
  RadarChartOutlined,
  StopOutlined,
} from '@ant-design/icons';
import {
  PageBody,
  PageContainer,
  PageHeader,
  PageTitle,
} from '../../components/PageLayout';
import {
  fetchStrategySubscriptions,
  updateStrategySubscription,
  updateStrategyBlacklist,
} from './services/subscription.api';
import type {
  StrategySubscriptionItem,
  NotificationChannel,
} from './services/subscription.api';
import {
  CardPanel,
  ChannelRow,
  EmptyState,
  PanelBody,
  SectionGrid,
  SectionTitle,
  StatsRow,
  SubscriptionContainer,
} from './StrategySubscription.styles';

const { Text } = Typography;

const StrategySubscription: React.FC = () => {
  const [strategies, setStrategies] = useState<StrategySubscriptionItem[]>([]);
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [blacklistInput, setBlacklistInput] = useState('');
  const [blacklistSaving, setBlacklistSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStrategySubscriptions();
      setStrategies(data.strategies || []);
      setBlacklist(data.blacklist || []);
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

  const persistBlacklist = useCallback(async (nextList: string[]) => {
    setBlacklistSaving(true);
    try {
      await updateStrategyBlacklist({ blacklist: nextList });
      setBlacklist(nextList);
      message.success('已更新黑名单');
      return true;
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : '更新黑名单失败';
      message.error(msg);
      return false;
    } finally {
      setBlacklistSaving(false);
    }
  }, []);

  const handleBlacklistAdd = useCallback(
    async (rawValue?: string) => {
      const inputValue = (rawValue ?? blacklistInput).trim();
      if (!inputValue) return;
      const normalized = inputValue.toUpperCase();
      if (blacklist.includes(normalized)) {
        message.info('该标的已在黑名单');
        return;
      }
      const success = await persistBlacklist([...blacklist, normalized]);
      if (success) {
        setBlacklistInput('');
      }
    },
    [blacklist, blacklistInput, persistBlacklist],
  );

  const handleBlacklistRemove = useCallback(
    async (symbol: string) => {
      const nextList = blacklist.filter(item => item !== symbol);
      await persistBlacklist(nextList);
    },
    [blacklist, persistBlacklist],
  );

  const subscribedCount = useMemo(
    () => strategies.filter(item => item.subscribed).length,
    [strategies],
  );

  const columns: ColumnsType<StrategySubscriptionItem> = [
    {
      title: '策略',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record) => <Text strong>{record.name}</Text>,
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
              { label: '邮件', value: 'email' },
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
    <PageContainer style={{ minHeight: '100vh' }}>
      <PageHeader>
        <PageTitle>
          <BellOutlined />
          策略订阅
        </PageTitle>
      </PageHeader>

      <PageBody
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'visible',
          paddingRight: 0,
        }}
      >
        <SubscriptionContainer>
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
                title='已屏蔽'
                value={blacklist.length}
                prefix={<StopOutlined />}
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
              <PanelBody>
                <div className='strategy-table' style={{ height: '100%' }}>
                  <Table
                    rowKey='id'
                    columns={columns}
                    dataSource={strategies}
                    loading={loading}
                    pagination={{ pageSize: 6, position: ['bottomRight'] }}
                  />
                </div>
              </PanelBody>
            </CardPanel>

            <CardPanel>
              <SectionTitle>
                <StopOutlined />
                <span>黑名单</span>
                <span className='muted'>输入需要屏蔽的股票代码或名称</span>
              </SectionTitle>
              <PanelBody>
                <div className='blacklist-body'>
                  <Input.Search
                    allowClear
                    placeholder='输入股票代码或名称，按回车添加'
                    enterButton='添加'
                    value={blacklistInput}
                    disabled={blacklistSaving}
                    loading={blacklistSaving}
                    onChange={e => setBlacklistInput(e.target.value)}
                    onSearch={value => handleBlacklistAdd(value)}
                  />
                  {blacklist.length === 0 ? (
                    <EmptyState>暂无黑名单股票</EmptyState>
                  ) : (
                    <div className='blacklist-tags'>
                      {blacklist.map(item => (
                        <Tag
                          key={item}
                          closable={!blacklistSaving}
                          onClose={e => {
                            e.preventDefault();
                            handleBlacklistRemove(item);
                          }}
                        >
                          {item}
                        </Tag>
                      ))}
                    </div>
                  )}
                </div>
              </PanelBody>
            </CardPanel>
          </SectionGrid>
        </SubscriptionContainer>
      </PageBody>
    </PageContainer>
  );
};

export default StrategySubscription;

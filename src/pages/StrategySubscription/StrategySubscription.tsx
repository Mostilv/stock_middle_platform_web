import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  App as AntdApp,
  Card,
  Checkbox,
  Input,
  Statistic,
  Switch,
  Table,
  Tag,
  Typography,
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
import { useGlobalStore } from '../../stores/globalStore';
import {
  fetchStrategySubscriptions,
  updateStrategySubscription,
  updateStrategyBlacklist,
} from './services/subscription.api';
import type {
  NotificationChannel,
  StrategySubscriptionItem,
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

interface SubscriptionRow {
  id: string;
  name: string;
  subscribed: boolean;
  channels: NotificationChannel[];
}

interface SubscriptionPreference {
  subscribed: boolean;
  channels: NotificationChannel[];
  externalId: string;
}

type SubscriptionMap = Record<string, SubscriptionPreference>;

const StrategySubscription: React.FC = () => {
  const { message } = AntdApp.useApp();
  const strategies = useGlobalStore(state => state.strategies);
  const strategiesLoading = useGlobalStore(state => state.strategiesLoading);
  const loadStrategies = useGlobalStore(state => state.loadStrategies);
  const strategiesLoaded = useGlobalStore(state => state.strategiesLoaded);
  const isStrategyEnabled = useGlobalStore(state => state.isStrategyEnabled);
  const user = useGlobalStore(state => state.user);
  const setUser = useGlobalStore(state => state.setUser);
  const [subscriptionMap, setSubscriptionMap] = useState<SubscriptionMap>({});
  const [remotePreferences, setRemotePreferences] = useState<
    Record<string, StrategySubscriptionItem>
  >({});
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [blacklistInput, setBlacklistInput] = useState('');
  const [blacklistSaving, setBlacklistSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const updateSubscriptionMap = useCallback(
    (updater: (prev: SubscriptionMap) => SubscriptionMap) => {
      setSubscriptionMap(prev => {
        const next = updater(prev);
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    if (!user) return;
    const subscriptions = Object.entries(subscriptionMap).map(
      ([strategyId, pref]) => ({
        strategyId,
        subscribed: pref.subscribed,
        channels: pref.channels,
      }),
    );
    const existing = user.subscriptions ?? [];
    const normalize = (list: typeof subscriptions) =>
      list
        .map(item => ({
          ...item,
          channels: [...item.channels].sort(),
        }))
        .sort((a, b) => a.strategyId.localeCompare(b.strategyId));
    const normalizedExisting = normalize(existing);
    const normalizedNext = normalize(subscriptions);
    const isSame =
      normalizedExisting.length === normalizedNext.length &&
      normalizedExisting.every((item, index) => {
        const next = normalizedNext[index];
        return (
          item.strategyId === next.strategyId &&
          item.subscribed === next.subscribed &&
          item.channels.length === next.channels.length &&
          item.channels.every((channel, channelIndex) => {
            return channel === next.channels[channelIndex];
          })
        );
      });
    if (isSame) return;
    setUser({ ...user, subscriptions });
  }, [setUser, subscriptionMap, user]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStrategySubscriptions();
      const preferenceMap: Record<string, StrategySubscriptionItem> = {};
      (data.strategies || []).forEach(item => {
        preferenceMap[item.id] = item;
        preferenceMap[item.name] = item;
      });
      setRemotePreferences(preferenceMap);
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
  useEffect(() => {
    if (!strategiesLoaded) {
      loadStrategies().catch(() => {});
    }
  }, [loadStrategies, strategiesLoaded]);
  useEffect(() => {
    if (!Array.isArray(strategies) || strategies.length === 0) return;
    updateSubscriptionMap(prev => {
      let changed = false;
      const next = { ...prev };
      strategies.forEach(strategy => {
        if (next[strategy.id]) return;
        const userPref = user?.subscriptions?.find(
          item => item.strategyId === strategy.id,
        );
        const remotePref =
          remotePreferences[strategy.id] || remotePreferences[strategy.name];
        const defaultChannels: NotificationChannel[] = ['email'];
        const prefChannels =
          userPref?.channels ?? remotePref?.channels ?? defaultChannels;
        next[strategy.id] = {
          subscribed: userPref?.subscribed ?? remotePref?.subscribed ?? false,
          channels: prefChannels.length > 0 ? prefChannels : defaultChannels,
          externalId: remotePref?.id ?? strategy.id,
        };
        changed = true;
      });
      return changed ? next : prev;
    });
  }, [
    strategies,
    remotePreferences,
    updateSubscriptionMap,
    user?.subscriptions,
  ]);

  const handleSubscriptionChange = async (
    record: SubscriptionRow,
    subscribed: boolean,
    channels?: NotificationChannel[],
  ) => {
    setSavingId(record.id);
    const preference = subscriptionMap[record.id];
    const currentChannels = preference?.channels ?? [];
    const payloadChannels =
      channels && channels.length > 0 ? channels : currentChannels;
    const targetId = preference?.externalId ?? record.id;
    try {
      await updateStrategySubscription({
        strategyId: targetId,
        subscribed,
        channels: payloadChannels,
      });
      updateSubscriptionMap(prev => {
        const current = prev[record.id] || {
          subscribed: false,
          channels: [],
          externalId: targetId,
        };
        const next = {
          ...prev,
          [record.id]: {
            subscribed,
            channels: payloadChannels,
            externalId: current.externalId || targetId,
          },
        };
        return next;
      });
      message.success(
        subscribed ? `已订阅${record.name}` : `已取消订阅${record.name}`,
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : '更新订阅状态失败';
      message.error(msg);
    } finally {
      setSavingId(null);
    }
  };

  const handleSubscriptionToggle = async (
    record: SubscriptionRow,
    subscribed: boolean,
  ) => {
    if (strategiesLoaded && subscribed && !isStrategyEnabled(record.id)) {
      message.warning('总策略信号未启用，请先在调仓页打开');
      return;
    }
    await handleSubscriptionChange(record, subscribed);
  };

  const handleChannelChange = async (
    record: SubscriptionRow,
    values: CheckboxValueType[],
  ) => {
    if (strategiesLoaded && !isStrategyEnabled(record.id)) {
      message.warning('总策略信号停用时无法配置通知渠道');
      return;
    }
    const channels = values as NotificationChannel[];
    const preference = subscriptionMap[record.id];
    updateSubscriptionMap(prev => {
      const current = prev[record.id] || {
        subscribed: false,
        channels: [],
        externalId: preference?.externalId ?? record.id,
      };
      const next = {
        ...prev,
        [record.id]: {
          ...current,
          channels,
        },
      };
      return next;
    });
    if (preference?.subscribed) {
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
      const msg = error instanceof Error ? error.message : '更新黑名单失败';
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

  const tableData = useMemo<SubscriptionRow[]>(() => {
    if (!Array.isArray(strategies)) return [];
    return strategies.map(strategy => {
      const preference = subscriptionMap[strategy.id];
      return {
        id: strategy.id,
        name: strategy.name,
        subscribed: preference?.subscribed ?? false,
        channels: preference?.channels ?? [],
      };
    });
  }, [strategies, subscriptionMap]);

  const subscribedCount = useMemo(
    () => tableData.filter(item => item.subscribed).length,
    [tableData],
  );

  const subscriptionsLoading = loading || strategiesLoading;

  const columns: ColumnsType<SubscriptionRow> = [
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
            options={[{ label: '邮件', value: 'email' }]}
            value={record.channels}
            disabled={strategiesLoaded && !isStrategyEnabled(record.id)}
            onChange={values => handleChannelChange(record, values)}
          />
        </ChannelRow>
      ),
    },
    {
      title: '订阅',
      key: 'subscription',
      width: 110,
      render: (_: unknown, record) => {
        const disabled = strategiesLoaded && !isStrategyEnabled(record.id);
        const switchDisabled = disabled && !record.subscribed;
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Switch
              disabled={switchDisabled}
              checked={record.subscribed}
              loading={savingId === record.id}
              onChange={checked => handleSubscriptionToggle(record, checked)}
            />
            {disabled && (
              <Text type='secondary' style={{ fontSize: 12 }}>
                未启用
              </Text>
            )}
          </div>
        );
      },
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
                value={tableData.length}
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
                    dataSource={tableData}
                    loading={subscriptionsLoading}
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

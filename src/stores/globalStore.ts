import { create } from 'zustand';
import type { AuthUser } from '../contexts/auth-context';
import {
  fetchPortfolioOverview,
  type PortfolioOverviewResponse,
  type StrategyPortfolio as StrategyDTO,
} from '../api/portfolio';

export interface GlobalStoreState {
  user: AuthUser | null;
  strategies: StrategyDTO[];
  overview: PortfolioOverviewResponse | null;
  strategiesLoading: boolean;
  strategiesLoaded: boolean;
  setUser: (user: AuthUser | null) => void;
  setStrategies: (strategies: StrategyDTO[]) => void;
  setOverview: (overview: PortfolioOverviewResponse) => void;
  toggleStrategyStatus: (strategyId: string) => void;
  isStrategyEnabled: (strategyId: string) => boolean;
  loadStrategies: (
    force?: boolean,
  ) => Promise<PortfolioOverviewResponse | null>;
}

export const useGlobalStore = create<GlobalStoreState>((set, get) => ({
  user: null,
  strategies: [],
  overview: null,
  strategiesLoading: false,
  strategiesLoaded: false,
  setUser: user => set({ user }),
  setStrategies: strategies =>
    set({
      strategies,
      strategiesLoaded: true,
    }),
  setOverview: overview =>
    set({
      overview,
      strategies: overview.strategies,
      strategiesLoaded: true,
    }),
  toggleStrategyStatus: async strategyId => {
    const { strategies } = get();
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy) return;
    const newStatus = strategy.status === 'active' ? 'inactive' : 'active';
    
    // 乐观更新
    set(state => ({
      strategies: state.strategies.map(s =>
        s.id === strategyId ? { ...s, status: newStatus } : s,
      ),
    }));

    try {
      const { togglePortfolioStrategy } = await import('../api/portfolio');
      await togglePortfolioStrategy(strategyId, newStatus === 'active');
    } catch (e) {
      // 请求失败则回滚状态
      set(state => ({
        strategies: state.strategies.map(s =>
          s.id === strategyId ? { ...s, status: strategy.status } : s,
        ),
      }));
    }
  },
  isStrategyEnabled: strategyId =>
    get().strategies.find(strategy => strategy.id === strategyId)?.status ===
    'active',
  loadStrategies: async (force = false) => {
    const { strategiesLoaded, strategiesLoading, overview } = get();
    if (!force && (strategiesLoaded || strategiesLoading) && overview) {
      return overview;
    }
    set({ strategiesLoading: true });
    try {
      const nextOverview = await fetchPortfolioOverview();
      set({
        overview: nextOverview,
        strategies: nextOverview.strategies,
        strategiesLoaded: true,
      });
      return nextOverview;
    } catch (error) {
      set({ strategiesLoaded: false });
      throw error;
    } finally {
      set({ strategiesLoading: false });
    }
  },
}));

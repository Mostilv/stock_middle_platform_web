export interface RankingTooltipItem {
  rank: number;
  label: string;
  value: string;
  highlight?: boolean;
}

interface BuildRankingOptions {
  columns?: number;
  rowsPerColumn?: number;
}

const DEFAULT_COLUMNS = 4;
const DEFAULT_ROWS_PER_COLUMN = 7;

export const TOOLTIP_EXTRA_CSS =
  [
    'position:fixed',
    'pointer-events:none',
    'max-width:680px',
    'max-height:calc(100vh - 16px)',
    'overflow:auto',
    'border-radius:12px',
    'box-shadow:0 12px 32px rgba(5,8,20,0.55)',
  ].join(';') + ';';

export const buildRankingTooltipContent = (
  title: string,
  items: RankingTooltipItem[],
  options: BuildRankingOptions = {},
): string => {
  const columnCount = options.columns ?? DEFAULT_COLUMNS;
  const rowsPerColumn = options.rowsPerColumn ?? DEFAULT_ROWS_PER_COLUMN;
  const maxItems = columnCount * rowsPerColumn;

  if (!items.length) {
    return `
      <div style="min-width:240px;color:#e6f7ff;font-size:12px;">
        <div style="font-weight:600;margin-bottom:6px;">${title}</div>
        <div>暂无数据</div>
      </div>
    `;
  }

  const limited = items.slice(0, maxItems);
  const columns = Array.from({ length: columnCount }, (_, columnIndex) =>
    limited.slice(
      columnIndex * rowsPerColumn,
      (columnIndex + 1) * rowsPerColumn,
    ),
  );

  const columnHtml = columns
    .map(column => {
      if (column.length === 0) {
        return `<div style="min-height:4px;"></div>`;
      }
      return `<div style="display:flex;flex-direction:column;gap:4px;min-width:0;">
        ${column
          .map(item => {
            const labelColor = item.highlight ? '#ffd666' : '#f0f6ff';
            const valueColor = item.highlight ? '#ffd666' : '#9be1ff';
            return `
              <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:${labelColor};white-space:nowrap;">
                <span style="color:rgba(255,255,255,0.55);width:18px;text-align:right;font-variant-numeric:tabular-nums;">${item.rank}.</span>
                <span style="flex:1;overflow:hidden;text-overflow:ellipsis;">${item.label}</span>
                <span style="color:${valueColor};font-variant-numeric:tabular-nums;">${item.value}</span>
              </div>
            `;
          })
          .join('')}
      </div>`;
    })
    .join('');

  return `
    <div style="min-width:520px;max-width:680px;">
      <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:#f0f6ff;">${title}</div>
      <div style="display:grid;grid-template-columns:repeat(${columnCount}, minmax(0, 1fr));gap:8px 16px;">
        ${columnHtml}
      </div>
    </div>
  `;
};

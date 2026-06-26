import type { DefineComponent } from 'vue';

export type VdChartType = 'bar' | 'line' | 'area' | 'scatter' | 'donut' | 'pie';

export type VdChartAccessor = string | ((row: Record<string, unknown>) => unknown);

export interface VdChartProps {
  /** Chart kind. Default `'bar'`. */
  type?: VdChartType;
  /** Row data; plain objects. */
  data?: Array<Record<string, unknown>>;
  /** Cartesian x accessor (key or function). */
  x?: VdChartAccessor;
  /** Cartesian y accessor (key or function). */
  y?: VdChartAccessor;
  /** Pie/donut label accessor. */
  label?: VdChartAccessor;
  /** Pie/donut value accessor. */
  value?: VdChartAccessor;
  color?: string;
  /** Rendered into SVG accessibility metadata. */
  title?: string;
  description?: string;
  width?: number;
  /** Container min-height in px. Default `300`. */
  height?: number;
  /** Donut/pie inner radius ratio. */
  innerRadiusRatio?: number;
  theme?: Record<string, unknown>;
  tooltip?: ((...args: unknown[]) => string) | string | false;
  responsive?: boolean;
}

export declare const VdChart: DefineComponent<VdChartProps>;
export declare const VdBarChart: DefineComponent<VdChartProps>;
export declare const VdLineChart: DefineComponent<VdChartProps>;
export declare const VdAreaChart: DefineComponent<VdChartProps>;
export declare const VdScatterChart: DefineComponent<VdChartProps>;
export declare const VdDonutChart: DefineComponent<VdChartProps>;
export declare const VdPieChart: DefineComponent<VdChartProps>;

export default VdChart;

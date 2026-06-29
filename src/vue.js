/**
 * Vue 3 bindings for @vanduo-oss/charts — optional entry.
 *
 *   import { VdChart } from '@vanduo-oss/charts/vue';
 *   <VdChart type="bar" :data="rows" x="month" y="sales" title="Sales" :height="300" />
 *
 * The core package stays framework-agnostic; `vue` is an *optional* peer
 * dependency, only needed if you import this subpath. SSR-safe: the chart is
 * created on mount (client) into a plain container the server can pre-render.
 */
import { defineComponent, h, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import {
  BarChart,
  LineChart,
  AreaChart,
  ScatterChart,
  DonutChart,
  PieChart,
} from './index.js';

const FACTORIES = {
  bar: BarChart,
  line: LineChart,
  area: AreaChart,
  scatter: ScatterChart,
  donut: DonutChart,
  pie: PieChart,
};

const CHART_PROPS = {
  type: { type: String, default: 'bar' },
  data: { type: Array, default: () => [] },
  x: { type: [String, Function], default: undefined },
  y: { type: [String, Function], default: undefined },
  label: { type: [String, Function], default: undefined },
  value: { type: [String, Function], default: undefined },
  // CSS color, category-field name, or per-datum function `(row) => color`.
  color: { type: [String, Function], default: undefined },
  title: { type: String, default: undefined },
  description: { type: String, default: undefined },
  width: { type: Number, default: undefined },
  height: { type: Number, default: 300 },
  innerRadiusRatio: { type: Number, default: undefined },
  theme: { type: Object, default: undefined },
  tooltip: { type: [Function, String, Boolean], default: undefined },
  responsive: { type: Boolean, default: true },
  // Multi-series (bar → grouped, line/area → one path each).
  series: { type: Array, default: undefined },
  // `true` / `false` / `{ position }`.
  legend: { type: [Boolean, Object], default: undefined },
  // Value labels on marks: `true` / `false` / `{ format, color }`.
  dataLabels: { type: [Boolean, Object], default: undefined },
  // Reference lines: `[{ y?, x?, label?, color?, dash? }]`.
  annotations: { type: Array, default: undefined },
  // Axis range + ticks.
  xMin: { type: Number, default: undefined },
  xMax: { type: Number, default: undefined },
  yMin: { type: Number, default: undefined },
  yMax: { type: Number, default: undefined },
  yTickCount: { type: Number, default: undefined },
  yIncludeZero: { type: Boolean, default: undefined },
  xFormat: { type: Function, default: undefined },
  yFormat: { type: Function, default: undefined },
  xAxis: { type: Object, default: undefined },
  yAxis: { type: Object, default: undefined },
};

function optionsFrom(target, props) {
  return {
    target,
    type: props.type,
    data: props.data,
    x: props.x,
    y: props.y,
    label: props.label,
    value: props.value,
    color: props.color,
    title: props.title,
    description: props.description,
    width: props.width,
    height: props.height,
    innerRadiusRatio: props.innerRadiusRatio,
    theme: props.theme,
    tooltip: props.tooltip,
    responsive: props.responsive,
    series: props.series,
    legend: props.legend,
    dataLabels: props.dataLabels,
    annotations: props.annotations,
    xMin: props.xMin,
    xMax: props.xMax,
    yMin: props.yMin,
    yMax: props.yMax,
    yTickCount: props.yTickCount,
    yIncludeZero: props.yIncludeZero,
    xFormat: props.xFormat,
    yFormat: props.yFormat,
    xAxis: props.xAxis,
    yAxis: props.yAxis,
  };
}

export const VdChart = defineComponent({
  name: 'VdChart',
  props: CHART_PROPS,
  setup(props) {
    const el = ref(null);
    let instance = null;
    let currentType = props.type;

    const create = () => {
      const factory = FACTORIES[props.type] || BarChart;
      currentType = props.type;
      instance = factory(optionsFrom(el.value, props));
    };

    onMounted(() => {
      if (typeof window === 'undefined' || !el.value) return;
      create();
    });

    watch(
      () => [
        props.type, props.data, props.x, props.y, props.label, props.value,
        props.color, props.title, props.description, props.width, props.height,
        props.innerRadiusRatio, props.theme, props.tooltip, props.responsive,
        props.series, props.legend, props.dataLabels, props.annotations,
        props.xMin, props.xMax, props.yMin, props.yMax, props.yTickCount,
        props.yIncludeZero, props.xFormat, props.yFormat, props.xAxis,
        props.yAxis,
      ],
      () => {
        if (!instance) return;
        // A different chart type needs a different renderer → recreate;
        // otherwise update options in place.
        if (props.type !== currentType) {
          instance.destroy();
          create();
        } else {
          instance.update(optionsFrom(el.value, props));
        }
      },
      { deep: true },
    );

    onBeforeUnmount(() => {
      if (instance) {
        instance.destroy();
        instance = null;
      }
    });

    return () =>
      h('div', {
        ref: el,
        class: 'vd-chart',
        style: props.height ? { minHeight: `${props.height}px` } : undefined,
      });
  },
});

function typed(name, type) {
  return defineComponent({
    name,
    props: CHART_PROPS,
    setup(props) {
      return () => h(VdChart, { ...props, type });
    },
  });
}

export const VdBarChart = typed('VdBarChart', 'bar');
export const VdLineChart = typed('VdLineChart', 'line');
export const VdAreaChart = typed('VdAreaChart', 'area');
export const VdScatterChart = typed('VdScatterChart', 'scatter');
export const VdDonutChart = typed('VdDonutChart', 'donut');
export const VdPieChart = typed('VdPieChart', 'pie');

export default VdChart;

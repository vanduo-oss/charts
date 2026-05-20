import { expect, test } from '@playwright/test';

test.describe('Vanduo Charts primitives', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/charts-harness.html');
  });

  test('accessors read fields, nested paths and callbacks', async ({ page }) => {
    const result = await page.evaluate(() => {
      const { createAccessor } = (window as any).charts;
      return {
        field: createAccessor('value')({ value: 42 }),
        nested: createAccessor('metrics.total')({ metrics: { total: 99 } }),
        callback: createAccessor((d: { value: number }) => d.value * 2)({ value: 21 })
      };
    });

    expect(result).toEqual({ field: 42, nested: 99, callback: 42 });
  });

  test('linear, band, point and ordinal scales map values predictably', async ({ page }) => {
    const result = await page.evaluate(() => {
      const { scaleLinear, scaleBand, scalePoint, scaleOrdinal } = (window as any).charts;
      const linear = scaleLinear({ domain: [0, 100], range: [0, 500] });
      const band = scaleBand({ domain: ['a', 'b'], range: [0, 200], padding: 0 });
      const point = scalePoint({ domain: ['a', 'b', 'c'], range: [0, 100], padding: 0 });
      const ordinal = scaleOrdinal({ domain: ['north'], range: ['red', 'blue'] });
      return {
        linear: linear(50),
        ticks: linear.ticks(5),
        bandA: band('a'),
        bandWidth: band.bandwidth(),
        pointB: point('b'),
        ordinalKnown: ordinal('north'),
        ordinalNew: ordinal('south')
      };
    });

    expect(result.linear).toBe(250);
    expect(result.ticks).toContain(100);
    expect(result.bandA).toBe(0);
    expect(result.bandWidth).toBe(100);
    expect(result.pointB).toBe(50);
    expect(result.ordinalKnown).toBe('red');
    expect(result.ordinalNew).toBe('blue');
  });

  test('path helpers generate line, area and arc commands', async ({ page }) => {
    const result = await page.evaluate(() => {
      const { __testing } = (window as any).charts;
      return {
        line: __testing.linePath([{ x: 0, y: 10 }, { x: 20, y: 30 }]),
        area: __testing.areaPath([{ x: 0, y: 10 }, { x: 20, y: 30 }], 40),
        arc: __testing.arcPath(50, 50, 40, 20, -Math.PI / 2, Math.PI / 2)
      };
    });

    expect(result.line).toBe('M0,10 L20,30');
    expect(result.area).toBe('M0,10 L20,30 L20,40 L0,40 Z');
    expect(result.arc).toContain('A40,40');
    expect(result.arc).toContain('A20,20');
  });

  test('theme reads Vanduo CSS tokens and chart color slots', async ({ page }) => {
    const result = await page.evaluate(() => {
      const { resolveTheme } = (window as any).charts;
      const mount = document.getElementById('bar');
      return resolveTheme(mount);
    });

    expect(result.textColor).toBe('#1a1d20');
    expect(result.colors[0]).toBe('#364fc7');
    expect(result.colors[1]).toBe('#0b7285');
  });
});

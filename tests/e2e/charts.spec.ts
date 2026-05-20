import { expect, test } from '@playwright/test';

test.describe('Vanduo Charts SVG rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/charts-harness.html');
  });

  test('renders bar chart, filters null rows and supports tooltip/click', async ({ page }) => {
    await page.evaluate(() => (window as any).renderBar());

    const chart = page.locator('#bar');
    await expect(chart.locator('svg[role="img"]')).toBeVisible();
    await expect(chart.locator('rect.vd-chart-bar')).toHaveCount(3);

    const firstBar = chart.locator('rect.vd-chart-bar').first();
    await firstBar.hover();
    await expect(chart.locator('.vd-chart-tooltip')).toContainText('Jan: 120');

    await firstBar.click();
    await expect.poll(() => page.evaluate(() => (window as any).chartClicks)).toEqual(['Jan']);
  });

  test('renders line, area and scatter charts', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).renderLine();
      (window as any).renderArea();
      (window as any).renderScatter();
    });

    await expect(page.locator('#line path.vd-chart-line-path')).toHaveAttribute('d', /M/);
    await expect(page.locator('#area path.vd-chart-area-path')).toHaveAttribute('d', /Z/);
    await expect(page.locator('#scatter circle.vd-chart-scatter-point')).toHaveCount(4);
  });

  test('renders donut and pie charts with expected inner radius behavior', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).renderDonut();
      (window as any).renderPie();
    });

    await expect(page.locator('#donut path.vd-chart-slice')).toHaveCount(3);
    await expect(page.locator('#pie path.vd-chart-slice')).toHaveCount(3);

    const donutPath = await page.locator('#donut path.vd-chart-slice').first().getAttribute('d');
    const piePath = await page.locator('#pie path.vd-chart-slice').first().getAttribute('d');
    expect(donutPath).toContain('A');
    expect(donutPath).toMatch(/A[0-9.]+,[0-9.]+.*A[0-9.]+,[0-9.]+/);
    expect(piePath).toContain('M');
    expect(piePath).not.toMatch(/A[0-9.]+,[0-9.]+.*A[0-9.]+,[0-9.]+/);
  });

  test('slice click callback receives datum', async ({ page }) => {
    await page.evaluate(() => (window as any).renderDonut());

    await page.locator('#donut path.vd-chart-slice').first().dispatchEvent('click');
    await expect.poll(() => page.evaluate(() => (window as any).chartClicks)).toEqual(['Product']);
  });

  test('chart instances update, resize and destroy cleanly', async ({ page }) => {
    const result = await page.evaluate(() => {
      const chart = (window as any).renderResponsive();
      const mount = document.getElementById('responsive') as HTMLElement;
      const before = mount.querySelectorAll('rect.vd-chart-bar').length;
      chart.update({ data: [{ month: 'May', value: 200 }] });
      const afterUpdate = mount.querySelectorAll('rect.vd-chart-bar').length;
      mount.style.width = '420px';
      chart.resize();
      const resizedWidth = mount.querySelector('svg')?.getAttribute('width');
      chart.destroy();
      return {
        before,
        afterUpdate,
        resizedWidth,
        empty: mount.children.length
      };
    });

    expect(result.before).toBe(3);
    expect(result.afterUpdate).toBe(1);
    expect(result.resizedWidth).toBe('420');
    expect(result.empty).toBe(0);
  });

  test('auto-init self-registers with Vanduo and scoped destroy removes instances', async ({ page }) => {
    const result = await page.evaluate(() => {
      const component = (window as any).Vanduo.components.charts;
      (window as any).Vanduo.init(document.getElementById('auto-chart'));
      const initialized = component.instances.has(document.getElementById('auto-chart'));
      const sliceCount = document.querySelectorAll('#auto-chart path.vd-chart-slice').length;
      (window as any).Vanduo.destroy(document.getElementById('auto-chart'));
      return {
        registered: Boolean(component),
        initialized,
        sliceCount,
        destroyed: document.querySelectorAll('#auto-chart svg').length === 0,
        instanceCount: component.instances.size
      };
    });

    expect(result.registered).toBe(true);
    expect(result.initialized).toBe(true);
    expect(result.sliceCount).toBe(3);
    expect(result.destroyed).toBe(true);
    expect(result.instanceCount).toBe(0);
  });
});

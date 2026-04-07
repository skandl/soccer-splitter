import { test, expect } from '@playwright/test';

test.describe('Smart Name Splitter', () => {
  test('shows title and hides workspace until names are valid', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Smart Name Splitter' })).toBeVisible();
    await expect(page.locator('#workspace')).toBeHidden();
    await page.locator('#nameInput').fill('duplicate\nduplicate');
    await expect(page.getByRole('alert')).toContainText('Duplicate');
    await expect(page.locator('#workspace')).toBeHidden();
  });

  test('pool click places name in group 1', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nameInput').fill('Alice\nBob');
    await expect(page.locator('#workspace')).toBeVisible();
    await page.locator('#pool').getByRole('button', { name: 'Alice' }).click();
    await expect(
      page.getByRole('group', { name: 'Alice in group 1' }),
    ).toBeVisible();
    await expect(page.locator('#pool button.name-btn.used')).toHaveText('Alice');
  });

  test('clear columns returns names to pool', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nameInput').fill('Zoe');
    await page.locator('#pool').getByRole('button', { name: 'Zoe' }).click();
    await expect(page.getByRole('group', { name: 'Zoe in group 1' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear columns' }).click();
    await expect(page.locator('#pool button.name-btn.used')).toHaveCount(0);
    await expect(page.locator('#pool').getByRole('button', { name: 'Zoe' })).toBeEnabled();
  });

  test('random distribute assigns remaining names across groups', async ({ page }) => {
    await page.goto('/');
    await page.locator('#numGroups').fill('3');
    await page.locator('#nameInput').fill('A,B,C,D,E,F');
    await page.getByRole('button', { name: 'Randomly distribute remaining' }).click();
    const namesInColumns = await page.locator('#columnsHost .name-chip-text').allTextContents();
    expect(namesInColumns.sort()).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    await expect(page.locator('#pool button.name-btn:not(.used)')).toHaveCount(0);
  });
});

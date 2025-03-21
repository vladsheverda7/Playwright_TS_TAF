import { expect, Locator, test } from '@playwright/test';

test('Drag and Drop', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

    const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe');

    await iframe.locator('li', { hasText: 'High Tatras 2' }).dragTo(iframe.locator('#trash'));

    // more presise control
    await iframe.locator('li', { hasText: 'High Tatras 4' }).hover();
    await page.mouse.down();
    await iframe.locator('#trash').hover();
    await page.mouse.up();

    await expect(iframe.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4']);
});

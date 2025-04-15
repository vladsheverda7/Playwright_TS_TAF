import { test, Locator, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    if (!process.env.URL) {
        throw new Error('Environment variable URL is not defined');
    }
    await page.goto(process.env.URL);
    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
    testInfo.setTimeout(testInfo.timeout + 2000);
});

test('auto-waiting', async ({ page }) => {
    const successMessage: Locator = page.locator('.bg-success');
    await successMessage.click();

    //const successMessageText = await successMessage.textContent();

    await successMessage.waitFor({ state: 'attached' });
    const successMessageText = await successMessage.allTextContents();

    expect.soft(successMessageText).toContain('Data loaded with AJAX get request.');

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
});

test('alternative waits', async ({ page }) => {
    // wait for element:
    const successMessage: Locator = page.locator('.bg-success');

    // wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

    // wait for network calls to be completed (not recommended)
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('.bg-success');
    const successMessageText = await successMessage.allTextContents();
    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
});

test('timeouts', async ({ page }) => {
    //test.setTimeout(10000);
    test.slow();
    const successMessage: Locator = page.locator('.bg-success');
    await successMessage.click({ timeout: 20000 });
});

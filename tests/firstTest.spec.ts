import { test } from '@playwright/test';

test.beforeAll(() => {
    console.log('before all');
});

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    console.log('before each');
});

test('first test', async ({ page }) => {
    await page.getByText('Form Layouts').click();
});

test('navigate to datapicker page', async ({ page }) => {
    await page.getByText('Datepicker').click();
});

test.afterEach(() => {
    console.log('after each');
});

test.afterAll(() => {
    console.log('after all');
});

test.describe('suite 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
        await page.getByText('Forms').click();
        console.log('before each1');
    });

    test('first test', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    });

    test('navigate to datapicker page', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
});

import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test('navigate to form page', async ({ page }) => {
    const pageManager = new PageManager(page);
    await pageManager.navigateTo().openFormLayoutsPage();
    await pageManager.navigateTo().openDatePickerPage();
    await pageManager.navigateTo().openSmartTablePage();
    await pageManager.navigateTo().openToastsPage();
    await pageManager.navigateTo().openTooltipPge();
});

test('navigate to datapicker', async ({ page }) => {
    const pageManager = new PageManager(page);
    await pageManager.navigateTo().openDatePickerPage();
});

test('parametrized methods', async ({ page }) => {
    const pageManager = new PageManager(page);

    await pageManager.navigateTo().openFormLayoutsPage();
    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredsAndSelectOption('test@test.com', '12345678', 'Option 2');
    await pageManager.onFormLayoutPage().submitInlineForm('Jane Doe', 'test@test.com', true);
    await pageManager.navigateTo().openDatePickerPage();
    await pageManager.onDataPickerPage().selectCommomDatePickerDateFromToday(3);
    await pageManager.onDataPickerPage().selectDatePickerWithRangeFromToday(4, 5);
});

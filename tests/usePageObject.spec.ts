import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
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
    const randomFullName = faker.person.fullName();
    const randonEmail = `${randomFullName.replace(' ', '').toLowerCase()}${faker.number.int(100)}@test.com`;

    await pageManager.navigateTo().openFormLayoutsPage();
    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredsAndSelectOption(randonEmail, '12345678', 'Option 2');
    //await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2');
    await page.screenshot({ path: 'screenshots/formsLayoutsPage.png' });
    const buffer = await page.screenshot();
    // console.log(buffer.toString('base64'));
    await pageManager.onFormLayoutPage().submitInlineForm(randomFullName, randonEmail, true);
    await page.locator('nb-card').filter({ hasText: 'Inline form' }).screenshot({ path: 'screenshots/inlineForm.png' });
    await pageManager.navigateTo().openDatePickerPage();
    await pageManager.onDataPickerPage().selectCommomDatePickerDateFromToday(3);
    await pageManager.onDataPickerPage().selectDatePickerWithRangeFromToday(4, 5);
});

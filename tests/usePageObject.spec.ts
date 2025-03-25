import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test('navigate to form page', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.openFormLayoutsPage();
    await navigationPage.openDatePickerPage();
    await navigationPage.openSmartTablePage();
    await navigationPage.openToastsPage();
    await navigationPage.openTooltipPge();
});

test('navigate to datapicker', async ({ page }) => {
    const navigationPage = new NavigationPage(page);
    await navigationPage.openDatePickerPage();
});

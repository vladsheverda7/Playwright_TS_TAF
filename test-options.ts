import { test as base } from 'playwright/test';
import { PageManager } from './page-objects/pageManager';

export type TestOptions = {
    globalQAURL: string;
    formLayoutPage: string;
    pageManager: PageManager;
};

export const test = base.extend<TestOptions>({
    globalQAURL: ['', { option: true }],

    formLayoutPage: async ({ page }, use) => {
        await page.goto('/');
        await page.getByText('Forms').click();
        await page.locator('[title="Form Layouts"]').click();
        await use('');
    },

    pageManager: async ({ page, formLayoutPage }, use) => {
        const pm = new PageManager(page);
        await use(pm);
    },
});

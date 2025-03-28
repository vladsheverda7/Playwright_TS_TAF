import { Page } from 'playwright';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForNumberOfSeconds(timeInseconds: number) {
        await this.page.waitForTimeout(timeInseconds * 1000);
    }
}

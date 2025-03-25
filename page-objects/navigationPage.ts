import { Page } from 'playwright';

export class NavigationPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openFormLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.locator('[title="Form Layouts"]').click();
    }

    async openDatePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.page.locator('[title="Datepicker"]').click();
    }

    async openSmartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.page.locator('[title="Smart Table"]').click();
    }

    async openToastsPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.locator('[title="Toastr"]').click();
    }

    async openTooltipPge() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.page.locator('[title="Tooltip"]').click();
    }

    // used to check whether group menu is expanded
    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const isExpanded = await groupMenuItem.getAttribute('aria-expanded');

        if (isExpanded == 'false') {
            await groupMenuItem.click();
        }
    }
}

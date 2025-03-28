import { Locator, Page } from 'playwright';

export class NavigationPage {
    readonly page: Page;
    readonly formLayoutsMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formLayoutsMenuItem = this.page.locator('[title="Form Layouts"]');
        this.datePickerMenuItem = this.page.locator('[title="Datepicker"]');
        this.smartTableMenuItem = this.page.locator('[title="Smart Table"]');
        this.toastrMenuItem = this.page.locator('[title="Toastr"]');
        this.tooltipMenuItem = this.page.locator('[title="Tooltip"]');
    }

    async openFormLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.formLayoutsMenuItem.click();
    }

    async openDatePickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.datePickerMenuItem.click();
    }

    async openSmartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.smartTableMenuItem.click();
    }

    async openToastsPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.toastrMenuItem.click();
    }

    async openTooltipPge() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.tooltipMenuItem.click();
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

import { Page } from 'playwright';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutPage } from '../page-objects/formLayoutsPage';
import { DataPickerPage } from '../page-objects/dataPickerPage';

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutPage: FormLayoutPage;
    private readonly dataPickerPage: DataPickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutPage = new FormLayoutPage(this.page);
        this.dataPickerPage = new DataPickerPage(this.page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    onFormLayoutPage() {
        return this.formLayoutPage;
    }

    onDataPickerPage() {
        return this.dataPickerPage;
    }
}

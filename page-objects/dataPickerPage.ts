import { Page } from 'playwright';

export class DataPickerPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCommomDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker');
        await calendarInputField.click();
        await this.selectDateInTheCalendar(numberOfDaysFromToday);
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();
        await this.selectDateInTheCalendar(startDayFromToday);
        await this.selectDateInTheCalendar(endDayFromToday);
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDay = date.getDate().toString();
        const fullMonthValue = date.toLocaleString('EN-US', { month: 'long' });
        const expectedYear = date.getFullYear();

        await this.page.waitForTimeout(500);

        let calendarMonthAndYear: string | null = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = ` ${fullMonthValue} ${expectedYear} `;

        while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = (await this.page.locator('nb-calendar-view-mode').textContent()) || '';
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDay, { exact: true }).first().click();
    }
}

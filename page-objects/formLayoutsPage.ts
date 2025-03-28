import { Page } from 'playwright';
import { BasePage } from './basePage';

export class FormLayoutPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async submitUsingTheGridFormWithCredsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card').filter({ hasText: 'Using the Grid' });
        await usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
        await usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
        await usingTheGridForm.getByRole('button').click();
    }

    /**
     * This method fills in Inline form with user details and submit it
     * @param name - should be firstname and lastname
     * @param email - should be user's email
     * @param ifRememberMe - true or false to remember the user
     */
    async submitInlineForm(name: string, email: string, ifRememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card').filter({ hasText: 'Inline form' });
        await inlineForm.getByPlaceholder('Jane Doe').fill(name);
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);
        if (ifRememberMe) {
            await inlineForm.getByRole('checkbox').check({ force: true });
        }
        await inlineForm.getByRole('button').click();
    }
}

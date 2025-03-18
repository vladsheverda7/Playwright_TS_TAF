import { expect, Locator, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test.describe('Form Layout page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('input fields', async ({ page }) => {
        const usingGridNbCard: Locator = page.locator('nb-card').filter({ hasText: 'Using the Grid' });
        const emailField: Locator = usingGridNbCard.getByRole('textbox', { name: 'Email' });

        await emailField.fill('test@gmail.com');
        await emailField.clear();
        await emailField.pressSequentially('test2@gmail.com', { delay: 500 });

        // generic assertion

        const inputValue: string | null = await emailField.inputValue();
        expect(inputValue).toEqual('test2@gmail.com');

        // locator asserion
        await expect(emailField).toHaveValue('test2@gmail.com');
    });

    test('radio buttons', async ({ page }) => {
        const usingGridNbCard = page.locator('nb-card').filter({ hasText: 'Using the Grid' });
        const radioButtonOption1 = usingGridNbCard.getByLabel('Option 1');
        const radioButtonOption2 = usingGridNbCard.getByRole('radio', { name: 'Option 2' });

        await radioButtonOption1.check({ force: true });
        await radioButtonOption2.check({ force: true });

        // generic asserion
        const isActiveOption2: boolean = await radioButtonOption2.isChecked();
        const isActiveOption1: boolean = await radioButtonOption1.isChecked();

        expect(isActiveOption2).toBeTruthy();
        expect(isActiveOption1).toBeFalsy();

        // locator asserion
        await expect(radioButtonOption2).toBeChecked();
    });
});

test.describe('Checkboxes', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click();
        await page.getByText('Toastr').click();
    });

    test('Checkbox', async ({ page }) => {
        const hideOnClickCheckbox = page.getByRole('checkbox', { name: 'Hide on click' });
        await hideOnClickCheckbox.uncheck({ force: true });

        const preventArisingOfDuplicateToastCheckbox = page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' });
        await preventArisingOfDuplicateToastCheckbox.check({ force: true });

        await expect(preventArisingOfDuplicateToastCheckbox).toBeChecked();

        const checkboxList = page.getByRole('checkbox');

        for (const checkbox of await checkboxList.all()) {
            await checkbox.check({ force: true });
            expect(await checkbox.isChecked()).toBeTruthy();
        }

        for (const checkbox of await checkboxList.all()) {
            await checkbox.uncheck({ force: true });
            expect(await checkbox.isChecked()).toBeFalsy();
        }
    });
});

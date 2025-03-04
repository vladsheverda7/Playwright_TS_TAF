import { expect, Locator, test } from '@playwright/test';

// test.beforeAll(() => {
//     console.log('before all');
// });

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({ page }) => {
    // by Tag tame
    page.locator('input');

    // by Id
    await page.locator('#inputEmail1').click();

    //by Class value
    page.locator('.shape-rectangle');

    //by attribute
    page.locator('[placeholder="Email"]');

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    //combine different selectors
    page.locator('input[placeholder="Email"]');

    //by Xpath (not recommended)
    page.locator('//*[id="inputEmail1"]');

    //by Partial text match
    page.locator(':text("Using")');

    //by exact text match
    page.locator(':text-is("Using the Grid")');
});

test('user facing locatores', async ({ page }) => {
    // get by Role
    await page.getByRole('textbox', { name: 'Email' }).first().click();
    await page.getByRole('button', { name: 'Sign in' }).first().click();

    // get by Label
    await page.getByLabel('Email').first().click();

    // get by Placeholder
    await page.getByPlaceholder('Jane Doe').first().click();

    // get by text
    await page.getByText('Using the Grid').click();

    // get by test id
    await page.getByTestId('SignIn').click();

    // get by title
    await page.getByTitle('IoT Dashboard').click();
});

test('find child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click();

    await page.locator('nb-card').nth(3).getByRole('button').click(); // avoid it
});

test('find parent element', async ({ page }) => {
    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click();

    await page
        .locator('nb-card', { has: page.locator('#inputEmail1') })
        .getByRole('textbox', { name: 'Email' })
        .click();

    await page.locator('nb-card').filter({ hasText: 'Basic Form' }).getByRole('textbox', { name: 'Email address' }).click();
    await page
        .locator('nb-card')
        .filter({ has: page.locator('.status-danger') })
        .getByRole('textbox', { name: 'Password' })
        .click();

    await page
        .locator('nb-card')
        .filter({ has: page.locator('nb-checkbox') })
        .filter({ hasText: 'Sign in' })
        .getByRole('button', { name: 'Sign in' })
        .click();

    // Not recommended
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: 'Email' }).click();
});

test('reuse locators', async ({ page }) => {
    const basicForm: Locator = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const emailInputField: Locator = basicForm.getByRole('textbox', { name: 'Email address' });
    const passwordInputField: Locator = basicForm.getByRole('textbox', { name: 'Password' });
    const submitButton: Locator = basicForm.getByRole('button', { name: 'Submit' });

    await emailInputField.fill('email@gmail.com');
    await passwordInputField.fill('Password');
    await basicForm.locator('nb-checkbox').click();
    await submitButton.click();

    await expect(emailInputField).toHaveValue('email@gmail.com');
});

test('extract values', async ({ page }) => {
    // single text value
    const basicForm: Locator = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const buttonText: string | null = await basicForm.getByRole('button', { name: 'Submit' }).textContent();

    expect(buttonText).toEqual('Submit');

    // all text values
    const usingTheGridForm: Locator = page.locator('nb-card').filter({ hasText: 'Using the Grid' });
    const allRadioButtonLabels: Array<string> = await usingTheGridForm.locator('nb-radio').allTextContents();

    expect(allRadioButtonLabels).toContain('Option 1');

    // input field value
    const emailField: Locator = basicForm.getByRole('textbox', { name: 'Email address' });
    await emailField.fill('test@test.com');
    const emailInputVelue: string | null = await emailField.inputValue();

    expect(emailInputVelue).toEqual('test@test.com');

    // attribute value
    const placeholderEmailValue: string | null = await basicForm.getByRole('textbox', { name: 'Email address' }).getAttribute('placeholder');

    expect(placeholderEmailValue).toEqual('Email');
});

test('assertions', async ({ page }) => {
    // general assertions
    const value = 5;
    expect(value).toEqual(5);

    const basicForm: Locator = page.locator('nb-card').filter({ hasText: 'Basic form' });
    const submitButton: Locator = basicForm.locator('button');

    const sumbitButtonText: string | null = await submitButton.textContent();
    expect(sumbitButtonText).toEqual('Submit');

    // Locator assertion
    await expect(submitButton).toHaveText('Submit');

    //Soft assertion
    await expect.soft(submitButton).toHaveText('Submit5');
    await submitButton.click();
});

// test('navigate to datapicker page', async ({ page }) => {
//     await page.getByText('Datepicker').click();
// });

// test.afterEach(() => {
//     console.log('after each');
// });

// test.afterAll(() => {
//     console.log('after all');
// });

// test.describe('suite 1', () => {
//     test.beforeEach(async ({ page }) => {
//         await page.goto('http://localhost:4200/');
//         await page.getByText('Forms').click();
//         console.log('before each1');
//     });

//     test('first test', async ({ page }) => {
//         await page.getByText('Form Layouts').click();
//     });

//     test('navigate to datapicker page', async ({ page }) => {
//         await page.getByText('Datepicker').click();
//     });
// });

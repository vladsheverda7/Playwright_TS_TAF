import { test } from '@playwright/test';
import { Sign } from 'crypto';

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

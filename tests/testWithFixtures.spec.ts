import { test } from '../test-options';
import { faker } from '@faker-js/faker';

test('parametrized methods', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName();
    const randonEmail = `${randomFullName.replace(' ', '').toLowerCase()}${faker.number.int(100)}@test.com`;

    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredsAndSelectOption(randonEmail, '12345678', 'Option 2');
    await pageManager.onFormLayoutPage().submitInlineForm(randomFullName, randonEmail, true);
});

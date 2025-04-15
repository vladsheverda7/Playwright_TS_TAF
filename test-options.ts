import { test as base } from 'playwright/test';

export type TestOptions = {
    globalQAURL: string;
};

export const test = base.extend<TestOptions>({
    globalQAURL: ['', { option: true }],
});

import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './test-options';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig<TestOptions>({
    timeout: 30000,
    globalTimeout: 60000,
    expect: {
        timeout: 2000,
    },

    testDir: './tests',
    fullyParallel: true,
    retries: 1,
    reporter: 'html',

    use: {
        globalQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
        baseURL:
            process.env.DEV === '1' ? 'http://localhost:4200/' : process.env.STAGING == '1' ? 'http://localhost:4202/' : 'http://localhost:4200/',

        trace: 'on',
        video: {
            mode: 'off',
            size: {
                width: 1920,
                height: 1080,
            },
        },
        //actionTimeout: 5000,
        //navigationTimeout: 5000,
    },

    projects: [
        // {
        //     name: 'dev',
        //     use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4201/' },
        //     fullyParallel: true,
        // },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            fullyParallel: true,
        },

        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },

        {
            name: 'webkit',
            use: {
                browserName: 'webkit',
                video: {
                    mode: 'on',
                    size: {
                        width: 1920,
                        height: 1080,
                    },
                },
            },
        },
        {
            name: 'pageObjectFullScreen',
            testMatch: 'usePageObject.spec.ts',
            use: {
                viewport: {
                    width: 1920,
                    height: 1080,
                },
            },
        },
    ],
});

import { type AzureReporterOptions } from './node_modules/@alex_neo/playwright-azure-reporter';
import { type PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const options: AzureReporterOptions = {
  orgUrl: 'https://dev.azure.com/playwrightpoc',
  token: process.env.AZURE_TOKEN as string,
  planId: 3,
  projectName: 'PlaywrightPOC',
  environment: 'AQA',
  testRunTitle: 'Playwright Test Run',
  uploadAttachments: true,
  isDisabled: false,
  logging: false,
  attachmentsType: ['screenshot'],
  publishTestResultsMode: 'testRun',
  testRunConfig: {
    configurationIds: [1],
    owner: {
      displayName: 'playwrightpoc',
    },
    comment: 'Playwright Test Run',
  },
};
const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: true,
  retries: 0,
  workers: 0,
  reporter: [['list'], ['@alex_neo/playwright-azure-reporter', options]],
  use: {
    screenshot: 'on',
    actionTimeout: 0,
    trace: 'retain-on-failure',
  },
};
export default config;

import { type AzureReporterOptions } from './playwright-azure-reporter'
import { type PlaywrightTestConfig } from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config()

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
  attachmentsType: ['screenshot', 'trace', 'video'],
  publishTestResultsMode: 'testResult',
  testRunConfig: {
    configurationIds: [1],
    owner: {
      displayName: 'playwrightpoc'
    },
    comment: 'Playwright Test Run'
  }
}
const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['./playwright-azure-reporter.ts', options], ['html']],
  use: {
    viewport: { width: 1920, height: 1080 },
    screenshot: 'off',
    actionTimeout: 0,
    trace: 'retain-on-failure',
    video: 'on'
  }
}
export default config

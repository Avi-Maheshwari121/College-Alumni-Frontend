import { test, expect } from '@playwright/test';

test.describe('Frontend E2E: Base Application', () => {
  test('should successfully load the application entry point', async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');

    // Update this to exactly match the title in your index.html
    await expect(page).toHaveTitle(/alumni-app-frontend/i); 
  });
});
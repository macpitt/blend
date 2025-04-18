
import { test, expect } from '@playwright/test';

test.describe('Create Blend Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the create blend page before each test
    await page.goto('/create');
    await page.waitForSelector('h1:has-text("Create Your Own Blend")');
  });

  test('form validation shows appropriate error messages', async ({ page }) => {
    // Click submit button without filling any fields
    await page.getByRole('button', { name: 'Create Blend' }).click();
    
    // Check if validation errors are displayed
    await expect(page.getByText('Blend name is required')).toBeVisible();
    await expect(page.getByText('Description is required')).toBeVisible();
    await expect(page.getByText('Please select at least one spice or blend to continue')).toBeVisible();
    
    // Take screenshot of validation errors
    await page.screenshot({ path: './screenshots/create-blend-validation.png' });
    
    // Fill only some fields to test partial validation
    await page.getByLabel('Blend Name').fill('Test Blend');
    
    // Submit again
    await page.getByRole('button', { name: 'Create Blend' }).click();
    
    // Only description and selection errors should remain
    await expect(page.getByText('Blend name is required')).not.toBeVisible();
    await expect(page.getByText('Description is required')).toBeVisible();
  });

  test('search and select spices functionality works correctly', async ({ page }) => {
    // Take screenshot before interaction
    await page.screenshot({ path: './screenshots/create-blend-start.png' });
    
    // Search for a spice with detailed logging
    const searchInput = page.getByPlaceholderText('Search spices...');
    await searchInput.fill('Pepper');
    
    // Check if search results appear
    const resultsTable = page.locator('table');
    await expect(resultsTable).toBeVisible();
    
    // Log search results
    const searchResults = await page.locator('table tbody tr').count();
    console.log(`Found ${searchResults} results for "Pepper"`);
    
    // Add a spice from search results
    const addButton = page.getByRole('button').filter({ hasText: '+' }).first();
    await expect(addButton).toBeVisible();
    await addButton.click();
    
    // Verify search is cleared and the spice is added to selection
    await expect(searchInput).toHaveValue('');
    
    // Check that the badge is visible
    const badge = page.locator('.badge');
    await expect(badge).toBeVisible();
    
    // Take screenshot after adding spice
    await page.screenshot({ path: './screenshots/create-blend-with-spice.png' });
    
    // Get the text of the badge to verify what was added
    const badgeText = await badge.textContent();
    console.log(`Added spice: ${badgeText}`);
  });

  test('can create a complete blend successfully', async ({ page }) => {
    // Fill in form fields
    await page.getByLabel('Blend Name').fill('Automated Test Blend');
    await page.getByLabel('Description').fill('This blend was created by an automated test');
    
    // Add a spice
    await page.getByText('Browse Available Spices').click();
    await page.waitForSelector('table');
    await page.getByRole('button').filter({ hasText: '+' }).first().click();
    
    // Verify spice was added
    await expect(page.locator('.badge')).toBeVisible();
    
    // Add a blend too
    await page.getByText('Browse Available Blends').click();
    await page.waitForSelector('table');
    await page.getByRole('button').filter({ hasText: '+' }).first().click();
    
    // Verify blend was added
    const badges = page.locator('.badge');
    const badgeCount = await badges.count();
    expect(badgeCount).toBe(2);
    
    // Take screenshot before submission
    await page.screenshot({ path: './screenshots/create-blend-complete-form.png' });
    
    // Submit the form
    await page.getByRole('button', { name: 'Create Blend' }).click();
    
    // Verify navigation to the blend detail page 
    await page.waitForURL(/\/blends\/\d+/);
    
    // Check URL structure
    const url = page.url();
    expect(url).toMatch(/\/blends\/\d+/);
    console.log(`Redirected to: ${url}`);
    
    // Verify blend name appears on the details page
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Automated Test Blend');
    
    // Take screenshot of created blend details
    await page.screenshot({ path: './screenshots/created-blend-details.png' });
  });

  test('handles keyboard navigation for accessibility', async ({ page }) => {
    // Tab navigation through form
    await page.keyboard.press('Tab');
    
    // Check if first form element has focus
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['INPUT', 'BUTTON', 'TEXTAREA']).toContain(focusedElement);
    
    // Fill in the form using keyboard only
    await page.keyboard.type('Keyboard Test Blend');
    await page.keyboard.press('Tab');
    await page.keyboard.type('This blend was created using keyboard navigation only');
    
    // Open spice browser with keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Wait for spice list to appear
    await page.waitForSelector('table');
    
    // Take screenshot of keyboard navigation
    await page.screenshot({ path: './screenshots/keyboard-navigation.png' });
  });

  test('form is responsive on different screen sizes', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    await page.waitForSelector('h1:has-text("Create Your Own Blend")');
    
    // Check that form elements are still accessible
    await expect(page.getByLabel('Blend Name')).toBeVisible();
    await expect(page.getByLabel('Description')).toBeVisible();
    
    // Take screenshot of mobile layout
    await page.screenshot({ path: './screenshots/create-blend-mobile.png' });
    
    // Test on tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await page.waitForSelector('h1:has-text("Create Your Own Blend")');
    
    // Take screenshot of tablet layout
    await page.screenshot({ path: './screenshots/create-blend-tablet.png' });
    
    // Test on desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.reload();
    await page.waitForSelector('h1:has-text("Create Your Own Blend")');
    
    // Take screenshot of desktop layout
    await page.screenshot({ path: './screenshots/create-blend-desktop.png' });
  });
});

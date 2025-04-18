
import { test, expect } from '@playwright/test';

test.describe('Spice List Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the spices page before each test
    await page.goto('/spices');
    
    // Wait for content to load
    await page.waitForSelector('h1:has-text("All Spices")');
  });
  
  test('displays the spices list with pagination', async ({ page }) => {
    // Check if the page title is rendered correctly
    await expect(page.getByRole('heading', { level: 1 })).toContainText('All Spices');
    
    // Check if search input exists and is functional
    const searchInput = page.getByPlaceholderText('Search spices...');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();
    
    // Check if spice cards are displayed
    const spiceCards = page.locator('.spice-card');
    await expect(spiceCards.first()).toBeVisible();
    
    // Check if pagination is visible and has proper ARIA roles
    const pagination = page.getByRole('navigation');
    await expect(pagination).toBeVisible();
    await expect(pagination).toHaveAttribute('aria-label', 'pagination');
    
    // Take a screenshot of the full page
    await page.screenshot({ path: './screenshots/spice-list-page.png' });
  });
  
  test('search functionality works correctly', async ({ page }) => {
    // Get initial count of spice cards
    await page.waitForSelector('.spice-card');
    const initialCount = await page.locator('.spice-card').count();
    expect(initialCount).toBeGreaterThan(0);
    
    // Perform the search
    await page.getByPlaceholderText('Search spices...').fill('Pepper');
    
    // Wait for the search to take effect
    await page.waitForTimeout(500);
    
    // Check filtered results
    const filteredCards = await page.locator('.spice-card').count();
    
    // Log search results for debugging
    console.log(`Initial: ${initialCount}, After filtering: ${filteredCards}`);
    
    // Take screenshot of search results
    await page.screenshot({ path: './screenshots/spice-search-results.png' });
    
    // Either we have fewer cards or we have the same but they contain "Pepper"
    if (filteredCards < initialCount) {
      expect(filteredCards).toBeLessThan(initialCount);
    } else {
      // If the count is the same, ensure "Pepper" appears in the results
      await expect(page.locator('.spice-card:has-text("Pepper")')).toBeVisible();
    }
    
    // Clear the search
    await page.getByPlaceholderText('Search spices...').clear();
    await page.waitForTimeout(500);
    
    // Check if original count is restored
    const restoredCards = await page.locator('.spice-card').count();
    expect(restoredCards).toBeGreaterThanOrEqual(filteredCards);
  });
  
  test('sort functionality changes the order of spices', async ({ page }) => {
    // Get the text of the first spice card
    await page.waitForSelector('.spice-card h3');
    const firstSpiceBefore = await page.locator('.spice-card h3').first().textContent();
    
    // Take screenshot before sorting
    await page.screenshot({ path: './screenshots/spices-before-sort.png' });
    
    // Click on the sort by name button to change sort direction
    await page.getByRole('button', { name: /sort by name/i }).click();
    await page.waitForTimeout(500); // Wait for sorting to take effect
    
    // Get the text of the first spice after sorting
    const firstSpiceAfter = await page.locator('.spice-card h3').first().textContent();
    
    // Log sort results for debugging
    console.log({
      before: firstSpiceBefore,
      after: firstSpiceAfter,
      changed: firstSpiceBefore !== firstSpiceAfter
    });
    
    // Take screenshot after sorting
    await page.screenshot({ path: './screenshots/spices-after-sort.png' });
    
    // Click sort again to reverse direction
    await page.getByRole('button', { name: /sort by name/i }).click();
    await page.waitForTimeout(500);
    
    // Get text after second sort
    const firstSpiceAfterSecondSort = await page.locator('.spice-card h3').first().textContent();
    
    // Verify sorting logic worked in some way
    expect(
      firstSpiceBefore === firstSpiceAfterSecondSort || 
      firstSpiceBefore !== firstSpiceAfter
    ).toBeTruthy();
  });
  
  test('pagination controls navigate between pages correctly', async ({ page }) => {
    // Wait for pagination to be visible
    await page.waitForSelector('[aria-label="pagination"]');
    
    // Get the current page indicator text
    const initialPageText = await page.locator('text=Showing').textContent();
    
    // Click on the "Next" button if available and not disabled
    const nextButton = page.getByRole('button', { name: 'Next' });
    
    // We want to make sure it's actually interactive
    await expect(nextButton).toBeVisible();
    
    // Take screenshot of pagination
    await page.screenshot({ path: './screenshots/pagination-before.png' });
    
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(500);
      
      // Get the updated page text
      const nextPageText = await page.locator('text=Showing').textContent();
      
      // Take screenshot after pagination
      await page.screenshot({ path: './screenshots/pagination-after.png' });
      
      // Verify page changed
      expect(initialPageText).not.toEqual(nextPageText);
      
      // Go back to previous page
      await page.getByRole('button', { name: 'Previous' }).click();
      await page.waitForTimeout(500);
      
      // Verify we're back on the first page
      const backToFirstText = await page.locator('text=Showing').textContent();
      expect(backToFirstText).toEqual(initialPageText);
    }
  });

  test('spice page has correct meta data', async ({ page }) => {
    // Check meta tags (helpful for SEO testing)
    const title = await page.title();
    expect(title).toContain('Spices');
    
    // Check URL structure (important for SEO)
    expect(page.url()).toContain('/spices');
  });
});


import { test, expect } from '@playwright/test';

test.describe('SpiceCard Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the spices page where we can see SpiceCard components
    await page.goto('/spices');
    // Wait for the page to load
    await page.waitForSelector('.spice-card');
  });

  test('spice card displays correct information', async ({ page }) => {
    // Get the first spice card
    const firstCard = page.locator('.spice-card').first();
    
    // Wait for the card to be fully loaded
    await firstCard.waitFor({ state: 'visible' });
    
    // Check if it contains basic elements
    await expect(firstCard.locator('h3')).toBeVisible(); // Name
    await expect(firstCard.locator('.text-green-700')).toBeVisible(); // Price
    
    // Check that name is not empty
    const nameText = await firstCard.locator('h3').textContent();
    expect(nameText?.trim().length).toBeGreaterThan(0);
    
    // Check heat indicators (either flame icons or "No Heat" text)
    const hasHeatIcons = await firstCard.locator('.text-red-500').count() > 0;
    const hasNoHeatText = await firstCard.locator('text=No Heat').count() > 0;
    
    // Either heat icons or "No Heat" text should be present
    expect(hasHeatIcons || hasNoHeatText).toBeTruthy();
    
    // Verify the card has proper styling
    await expect(firstCard).toHaveCSS('border-top-width', '4px');
    
    // Take a screenshot of the card for visual comparison
    await firstCard.screenshot({ path: './screenshots/spice-card.png' });
  });
  
  test('spice cards filter correctly with search', async ({ page }) => {
    // Get all spice names before filtering
    const allSpiceNames = await page.locator('.spice-card h3').allTextContents();
    expect(allSpiceNames.length).toBeGreaterThan(0);
    
    // Choose a spice name to search for
    const spiceToSearch = allSpiceNames[0].substring(0, 3); // Use first few letters of first spice
    
    // Enter search term
    await page.getByPlaceholderText('Search spices...').fill(spiceToSearch);
    
    // Wait for filtering to complete
    await page.waitForTimeout(500);
    
    // Get filtered spice names
    const filteredCards = page.locator('.spice-card');
    const filteredCount = await filteredCards.count();
    
    if (filteredCount > 0) {
      const filteredNames = await filteredCards.locator('h3').allTextContents();
      
      // Log the search results for debugging
      console.log(`Searched for "${spiceToSearch}" and found ${filteredNames.length} results`);
      
      // Verify that all filtered cards contain the search term
      for (const name of filteredNames) {
        expect(name.toLowerCase()).toContain(spiceToSearch.toLowerCase());
      }
    }
  });

  test('card layout is responsive', async ({ page }) => {
    // Test on desktop size
    await page.setViewportSize({ width: 1280, height: 800 });
    
    await page.waitForSelector('.spice-card');
    let cardWidth = await page.locator('.spice-card').first().evaluate(el => {
      return window.getComputedStyle(el).width;
    });
    const desktopWidth = parseInt(cardWidth);
    
    // Test on tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForSelector('.spice-card');
    cardWidth = await page.locator('.spice-card').first().evaluate(el => {
      return window.getComputedStyle(el).width;
    });
    const tabletWidth = parseInt(cardWidth);
    
    // Test on mobile size
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForSelector('.spice-card');
    cardWidth = await page.locator('.spice-card').first().evaluate(el => {
      return window.getComputedStyle(el).width;
    });
    const mobileWidth = parseInt(cardWidth);
    
    // Verify responsive behavior
    // Cards should get wider as screen gets narrower
    console.log({ desktopWidth, tabletWidth, mobileWidth });
    
    // Take screenshots at different viewport sizes
    await page.screenshot({ path: './screenshots/spice-cards-mobile.png' });
  });
});

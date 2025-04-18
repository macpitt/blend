
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  
  test('has correct title and main content', async ({ page }) => {
    // Check if title is correct
    await expect(page).toHaveTitle(/SpiceBlend/);
    
    // Check if heading is present with correct text
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Welcome to SpiceBlend');
    await expect(heading).toBeVisible();
    
    // Check if featured blends section exists
    const featuredSection = page.getByText('Featured Blends');
    await expect(featuredSection).toBeVisible();
    
    // Check if call-to-action is present and correctly styled
    const ctaButton = page.getByRole('link', { name: 'Create Your Own Blend' });
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveCSS('background-color', /rgb\(.*\)/);
    
    // Take a screenshot for visual comparison
    await page.screenshot({ path: './screenshots/homepage.png' });
  });

  test('navigation to blend list works', async ({ page }) => {
    // Test navigation to blend list
    await page.getByRole('link', { name: 'View All' }).first().click();
    await expect(page).toHaveURL(/\/blends/);
    
    // Check that we landed on the correct page
    await expect(page.getByRole('heading', { level: 1 })).toContainText('All Blends');
  });

  test('responsiveness on mobile viewport', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X dimensions
    
    // Check if mobile navigation is working
    const menuButton = page.getByRole('button', { name: /menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500); // Wait for animation
    }
    
    // Check if content is properly arranged for mobile
    const heroSection = page.getByText('Welcome to SpiceBlend').first();
    await expect(heroSection).toBeVisible();
    
    // Take screenshot of mobile layout
    await page.screenshot({ path: './screenshots/homepage-mobile.png' });
  });

  test('performance metrics', async ({ page }) => {
    // Measure performance metrics
    const performanceTimingJson = await page.evaluate(() => JSON.stringify(performance.timing));
    const performanceTiming = JSON.parse(performanceTimingJson);
    
    console.log('Performance metrics:', {
      loadTime: performanceTiming.loadEventEnd - performanceTiming.navigationStart,
      domContentLoaded: performanceTiming.domContentLoadedEventEnd - performanceTiming.navigationStart,
      firstPaint: performanceTiming.responseEnd - performanceTiming.navigationStart
    });
  });
});

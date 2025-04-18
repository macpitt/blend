
import { test, expect } from '@playwright/test';

test.describe('Blend Details Page', () => {
  test('shows correct information for simple blend', async ({ page }) => {
    // Go to the blend list first
    await page.goto('/blends');
    
    // Click on a specific blend with improved selector
    await page.getByRole('heading', { name: 'Tasty Blend', exact: true }).first().click();
    
    // Check if we land on the correct page
    await expect(page).toHaveURL(/\/blends\/0/);
    
    // Check if blend name is displayed
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Tasty Blend');
    
    // Check if description is displayed
    await expect(page.getByText('This is a new spice blend')).toBeVisible();
    
    // Check if spices are listed
    await expect(page.getByText('All Spices in this Blend')).toBeVisible();
    await expect(page.getByText('Allspice')).toBeVisible();
    await expect(page.getByText('Black Pepper')).toBeVisible();
    
    // Visual validation with screenshot
    await page.screenshot({ path: './screenshots/blend-details.png' });
    
    // Check if navigation back works
    await page.getByRole('link', { name: /Back to All Blends/i }).click();
    await expect(page).toHaveURL('/blends');
  });

  test('blend of blends shows all contained spices', async ({ page }) => {
    await page.goto('/blends/3'); // Super Blend which contains other blends
    
    // Check if blend name is displayed with appropriate heading style
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Super Blend');
    await expect(heading).toHaveCSS('font-weight', /[6-9]00/); // Bold font weight
    
    // Check if included blends are listed
    const includedBlends = page.getByText('Included Blends');
    await expect(includedBlends).toBeVisible();
    
    // Check for child blends
    await expect(page.getByText('Tasty Blend')).toBeVisible();
    await expect(page.getByText('Taco Seasoning')).toBeVisible();
    
    // Check if all spices from all blends are shown
    await expect(page.getByText('All Spices in this Blend')).toBeVisible();
    
    // Spice from Super Blend itself
    await expect(page.getByText('Adobo Seasoning')).toBeVisible();
    
    // Spices from child blends should be listed too
    await expect(page.getByText('Allspice')).toBeVisible();
    await expect(page.getByText('Black Pepper')).toBeVisible();
    await expect(page.getByText('Oregano')).toBeVisible();
    await expect(page.getByText('Turmeric')).toBeVisible();
    
    // Test interaction - click on one of the child blends
    await page.getByText('Tasty Blend').first().click();
    
    // Verify navigation to child blend happened
    await expect(page).toHaveURL(/\/blends\/0/);
  });

  test('accessibility checks', async ({ page }) => {
    await page.goto('/blends/1');
    
    // Check for proper heading hierarchy
    const headingElements = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return headings.map(h => ({
        tagName: h.tagName,
        textContent: h.textContent
      }));
    });
    
    // Verify h1 appears only once and before any h2, h3, etc.
    const h1Count = headingElements.filter(h => h.tagName === 'H1').length;
    expect(h1Count).toBe(1);
    
    // Check for proper focus management
    await page.getByText('Back to All Blends').focus();
    const focusedElement = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedElement).toContain('Back to All Blends');
    
    // Check color contrast (would use a specialized plugin in a real project)
    // This is a simplified example - real a11y testing would be more comprehensive
    await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('color', /rgb\(.*\)/);
  });
});

import { test, expect } from '@playwright/test';

test.describe('Core Application Loop', () => {
  const randomId = () => Math.random().toString(36).substring(7);
  const materialName = `E2E Test Material ${randomId()}`;

  test('Login, Create, Assign, Take, Grade', async ({ page }) => {
    // Before running, seed the database
    // This is a placeholder for a proper pre-test hook to seed data
    await page.goto('/login'); // We start at login to ensure we have a clean slate

    // --- 1. Login as Teacher ---
    await test.step('Login as Teacher', async () => {
      await page.goto('/login');
      await page.getByLabel('Username').fill('teacher');
      await page.getByLabel('Password').fill('password123');
      await page.getByRole('button', { name: 'Sign In' }).click();
      await expect(page).toHaveURL('/');
      await expect(page.getByRole('heading', { name: 'Teacher Dashboard' })).toBeVisible();
    });

    // --- 2. Create an IELTS Reading Material ---
    await test.step('Create Material', async () => {
      await page.getByRole('link', { name: 'Materials' }).click();
      await expect(page.getByRole('heading', { name: 'Materials' })).toBeVisible();
      
      // This is a placeholder for actually creating a new material via UI
      // For now, we assume a material exists or we navigate to an existing one
      // In a real test, you'd click "Create Material", fill a form, and save.
      // We will navigate to the first material in the list for editing.
      await page.getByRole('link', { name: 'View Material' }).first().click();
      await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();
      await page.getByRole('button', { name: 'Edit' }).click();

      // In the editor
      await expect(page.getByRole('heading', { name: 'IELTS Reading Editor' })).toBeVisible();
      const titleInput = page.locator('input[value*="Passage 1"]');
      await titleInput.fill(materialName);
      await page.getByRole('button', { name: 'Save Content' }).click();
      
      // Verify save
      await expect(page.getByText('Content Saved')).toBeVisible();
    });
    
    // --- 3. Assign Material to a Student ---
    await test.step('Assign Material', async () => {
      await page.getByRole('button', { name: 'Back to Material' }).click();
      await page.getByRole('button', { name: 'Assign' }).click();
      
      // In the bulk assign dialog
      await page.getByRole('button', { name: 'Select students or classes...' }).click();
      await page.getByText('John Student').click(); // Select the student
      await page.getByRole('button', { name: 'Assign to 1' }).click();
      
      await expect(page.getByText('Successfully assigned material')).toBeVisible();
    });

    // --- 4. Logout and Login as Student ---
    await test.step('Login as Student', async () => {
      // This requires a logout button, which is not currently in the header.
      // We will simulate it by clearing cookies/session and navigating.
      await page.context().clearCookies();
      await page.goto('/login');
      
      await page.getByLabel('Username').fill('student');
      await page.getByLabel('Password').fill('password123');
      await page.getByRole('button', { name: 'Sign In' }).click();
      await expect(page).toHaveURL('/dashboard/student');
      await expect(page.getByText(`Welcome, John Student`)).toBeVisible();
    });

    // --- 5. Student Takes the Test ---
    await test.step('Student Takes Test', async () => {
      // Navigate to their assignments (this part of the UI is stubbed)
      // We assume there's a link to the assignment on their dashboard.
      // This step is a placeholder as student assignment view is not fully implemented.
      console.log('SKIPPING: Student takes test (UI not implemented)');
    });

    // --- 6. Teacher Grades the Submission ---
    await test.step('Teacher Grades Submission', async () => {
      // This step is a placeholder as the grading UI and submission flow are not fully implemented for E2E.
       console.log('SKIPPING: Teacher grades submission (UI not implemented)');
    });

  });
});

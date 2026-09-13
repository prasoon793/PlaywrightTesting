const {test, expect} = require('@playwright/test')
test('EventHub', async ({page})=>{
await page.goto('https://eventhub.rahulshettyacademy.com/login');
/*
await page.locator('p a[href="/register"]').click();
await page.locator('#register-email').fill('Prasoon@gmail.com');
await page.getByPlaceholder('Min 8 chars, uppercase, number & symbol').fill('94512@pS$');
await page.getByPlaceholder('Repeat your password').fill('94512@pS$');
await page.getByRole('button',{name:'Create Account'}).click();
await page.pause();
*/

await page.locator("#email").fill('prasoon@gmail.com');
await page.locator('#password').fill('945124@pS$');
//await page.pause();
await page.locator('#login-btn').click();
await page.locator("article[data-testid='event-card']").first().waitFor();
const events= await page.locator("article[data-testid='event-card']").all();
for( const event of events)
{
    const amount= await event.locator('p').first().textContent();
    if(amount.trim()=='$1,500')
    {
        console.log("found")
        await event.locator('#book-now-btn').click();
    }
}
await page.getByRole('button', {name:'+'}).click();
//await page.pause();
await page.getByLabel('Full Name').fill('Prasoon Shukla');
await page.locator('#customer-email').fill('prasoon@gmail.com');
await page.locator('#phone').fill('9451240057');
await page.getByRole('button',{name:'Confirm Booking'}).click();
await page.pause();
await expect(page.getByText('Booking Confirmed! 🎉')).toBeVisible();


})
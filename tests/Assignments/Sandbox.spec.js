const {test,expect}= require('@playwright/test')
let webContext;
const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
}

test.beforeAll(async({browser})=>{
  const context= await browser.newContext();
  const page= await context.newPage();
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.locator('#email').fill('prasoon@gmail.com');
  await page.locator('#password').fill('945124@pS$');
  await page.locator('#login-btn').click();
  await page.waitForURL('https://eventhub.rahulshettyacademy.com/');
  await context.storageState({path:'storage.json'})
  webContext= await browser.newContext({storageState:'storage.json'});

})


test('Sandbox Assignment' , async()=>{

const page= await webContext.newPage();
await page.route('**/api/events**', async route=>{
  
  await route.fulfill({
    status:200,
    contentType:'application/json',
    body: JSON.stringify(SIX_EVENTS_RESPONSE)
  })
})
await page.goto('https://eventhub.rahulshettyacademy.com/events');
const eventCard=await page.locator("[data-testid*='event-card']")
await expect(eventCard.first()).toBeVisible();
await expect(eventCard).toHaveCount(6);
//await page.pause();
const banner = await page.getByText('sandbox');
await expect(banner).toBeVisible();
await expect(banner).toContainText('sandbox holds up to');

})
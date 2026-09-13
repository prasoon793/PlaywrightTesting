const {test, expect}= require('@playwright/test');

test('Create Event' , async ({page})=>{

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
await page.locator("#email").fill('prasoon@gmail.com');
await page.locator('#password').fill('945124@pS$');

await page.locator('#login-btn').click();
await page.locator('[data-testid="nav-events"]').click();
await page.getByRole('button',{name:'Add New Event'}).click();
await page.locator('#event-title-input').fill('E20 Summit');
await page.getByPlaceholder('Describe the event…').fill('E20 fuel ek prakar ka eco-friendly fuel hai jisme 20% Ethanol (alcohol jo ganna ya makka jaisi faslo se banta hai) aur 80% Petrol ka mishran hota hai. Bharat sarkar desh ko videshi kacche tel (crude oil) par kam nirbhar banane ke liye is fuel par tezi se shift kar rahi hai.');
await page.locator('#category').selectOption('Sports');
await page.getByLabel('city').fill('Lucknow');
await page.locator('#venue').fill('1090 Chowk');
await page.locator("[type='datetime-local']").click();
await page.locator("[type='datetime-local']").fill('2026-10-29T16:56');
await page.getByPlaceholder('0.00').fill('100');
await page.locator('[id=total-seats]').fill('1000');
//await page.pause();
await page.getByRole('button', {name:'Add Event'}).click();

console.log('Event is added');


//How to Handel the Table
const rows= await page.locator('tr[data-testid="event-table-row"]');
const count= await rows.count();
 console.log(rows);
 console.log(count);
for(let i=0;i<count;i++)
{
    const row= rows.nth(i);
    const titletext=await row.locator("td").first().textContent();

    if(titletext && titletext.includes('E20'))
    {
        console.log('mil gya button');
       expect(  await  row.locator("button[id='delete-event-btn']").isVisible());
    }
   
    
    

}

})
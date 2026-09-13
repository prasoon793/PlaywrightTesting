const {test}=require('@playwright/test');

//remove redundent booking
test('Check My bookings' , async({page})=>{

await page.goto('https://eventhub.rahulshettyacademy.com/login');

await page.locator("#email").fill('prasoon@gmail.com');
await page.locator('#password').fill('945124@pS$');
//await page.pause();
await page.locator('#login-btn').click();
//await page.locator('a[href="/bookings"]').first().waitFor();
await page.locator('a[href="/bookings"]').nth(0).click();
await page.locator('[data-testid="booking-card"]').first().waitFor();
/* Normal solution 
const bookings=await page.locator('[data-testid="booking-card"]').all();
console.log(bookings);
let isSubmit=false;
for(const book of bookings)
{
    const event=await book.locator('h3').textContent();
    if(event=='World Tech Summit')
    {
        if(isSubmit==false)
        {
            console.log('Original booking');
            isSubmit=true;
        }
        else
        {
        await book.getByRole('button',{name:'Cancel Booking'}).click();
        await page.locator("#confirm-dialog-yes").click();
        }

        console.log('pass');
    }
}
*/


//SDET solution
while(true)
{

    const bookings=await page.locator('[data-testid="booking-card"]');
    const siz=await bookings.count();
    let foundcount=0;
    let targetitem=null;
    await page.pause();
    for(let i=0;i<siz;i++)
    {
        const currentCard=bookings.nth(i);
        const eventName=await currentCard.locator('h3').textContent();
        if(eventName==='World Tech Summit')
        {
            console.log('submit ke andr')
            foundcount++;
            if(foundcount>1)
            {
                targetitem=currentCard;
                break;
            }
        }
    }

    if(foundcount>1 && targetitem)
    {
        console.log("cancelling it");
        await targetitem.getByRole('button',{name:'Cancel Booking'}).click();
        await page.locator("#confirm-dialog-yes").click();
        await page.waitForTimeout(2000);

    }
    else
    {
        await page.pause();
        console.log("completed ")
        break;
    }





}
})
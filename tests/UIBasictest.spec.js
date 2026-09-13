const {test}= require('@playwright/test');
 

//{ } is bracket me jo hoga vo object hoga

//test takes 2 arguments first is the test case name and second is the function
//test is the function used to define a test case
// {page} it is the function which contains our test steps.
test('FirstAutomation', async({page})=>{
//Open this URL in the browser page that Playwright created for this test.
    
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
/*const context= await browser.newContext();
const page= await context.newPage(); //this is the default page and it does not have knowledge outside this page
*/
await page.locator("#userEmail").fill("Prasoonshukla24@gmail.com");
await page.locator("#userPassword").fill("9451240057");
await page.locator("#login").click();
const documentLink=await page.locator("[class='blinkingText']");
await page.getByText("jobs").click();
const [newPage]=await Promise.all(
    [context.waitForEvent('page'),
        documentLink.click()
    ]
);
await page.pause();

})
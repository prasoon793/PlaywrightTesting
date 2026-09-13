const {test} = require('@playwright/test')
let webContext;
const fakepayload={data:[], message:"No Orders"}
test.beforeAll(async({browser})=>{
const context= await browser.newContext();
const page= await context.newPage();
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator('#userEmail').fill('Prasoonshukla24@gmail.com');
await page.locator('#userPassword').fill('9451240057')
await page.locator('#login').click();

await page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
await context.storageState({path:'statePractice.json'});

webContext= await browser.newContext({storageState:'statePractice.json'});

})



test('Network Interception Practice',async ()=>{
    const page= await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    //verify when there is no order show no order present without deleting the test data
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/689e3ca66f585eb60d78c477", async route=>{
        //intercepting the response in route
        /*
        Lifecycle of response
Intercepting the response -> API Response -> Browser-> render data on front end

To intercept the calls  we need playwright to stop before browser means stop on api response and send
Fake response to browser
Intercepting response-> api response->  fake response -> browser->render data

        */
let body=JSON.stringify(fakepayload);
const response=await page.request.fetch(route.request())
await route.fulfill({//send response back to browser
response,//response what we are getting
body //overwrite the existing body and inject this body
});
});
await page.locator("[routerlink='/dashboard/myorders']").click() //all the calls we need to make before clicking

})

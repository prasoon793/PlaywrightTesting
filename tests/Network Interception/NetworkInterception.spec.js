const {test}= require('@playwright/test');
//const { request } = require('node:http');
let webContext;
const fakepayload='{data:[], message:"No Orders"}'
test.beforeAll(async({browser})=>{
    const context= await browser.newContext();
    const page= await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('Prasoonshukla24@gmail.com');
    await page.locator('#userPassword').fill('9451240057')
    await page.locator('#login').click();
    await page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/dash')
    
    await context.storageState({path:'storage.json'});
    webContext= await browser.newContext({storageState:'storage.json'})

})
const body=JSON.stringify(fakepayload);
test('Network Interception and login', async ({request})=>{
  //
    const page= await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/689e3ca66f585eb60d78c477', async route=>{
        const response= await page.request.fetch(route.request());
        await route.fulfill({
            response,
            body
        })
    })
await page.locator("[routerlink='/dashboard/myorders']").click() //all the calls we need to make before clicking
})
const loginPayload={userEmail:"Prasoonshukla24@gmail.com",userPassword: "9451240057"}
test ('See other method of login',async()=>{
    const apiContext= await request.newContext();
    const alllogindata=await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:loginPayload});
    const alllogindataJson= await alllogindata.json();
    const token= alllogindataJson.token;
    console.log(token);
})
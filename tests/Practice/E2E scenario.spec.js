const {test,request,expect}= require('@playwright/test')
const {APIUtilsPractice} =require('../UTILS/APIUtilspractice')
let apiContext;
const logindata={userEmail: "Prasoonshukla24@gmail.com",userPassword: "9451240057"}
let token;
let apiutilspractice;
const datapresent=
{
    maxPrice: null,
    minPrice: null,
    productCategory: [],
    productFor: [],
    productName: ""
}
let userId;
//
test.beforeAll(async()=>{
    apiContext= await request.newContext();
    apiutilspractice= new APIUtilsPractice(apiContext, logindata);
     token=await apiutilspractice.getToken();
    userId=await apiutilspractice.userId;
     console.log(token);
    const ispresent=await apiutilspractice.checkproductspresent(datapresent);
    if(ispresent)
    {
        console.log('got the elements');
    }
    
})
//to set the token every time we got logged in
test.beforeEach(async({page})=>{
if(token)
{
    await page.addInitScript((value)=>{
        window.localStorage.setItem('token',value);

    },token)
}


})
test('E2E scenario API',async({page,request})=>{
    console.log('see if data is present or not');
  await page.addInitScript((value)=>{
    window.localStorage.setItem('token',value);

  },token)
const productOrder='iphone 13 pro';
 const productobject=await apiutilspractice.IphoneId(datapresent,productOrder,token);

 const cartPayload = {
        
        "_id": userId,
        'product': productobject
    };

 const orderProduct=await apiutilspractice.OrderIphone(cartPayload,token);

 console.log("Order Successfully created",orderProduct)

 
})

//UI Validation
test('UI Validation E2E', async({page})=>{
const expectedText=" Thankyou for the order. ";
await  apiutilspractice.UiaddtoCart(page,expectedText);


})
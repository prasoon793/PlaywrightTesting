const {test,request, expect}= require('@playwright/test');
const loginPayload= {userEmail: "Prasoonshukla24@gmail.com",userPassword: "9451240057"}
let token;
let apiContext;
test.beforeAll (async()=>
{
    apiContext=await request.newContext();
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson=await loginResponse.json();
    token=loginResponseJson.token;
    console.log(token);

    

});



test('Ordering coat',async ({page,request})=>{
   const product= await apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart',
    {data:
        {
        "_id": "689e3ca66f585eb60d78c477",
       "product": {
            
  "_id": "6960eac0c941646b7a8b3e68",
  "productName": "ZARA COAT 3",
  "productCategory": "electronics",
  "productSubCategory": "mobiles",
  "productPrice": 11500,
  "productDescription": "Apple phone",
  "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959232316.jpeg",
  "productRating": "0",
  "productTotalOrders": "0",
  "productStatus": true,
  "productFor": "women",
  "productAddedBy": "admin",
  "__v": 0
       }
},

headers:
{
    'Authorization': token,
    'content-type':'application/json'
}
});

expect(product.ok()).toBeTruthy();
console.log('Passed');    


})


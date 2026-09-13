const {test,request, expect}= require('@playwright/test');

const loginPayload={userEmail:'Prasoonshukla24@gmail.com', userPassword: '9451240057'};
let apiContext;
let token;

    test.beforeAll (async ()=>{
        apiContext=await request.newContext();
     const loginResponse= await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        
      {data:loginPayload});   

      expect(loginResponse.ok()).toBeTruthy();

      const loginResponseJson=await loginResponse.json();
      token=loginResponseJson.token;
      console.log(token);
     

});
    
test('ADD TO CART', async ({page,request})=>{

    //const cartResponse=await request.newContext();
    const addProducts= await apiContext.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart",
        {data: 

    {
        
  "_id": "689e3ca66f585eb60d78c477",
  "product": {
    "_id": "6960ea76c941646b7a8b3dd5",
    "productName": "iphone 13 pro",
    "productCategory": "electronics",
    "productSubCategory": "mobiles",
    "productPrice": 55000,
    "productDescription": "Apple phone",
    "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959158182.jpg",
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
'Authorization':token,
'content-type': 'application/json'
}
});
expect(addProducts.ok()).toBeTruthy();
console.log('Passed');
});


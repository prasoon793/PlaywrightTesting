//Using Hybrid approach for the API and UI validation
//Verify if we click on 2 products both are added in the cart and the response is coming correctly

const {test,request, expect}= require('@playwright/test');
let apiContext;
let token;
const loginCred={userEmail: "Prasoonshukla24@gmail.com", userPassword: "9451240057"}
const FirstProduct= 
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
}

const secondProduct=
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
}
//login Method
test.beforeAll(async()=>{
apiContext=await request.newContext();
const Login=await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:loginCred});
expect(Login.ok()).toBeTruthy();
const LoginJson= await Login.json();
token=LoginJson.token;
console.log(token);
})

test('Ordering Two Products',async({page,request})=>{

    await page.addInitScript((value)=>
        {
            window.localStorage.setItem('token',value);

        },token)

const FirstProductCart=await apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart'
    ,{data:FirstProduct,
        headers:
    {
         'Authorization':token,
         'content-type':'application/json'
    }
    
    });
    expect(FirstProductCart.ok()).toBeTruthy();
    console.log('Means items are now added in the cart');


    const secondProductCart= await apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart',{data:secondProduct,

        headers:
        {
            'authorization':token,
            'content-type':'application/json'
        }
    })
    expect(secondProductCart.ok()).toBeTruthy();
    console.log('Second product also added');
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    await page.locator('button[routerlink="/dashboard/cart"]').click();
    await page.getByRole('button',{name:'Checkout'}).click();
    const Country= page.locator("[placeholder='Select Country']").first()
    await Country.pressSequentially('India');
    await page.getByText('India').nth(1).click();
   await page.pause();
    await page.locator("div a[class*='btnn']").click();

})



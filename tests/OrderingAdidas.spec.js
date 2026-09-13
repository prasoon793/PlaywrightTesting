const {test,request, expect}= require('@playwright/test');
let apiContext;
let token;
const loginData= { userEmail:"Prasoonshukla24@gmail.com", userPassword: "9451240057"}
const OrderingData=
{
  _id: "689e3ca66f585eb60d78c477",
  product: {
    _id: "6960eae1c941646b7a8b3ed3",
    productName: "ADIDAS ORIGINAL",
    productCategory: "electronics",
    productSubCategory: "mobiles",
    productPrice: 11500,
    productDescription: "Apple phone",
    productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959265156.jpg",
    productRating: "0",
    productTotalOrders: "0",
    productStatus: true,
    productFor: "women",
    productAddedBy: "admin",
    __v: 0
  }
}

const addTocart=
{
  "orders": [
    {
      "country": "India",
      "productOrderedId": "6960eae1c941646b7a8b3ed3"
    }
  ]
}

test.beforeAll(async ()=>{
apiContext=await request.newContext()
const loginResponse=await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:loginData});
expect(loginResponse.ok()).toBeTruthy();
const loginResponseJson=await loginResponse.json();
token=loginResponseJson.token;
console.log(token);
})


test('Ordering Adidas Shoes', async ({page,request})=>{
    //Injecting token in the local storage in browser
    //add initScript is a js function which is used to run JS
    await page.addInitScript((value)=>{ 
        window.localStorage.setItem('token',value);     
    },token);

await page.goto('https://rahulshettyacademy.com/client/#/auth/');
    const AdidasShoes =await apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart',{data:OrderingData,  
    
        headers:
        {
            'Authorization':token,
            'content-type':'application/json'
        }});

        expect(AdidasShoes.ok()).toBeTruthy();
      

//     await page.getByRole('button',{name:'Add To Cart'}).click() ;  
await page.goto('https://rahulshettyacademy.com/client/#/dashboard/cart');
await page.getByRole('button',{name:'Checkout'}).click() ;
const country=page.locator("input[placeholder='Select Country']").first();
await country.waitFor({state:'visible'});
await country.pressSequentially('India',{delay:100});
await page.locator("text= India").nth(1).click();
await page.pause();
await page.locator('a[class*="btnn action__submit"]').click();
const Placeorder=await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{data:addTocart,

    headers:
    {
            'Authorization':token,
            'content-type':'application/json'
    }
})
expect (Placeorder.ok()).toBeTruthy();

})


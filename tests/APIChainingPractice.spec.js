//Verify if the products are coming in the UI and extract their product id
const {test,request,expect}= require('@playwright/test');

let apiContext;
let token;
const loginCred=
{
    "userEmail": "Prasoonshukla24@gmail.com",
    "userPassword": "9451240057"
}

const allProducts=
{
    "productName": "",
    "minPrice": null,
    "maxPrice": null,
    "productCategory": [],
    "productSubCategory": [],
    "productFor": []
}

test.beforeAll(async()=>{
     apiContext=await request.newContext();
    const login=await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:loginCred});
    expect(login.ok()).toBeTruthy();
    const loginJson=await login.json();
    token=loginJson.token;
})

test('Api Chaining practice',async ({page,request})=>{

    const productsAll= await apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products',{data:allProducts,

        headers:
        {
            'authorization':token,
            'content-type':'application/json'
        }
    })
   await page.addInitScript((value)=>{
        window.localStorage.setItem('token', value)

    },token)
    console.log(token);
    expect(productsAll.ok()).toBeTruthy();

    const allProductsJson= await productsAll.json();
    let dynamicProductId;
    for(let i=0;i<allProductsJson.data.length;i++)
    {
        if(allProductsJson.data[i].productName==='iphone 13 pro')
        {
            dynamicProductId=allProductsJson.data[i]._id;
            break;
        }
    }

console.log(dynamicProductId);
await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
/* UI automation
await page.locator('.card-body').first().waitFor();
const uiProducts=await page.locator('.card-body');
const size=await uiProducts.count();
console.log(size);

for(let i=0;i<size;i++)
{
const product= uiProducts.nth(i);
const productName=await product.locator('h5').first().textContent();
await page.pause();
if(productName=='iphone 13 pro')
    {
        
        await product.getByText('Add To Cart').click();
        console.log(productName);
}

}

*/
const addToCartPayload = 
{
    "_id": "689e3ca66f585eb60d78c477",
    "product": {
        "_id": dynamicProductId,
    }
}

const checkAddtocart=await apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart',{ data:addToCartPayload ,

    headers :
    {
         'authorization':token,
        'content-type':'application/json'

    }
}
)
expect(checkAddtocart.ok()).toBeTruthy();

})
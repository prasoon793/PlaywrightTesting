// Extract the products with help of get method and verify if our desired product is present or not

const {test,request,expect}= require('@playwright/test')

test('GreenKart products with get', async({page,request})=>{
    const response= await request.get("https://rahulshettyacademy.com/seleniumPractise/data/products.json");

    const allproducts= await response.json();
    expect(response.ok()).toBeTruthy();
   
    let desiredProduct;
    for(let i=0;i<allproducts.length;i++)
    {
        if(allproducts[i].name.toLowerCase().includes('banana'))
        {
            desiredProduct=allproducts[i];
        }

    }
console.log(desiredProduct);
console.log('kela mil gya kela milg gya',desiredProduct.name);
//OR we can search with qeury parameters

const response1= await request.get('https://rahulshettyacademy.com/seleniumPractise/data/products.json',{params:
{
    search:"banana",
    limit:5

}})

const praduct=await response1.json();
console.log(praduct)




})
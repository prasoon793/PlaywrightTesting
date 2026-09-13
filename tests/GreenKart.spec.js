const {test, expect} = require('@playwright/test');
test ('GreenKart Automation', async({page})=>{

await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
const products=await page.locator('.product');
const size=await products.count();

for(let i=0;i<size-1;i++)
{
    const product=await products.nth(i);
    const productname= await product.locator('.product-name').first().textContent();
    if(productname.includes('Cucumber - 1 Kg') || productname.includes('Beetroot - 1 Kg'))
    {
        console.log('Got the cucumber and beetroot');
        for(let j=0;j<3;j++)
        {

            await product.locator('.increment').click();
        }
        await product.getByRole('button',{name:'ADD TO CART'}).click();
        

    
    }
    
}
//await page.pause();
await page.locator("[alt='Cart']").click();

const cartProducts=await page.locator('.cart-items');
const TotalProducts=await cartProducts.count();
console.log(TotalProducts);
for(let i=0;i<TotalProducts;i++)
{
    const cartProduct=await cartProducts.nth(i);
    const praduct=await cartProduct.locator('.product-name').first().textContent();
    console.log(praduct);
    if(praduct.includes('Cucumber - 1 Kg') || praduct.includes('Beetroot - 1 Kg'))
    {
        console.log('Both are same pass');
    }
}

await page.getByRole('button',{name:'PROCEED TO CHECKOUT'}).click();
await page.getByRole('button',{name:'Place Order'}).click();
await page.locator("[style='width: 200px;']").selectOption('India');
await page.locator("[type='checkbox']").click();
await page.pause();
await page.locator('button').click();
expect(await page.locator('span[style="color:green;font-size:25px]').isVisible());


})



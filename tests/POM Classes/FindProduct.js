class FindProduct
{
    constructor(page)
    {
        this.page=page;
        this.allproducts= page.locator("[class='card-body']");
        this.cart=page.locator("[routerlink='/dashboard/cart']");


    }

    async gotoUrl(Url)
    {
       await this.page.goto(Url)
    }
    async finddesiredProduct(productName)
    {
        const count= await this.allproducts.count();
        for(let i=0;i<count;i++)
        {
            const product= await this.allproducts.nth(i);
            const productNameIteration= await product.locator('h5').first().textContent();
            console.log(productName);
            if(productNameIteration.toLowerCase().includes(productName.toLowerCase()))
            {
                await product.getByRole('button', {name:'Add To Cart'}).click();
            }
        }
     //   await this.page.pause();

        await this.cart.click();
    }
}
module.exports={FindProduct};
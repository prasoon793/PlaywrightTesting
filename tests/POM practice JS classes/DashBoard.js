class DashBoard
{
    constructor(page)
    {
        this.page=page;
        this.allproduct= page.locator('.card-body');

    }

    async products(desiredProduct)
    {
        await this.page.waitForLoadState('networkidle')
        const count= await this.allproduct.count();
        for(let i=0;i<count;i++)
        {
          const product=await this.allproduct.nth(i);
          const productName= await product.locator('h5').first().textContent();
          console.log(productName);
          if(productName.toLowerCase().includes(desiredProduct.toLowerCase()))
          {
            await product.getByRole('button', {name:'Add To Cart'}).click();
            break;
            
          }
        }
        await this.page.locator('[routerlink="/dashboard/cart"]').click();

        

    }



}



module.exports={DashBoard};
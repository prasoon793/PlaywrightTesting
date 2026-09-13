
class OrderHistory
{
    constructor(page)
    {
        this.page=page;
        this.myorders= this.page.locator("[routerlink='/dashboard/myorders']");
        this.allrowdata= this.page.locator("th[scope='row']");

    }

    async searchingProduct(productFind)
    {
        await this.myorders.first().click();
        let ids = productFind.replaceAll('|', '').trim();
        const count= await this.allrowdata.count();
        console.log(productFind);
        for(let i=0;i<count;i++)
        {
            const id= await this.allrowdata.nth(i).textContent();
            
            if(id.includes(ids))
            {
               return true;
            }

        }

        return false;

    }



}
module.exports={OrderHistory}
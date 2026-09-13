
const { expect } = require('@playwright/test');
class APIUtilsPractice
{
    constructor(apiContext,logindata)
    {
        this.apiContext=apiContext;
        this.logindata=logindata;

    }
    async getToken()
    {
    const loginapi= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.logindata});
    const loginapiResponse= await loginapi.json();
    const token= await loginapiResponse.token;
    this.userId=loginapiResponse.userId;
    return token;
    }

   
    async checkproductspresent(datapresent)
    {
        const response={};
        response.token=await this.getToken();
        const checkdata=await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products', {data:datapresent, headers:
            {
           'Authorization':response.token,
           'content-type':'application/json'
        }})
        if(checkdata.ok())
        {
            return true;
        }
        
        return false;
    }
    async IphoneId(datapresent,productName,token)
    {
        const findProductId= await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products',{data:datapresent,headers:{
            'Authorization':token,
            'content-type':'application/json'

        }})
       // let iphoneId;
        const productJson= await findProductId.json();
        for(let i=0;i<productJson.data.length;i++)
        {
            if(productJson.data[i].productName==productName)
            {
                return productJson.data[i];
                
            }
        }
        
        if(iphoneId==null)
        {
            return null;
        }


    }

    async OrderIphone(cartPayload,token)
    {
      // const productid=await this.IphoneId();
      console.log('token recieved',token);
       const createOrder= await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {data:cartPayload,headers:{

        'Authorization':token,
            'content-type':'application/json'
       }})
       const OrderJson= await createOrder.json();
       const OrderMessage= await OrderJson.message;
       console.log("orderResponse", OrderMessage);
       return OrderMessage;

       
    }
    async UiaddtoCart(page,expectedText)
    {
        await page.goto('https://rahulshettyacademy.com/client/#/dashboard/cart');
        await page.getByRole('button', {name:'Checkout'}).click();
        const country=await page.locator("input[placeholder='Select Country']")
        const countryName=await country.pressSequentially('India');
        await page.getByText('India').nth(1).click();
        
        await page.locator("a:has-text('Place Order')").click();
     //   const Ordered= await page.locator('h1').textContent();
        await expect(page.locator('h1')).toContainText(expectedText);
        await page.locator('h3').click();
        
    }
    


    
}
module.exports={APIUtilsPractice}
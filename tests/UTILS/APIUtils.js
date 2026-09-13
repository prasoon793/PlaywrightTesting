class APIUtils
{
    constructor(apicontext,loginCred)
    {
        this.apicontext=apicontext;
        this.loginCred=loginCred;

    }
   async getToken()
    {
        const logindata=await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:this.loginCred});
        const logindataJson= await logindata.json();
        const token=await logindataJson.token;
        console.log(token);
        return token;
    }

    async getIdofAdidas(allProducts)
    {
        const response={};
        response.token=await this.getToken() //dono ek hi class ke method h to jab aysa hota h to this.getToken() krke call krna pdta h 
        const orderResponse=await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products',{data:allProducts, headers:{
            'Authorization': response.token,
             'content-type':'application/json'
        }})
        const allProductsJson= await orderResponse.json();

        let productId;
        for(let i=0;i<allProductsJson.data.length;i++)
        {
            if(allProductsJson.data[i].productName==='iphone 13 pro')
            {
                productId=allProductsJson.data[i]._id
                break;
            }
        }

        console.log(productId);


    return productId;
    }
    async addtocart(addToCartPayload)
    {
        const token= await this.getToken();
        const addtocartdata= await this.apicontext.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {data: addToCartPayload ,headers:{

            'Authorization': token,
            'content-type':'application/json'
        }})
        const addtocartdatajson= await addtocartdata.json();
        console.log(addtocartdatajson);
        return addtocartdatajson.message;
        
    }


}
module.exports={APIUtils}
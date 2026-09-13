/*
Step 1 (Login & User Extraction): Login API hit karke response se token aur userId dono ko variables mein save karo.

Step 2 (Dynamic Product Fetching - GET): Saare products ki list mangane wali GET API hit karo, response JSON ko parse karo, aur array ke pehle product ki _id ko dynamically ek variable (dynamicProductId) mein store karo.

Step 3 (Add to Cart - POST): Us dynamic product ID aur token ko use karke item ko cart mein add karne wali API ko hit karo.

Step 4 (Create Order - POST): Cart ke baad order placement API ko hit karo aur order successful hone ka status verify karo.

Step 5 (Order Verification - GET): Orders list fetch karne wali API hit karke check karo ki naya order successfully list mein reflect ho raha hai ya nahi.
*/
//Verify if the products are coming in the UI and extract their product id
const {test,request,expect}= require('@playwright/test');
const {APIUtils}= require('./UTILS/APIUtils')

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

let productid;

test.beforeAll(async()=>{
     apiContext= await request.newContext();
const addToCartPayload = 
{
    "_id": "689e3ca66f585eb60d78c477",
    "product": {
        "_id": productid,
    }
}


     const apiUtils= new APIUtils(apiContext,loginCred);
     
     productid= await apiUtils.getIdofAdidas(allProducts);
     console.log(productid)
    const addtocartresponse=await apiUtils.addtocart(addToCartPayload);
    console.log(addtocartresponse)
    
     
})


test('Api Chaining practice',async ({page,request})=>{

console.log('to see if token is correct ')
    
})
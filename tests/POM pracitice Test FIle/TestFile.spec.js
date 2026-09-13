const {test, expect} =require('@playwright/test')
const{OBManager} =require('../POM practice JS classes/OBManager')
const dataSet= JSON.parse(JSON.stringify(require('../../POM practice json files/Data.json')));


test ('Login' , async({page})=>{

await page.goto('https://rahulshettyacademy.com/client/#/auth/login')

const ob= new OBManager(page);
const userName=dataSet.userName;
const userPassword=dataSet.userPassword;
await ob.getLogin().LogintoOrder(userName,userPassword);
await ob.getdashBoard().products(dataSet.desiredProduct)
await ob.getCarto().orderCart();
const realproductId=await ob.getCarto().getProductID();
const flag=await ob.getOrderID().searchingProduct(realproductId);
await expect(flag).toBeTruthy();


})

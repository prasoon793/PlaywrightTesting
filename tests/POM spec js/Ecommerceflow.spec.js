const {test}= require('@playwright/test');
const {ObjectManager}= require('../POM Classes/ObjectManager')
const {Login}= require('../POM Classes/Login')
const {FindProduct} = require('../POM Classes/FindProduct')
const {Cart} = require('../POM Classes/Cart')

test('Ecommerce flow' , async({page})=>{

const objectManager= new ObjectManager(page);
const userName='Prasoonshukla24@gmail.com';
const userPassword='9451240057'
await objectManager.getLoginPage().gotoLoginPage("https://rahulshettyacademy.com/client/#/dashboard/dash")
await objectManager.getLoginPage().loginToOrder(userName,userPassword);
await objectManager.getProducts().gotoUrl('https://rahulshettyacademy.com/client/#/dashboard/dash')
await objectManager.getProducts().finddesiredProduct("iphone 13");
await objectManager.getCart().cart('https://rahulshettyacademy.com/client/#/dashboard/cart');
await objectManager.getCart().productOrder();

})


const {Login} = require('../POM Classes/Login')
const {FindProduct} = require('../POM Classes/FindProduct')
const {Cart}= require("../POM Classes/Cart")


class ObjectManager{
constructor(page)
{
    this.page=page;
    this.login= new Login(this.page);
    this.FindProduct= new FindProduct(this.page);
    this.Cart= new Cart(this.page);

}
//get login aur y helpwer class kyu bna rhe hai kyunki constructer me direct ye return ni kr pata hai object islie helper class bna rhe h 
getLoginPage()
{
    return this.login;
}

getProducts()
{
    return this.FindProduct;
}

getCart()
{
    return this.Cart;
}

}

module.exports={ObjectManager}
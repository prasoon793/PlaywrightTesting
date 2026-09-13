const {LoginPractice}= require('../POM practice JS classes/LoginPractice')
const {DashBoard}= require('../POM practice JS classes/DashBoard')
const {Carto}= require('../POM practice JS classes/Carto')
const {OrderHistory}= require('../POM practice JS classes/OrderHistory')


class OBManager {
  constructor(page) 
  {
    this.login = new LoginPractice(page);
    this.dashboard = new DashBoard(page);
    this.carto = new Carto(page);
    this.orderId= new OrderHistory(page)
  }


getLogin()
{
    return this.login;
}
getdashBoard()
{
return this.dashboard;
}

getCarto()
{
return this.carto;
}

getOrderID()
{
    return this.orderId;
}

}

module.exports={OBManager};
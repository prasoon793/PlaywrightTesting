class Login
{
    constructor(page)
    {
         this.page=page;
         this.userName=page.locator("#userEmail")
         this.Password=page.locator("#userPassword")
         this.login=page.locator("#login");

    }
async gotoLoginPage(urls)
{
await this.page.goto(urls)    


}

async loginToOrder(userName,userPassword)
{
    await this.userName.fill(userName);
    await this.Password.fill(userPassword);
    await this.login.click();
    console.log("this is working")
    await this.page.waitForLoadState('networkidle')
}
}
module.exports={Login}
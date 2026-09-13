class LoginPractice {
  constructor(page) {
    this.page= page;
    this.userPassword = this.page.locator("#userPassword");
    this.userEmail = page.locator("#userEmail");
    this.loginButton = page.locator("#login");
  }

async LogintoOrder(userName,Password)
{
    await this.userEmail.fill(userName);
    await this.userPassword.fill(Password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
}

}
module.exports={LoginPractice}

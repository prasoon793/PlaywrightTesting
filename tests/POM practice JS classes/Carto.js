const { expect } = require("@playwright/test");

class Carto {
  constructor(page) {
    this.page = page;
    this.checkoutButton = this.page.locator(".totalRow button");
    this.country = this.page.getByPlaceholder("Select Country");
    this.dropDown= this.page.locator('.ta-results');
  }

  async orderCart() {
    await this.checkoutButton.click();
    await this.country.pressSequentially("India");
    await this.dropDown.locator('button').nth(1).click();
    await this.page.locator("[class='btnn action__submit ng-star-inserted']").click();
    await expect(this.page.locator('.hero-primary')).toContainText(' Thankyou')
  }
  async getProductID()
  {
    const productId=await this.page.locator('label[class="ng-star-inserted"]').textContent();
    console.log(productId);
    return productId;
  
}
}

module.exports = { Carto };

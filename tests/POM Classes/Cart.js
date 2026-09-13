const { expect } = require("@playwright/test");

class Cart
{
constructor(page)
{
this.page=page;
this.checkoutButton=this.page.locator("button[type='button']").nth(1);
this.countryInput= this.page.locator('input[placeholder*="Select Country"]');
this.dropdown= this.page.locator(".ta-results button")
this.placeorderButton= this.page.locator("[class*='action__submit']");
this.completeOrderText= this.page.locator('.hero-primary');
}
async cart(urlcart)
{
    await this.page.goto(urlcart);
}

async productOrder()
{
    await this.checkoutButton.click();
    await this.page.waitForLoadState('networkidle')
   await this.countryInput.pressSequentially('ind' , {delay:100});
   await this.dropdown.filter({hasText: 'India'}).nth(1).click();
   await this.placeorderButton.click();
   //await this.page.pause();
   //const ordertext= this.completeOrderText.textContent();
   await expect(this.completeOrderText).toHaveText("Thankyou for the order.")

}
}

module.exports={Cart}
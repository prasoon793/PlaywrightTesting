const {test, expect} = require('@playwright/test');

test('first Automation test', async({page,context})=>{

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 await page.locator('#displayed-text').fill("PrasoonShukla");
//await page.pause();
const documentlink=await page.locator("#opentab");
const [newpage]=await Promise.all(

  [context.waitForEvent('page'),documentlink.click()]
);
await page.locator('#hide-textbox').click();
await expect(page.locator("#displayed-text")).toBeHidden();
await page.locator('#dropdown-class-example').selectOption('Option2');
await page.getByPlaceholder('Type to Select Countries').nth(0).pressSequentially('India');
await page.pause();
await page.locator("[value='radio1']").click();
await page.locator("#name").click();
await page.on('dialog',dialog=>dialog.accept());
await page.locator('#confirmbtn').click();
await page.on('dialog',dialog=>dialog.dismiss())
/*const fra= page.frameLocator("courses-iframe");
await fra.locator('#locato').click();
*/
await page.locator("#checkBoxOption1").click();
await page.locator("#checkBoxOption2").click();
})
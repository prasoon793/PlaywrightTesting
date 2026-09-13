const {test, expect}=require('@playwright/test');

test('Flight Booking' , async({page})=>{
    await page.goto('https://rahulshettyacademy.com/dropdownsPractise/');
    await page.locator('#ctl00_mainContent_ddl_originStation1_CTXT').click();
    await page.locator("div[class='dropdownDiv'] [value='DEL']").click();
    await page.locator("div[class='dropdownDiv'] [value='GOI']").nth(1).click();
    await page.locator("input[id='ctl00_mainContent_view_date1']").click();
    await page.getByRole('link',{name:'17'}).first().click();
    await expect(page.locator("[style*='0.5']")).toBeVisible();
    //console.log(flag);
    await page.locator('#ctl00_mainContent_DropDownListCurrency').selectOption('USD');
    await page.locator('#ctl00_mainContent_SeniorCitizenDiv').click();
    await page.pause();
    await page.locator('#ctl00_mainContent_btn_FindFlights').click();
    
})
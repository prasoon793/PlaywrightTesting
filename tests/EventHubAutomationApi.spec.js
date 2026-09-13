const {test,request, expect}= require('@playwright/test')
const loginpassword={email:"prasoon@gmail.com" ,password:"945124@pS$"}
let apiContext;
let token;
test.beforeAll(async()=>{
apiContext= await request.newContext();
const loginresponse=await apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',{data: loginpassword})
expect(loginresponse.ok()).toBeTruthy();
const allloginresponse=await loginresponse.json();
token=await allloginresponse.token;
console.log(token)
})

test('Event Hub Automation', async({request,page})=>{

await page.addInitScript((value)=>{
    window.localStorage.setItem('token',value);
},token)

const products=await request.get('https://api.eventhub.rahulshettyacademy.com/api/events?limit=6',{headers:
    {'authorization': 'Bearer ' + token}
});
expect(products.ok()).toBeTruthy();
const allproductsjson=await products.json();
let desiredProductid;
for(let i=0;i<allproductsjson.data.length;i++)
{
    if(allproductsjson.data[i].title.toLowerCase().includes('dilli diwali mela'))
    {
        desiredProductid=allproductsjson.data[i].id;
        break;

    }
}

console.log(desiredProductid);
//page.locator('')
const bookingTicket= await request.get(`https://api.eventhub.rahulshettyacademy.com/api/events/${desiredProductid}`,{headers:{'authorization':'Bearer ' + token}
});
expect(bookingTicket.ok()).toBeTruthy();
/*
await page.goto('https://eventhub.rahulshettyacademy.com/events/3');
await page.locator("[id='customerName']").fill('Prasoon Shukla')
await page.locator("[id=customer-email").fill('prasoon@gmail.com')
await page.locator('#phone').fill('9984777490');
await page.locator("button[type='submit']").click();
*/
const productdetails={customerName: "prasoon ", customerEmail: "prasoon@gmail.com", customerPhone: "9451240057", eventId: 3 ,quantity:1}
const confirmbooking= await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",{data:productdetails, headers:
    {'authorization':'Bearer ' +token,
    'content-type':'application/json',
    }
})
expect(confirmbooking.ok()).toBeTruthy();
})
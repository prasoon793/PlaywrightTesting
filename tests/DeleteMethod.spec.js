const {test,request,expect}= require('@playwright/test')
let apiContext;
let token;
const logindata={email: "prasoon@gmail.com", password: "945124@pS$"}
test.beforeAll(async()=>{
    
apiContext= await request.newContext();
const login=await apiContext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',{data:logindata})
expect(login.ok()).toBeTruthy();
const loginJson=await login.json();
token=await loginJson.token;
console.log(token)
})

const productdetails = {
    customerEmail: "prasoon@gmail.com",
    customerName: "Prasoon Shukla",
    customerPhone: "9451240057",
    eventId: 107525,
    quantity: 1
};
test('DeleteMethod practice in rest api', async ({page,request})=>{
  
  await  page.addInitScript((value)=>{
    window.localStorage.setItem('token',value);
  },token)


   const booking= await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",{data:productdetails, headers:
    {
        'authorization': 'Bearer ' + token,
        'content-type':'application/json'
    }

})

const bookingjson=await booking.json();
const productid=bookingjson.data.id;

const deleteitem= await request.delete(`https://api.eventhub.rahulshettyacademy.com/api/bookings/${productid}`,{headers:
  {
    'authorization': 'Bearer ' + token,
     'content-type':'application/json'
  }
    })

    expect(deleteitem.ok()).toBeTruthy();



})
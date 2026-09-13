/*
GET Method with Query Parameters:

ek aisi API request hoti hai jisme server se data fetch karte waqt URL ke aage extra filters, search terms, ya pagination details bheji jaati hain.


URL Structure Query parameters hamesha URL ke aakhir mein ek question mark (?) se start hote hain. Agar ek se zyada parameters hon, toh unhe ampersand (&) se alag kiya jaata hai.
	• Format: [https://api.example.com/endpoint?key1=value1&key2=value2](https://api.example.com/endpoint?key1=value1&key2=value2)
	• Real-world Example: [https://rahulshettyacademy.com/api/ecom/products?category=electronics&limit=10](https://rahulshettyacademy.com/api/ecom/products?category=electronics&limit=10)
		○ Yahan category aur limit query parameters hain.

*/

const {test,request,expect}= require('@playwright/test');
//let apiContext;

test('Practice GET request', async ({ request }) => {
    //url to get method ki url h
    const response = await request.get('https://rahulshettyacademy.com/seleniumPractise/data/products.json')
        // Agar is API mein ya kisi aur GET API mein query parameters bhejne hon, 
        // toh unhe 'params' object ke andar likha jata h);
        expect(response.ok()).toBeTruthy();
        const allproducts=await response.json();

    //const jsonResponse = await response.json();
let bananadetails;
    for(let i=0;i<allproducts.length;i++)
    {
        if(allproducts[i].name.toLowerCase().includes('banana'))
        {
            bananadetails=allproducts[i];
            break;

        }
    }
    console.log(bananadetails);
    console.log(bananadetails.price)
    if(bananadetails.price<50)
    {
        console.log('banana sasta milgya lelo bhai tagda hai')
    }

});
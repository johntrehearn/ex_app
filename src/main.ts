

interface Data {
  conversion_rates: Record<string, number>;
}

class FetchWrapper {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(endpoint: string): Promise<Data> {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }

  put(endpoint: string, body: any): Promise<any> {
    return this._send('put', endpoint, body);
  }

  post(endpoint: string, body: any): Promise<any> {
    return this._send('post', endpoint, body);
  }

  delete(endpoint: string, body: any): Promise<any> {
    return this._send('delete', endpoint, body);
  }

  _send(method: string, endpoint: string, body: any): Promise<any> {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

//TODO
/* The goal of this project is to show the user the conversion rate between 2 currency pairs.
  The currency chosen on the left is the base currency and the currency chosen on the right is the target currency.
  The app starts at 1 USD = 1 USD.
  
  The API you need to use in this challenge is exchangerate-api.com.
  You can create a free account and browse the documentation.
  
  The free plan on this API allows you to perform 1,500 requests per month.
  Remember that every time you type in the editor, the browser preview will refresh,
  causing a new API request. In order not to exceed your limit, we recommend commenting out the
  fetch/FetchWrapper related code after you get it to work the first time. */

//Notes:
// Sign up for a free account on exchange <a href="https://www.exchangerate-api.com/">https://www.exchangerate-api.com/</a>
// Copy the example request
// Please check the documentation link, read Standard Requests documentation
// Sending a GET request to <a href="https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD">https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD</a>
// Above will give you exchange rate comapred to USD

// TODO: WRITE YOUR TYPESCRIPT CODE HERE

// A global variable that references the HTML select element with the id base-currency

let baseCurrency = document.getElementById('base-currency') as HTMLSelectElement;
// A global variable that references the HTML select element with the id target-currency

let targetCurrency = document.getElementById('target-currency') as HTMLSelectElement;
// A global variable that references the HTML paragraph element with the id conversion-result

let conversion = document.getElementById('conversion-result') as HTMLParagraphElement;

// A global variable that stores the conversion rates for each currency pair as an array of arrays

let conversionRatesArray: [string, number][] = [];

// An instance of the FetchWrapper class with the base URL of the API

let baseApi = new FetchWrapper(`https://v6.exchangerate-api.com/v6/`);





// A constant that stores the API key for authentication

let apiKey: string = 'a38b0f509eae72974756b698';


// A call to the get method of the API instance with the endpoint that requests the latest conversion rates for the USD currency

// Assign the conversion_rates property of the response data to the rates variable

// Add an event listener to the base element that invokes the getConversionRates function when the user selects a new value
// base.addEventListener('change', getConversionRates);
// Add an event listener to the target element that invokes the getConversionRates function when the user selects a new value




baseApi.get(`${apiKey}/latest/USD`).then((data: any) => {
  console.log(data);
  conversionRatesArray = Object.entries(data.conversion_rates);
  console.log(conversionRatesArray);
  baseCurrency.addEventListener('change', getConversionRates);
  targetCurrency.addEventListener('change', getConversionRates);
});




// A function that performs the currency conversion and updates the UI

function getConversionRates() {
  let result = document.getElementById('conversion-result');
  if (result) {
    let baseCurrencyValue = baseCurrency.value;
    let targetCurrencyValue = targetCurrency.value;
    for (let i = 0; i < conversionRatesArray.length; i++) {
      console.log("Country", conversionRatesArray[i][0]);
      console.log("Country", conversionRatesArray[i][1]);
      console.log("value", targetCurrency.value);
      if (conversionRatesArray[i][0] === targetCurrency.value) {
        result.textContent = `1 ${baseCurrencyValue} = ${conversionRatesArray[i][1]} ${targetCurrencyValue}`;
      }
    }
  }
}

getConversionRates();

// Iterate over the rates array and find the rate that matches the target currency value
// If the currency name matches the target currency value
// Assign the conversion rate to the textContent property of the result element, which displays it on the web page

let result = document.querySelector('#conversion-result');

if (result) {
  result.textContent = targetCurrency.value;
}


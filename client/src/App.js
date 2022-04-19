//import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
const loadScript = (src) => {

  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    }
    script.onerror = () => {
      resolve(false);
    }
    document.body.appendChild(script)
  })
}

const __DEV__ = document.domain === 'localhost';

const App = () => {
  const [data, setData] = useState('');

  const displayRazorPay = async () => {
    
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if(!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }
    const backendResponse = await fetch('http://localhost:1337/razorpay', {method: 'POST'}).then((t) => t.json());
    console.log(backendResponse);
    setData(backendResponse);
    const options = {
      key: __DEV__ ? "rzp_test_n8cCY3nXt432n7" : "PRODUCTION_API_KEY_NOT AVAILABLE", 
      currency: backendResponse.currency,
      amount: backendResponse.amount.toString(),
      order_id: backendResponse.id,
      name: "Donation",
      description: "Thank you for nothing, please donate for us",
      image: "https://media.istockphoto.com/vectors/white-coin-money-with-dollar-symbol-icon-isolated-with-long-shadow-vector-id1262979378?k=20&m=1262979378&s=612x612&w=0&h=6CqsH-0p-iLJewPl6e2GWsFFKFRvs2U1lQPjykmsAkA=",
      handler: function (response){
         (<div>
            {alert(response.razorpay_payment_id)}
            {alert(response.razorpay_order_id)}
            {alert(response.razorpay_signature)}
         </div>) 
      },
      prefill: {
          data
      }
  };
  console.log(options);
  const paymentOptions = new window.Razorpay(options);
  paymentOptions.open();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://media.istockphoto.com/vectors/white-coin-money-with-dollar-symbol-icon-isolated-with-long-shadow-vector-id1262979378?k=20&m=1262979378&s=612x612&w=0&h=6CqsH-0p-iLJewPl6e2GWsFFKFRvs2U1lQPjykmsAkA=" className="App-logo" alt="image" />
        
        <a
          className="App-link"
          onClick={displayRazorPay}
        >
          <button className='button'>Donate $5</button>
        </a>
      </header>
    </div>
    
  );
}

export default App;

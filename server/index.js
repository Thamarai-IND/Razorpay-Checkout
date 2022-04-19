const app = require('express')();
const path = require('path');
const Razorpay = require('razorpay');
const shortId = require('shortid');
const cors = require('cors');
const { response } = require('express');
app.use(cors());

const razorpay = new Razorpay({
    key_id: 'rzp_test_n8cCY3nXt432n7',
    key_secret: 'k9i3oDgFCOUepJyFYp1WqyKQ',
  });

app.get('/logo.svg', (req,res) => {
    res.sendFile(path.join(__dirname, 'logo.svg'));
})

app.post('/razorpay', async(req,res) => {
    const payment_capture = 1;
    const amount = 5;
    const currency = 'INR';
    const options = {
        amount : (amount * 100).toString(),
        currency : currency,
        receipt : shortId.generate(), 
        payment_capture : payment_capture
    }
    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount

        });
    }
    catch (error) {
        console.log(error)
    }
})
app.listen(1337, () => {
    console.log("Listening on 1337");
})
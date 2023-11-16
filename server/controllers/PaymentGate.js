const midtransClient = require('midtrans-client');
const {nanoid} = require('nanoid')
class PaymentGate {

    static async getMidtransToken (req, res, next){
      try {
        let snap = new midtransClient.Snap({
            isProduction : false,
            serverKey : process.env.MIDTRANS_KEY
        });

        const orderId = `sub-up-${nanoid()}`;

        let parameter = {
            "transaction_details": {
                "order_id": orderId,
                "gross_amount": 39000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };

        const transaction = await snap.createTransaction(parameter)
   
        res.json({transaction_token: transaction.token, orderId})
      } catch (error) {
        next(error)
      }  
    }


}

module.exports = PaymentGate;
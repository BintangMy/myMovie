const midtransClient = require('midtrans-client');

class paymentController {
  static async payment(req, res, next) {
    try {
        // let {email, username} = req.user

        // let {price} = req.body
        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: "SB-Mid-server-N5-AMe1Hlr-ItuDCvutwAjhH"
        });

        let order_id = new Date().getTime()

        let parameter = {
            "transaction_details": {
                "order_id": `YOUR-ORDERID-${order_id}`,
                "gross_amount": 1000000
            },
            "credit_card": {
                "secure": true
            },
            "customer_details": {
                "first_name": "bintang_mochamad",
                "email": "binmochone1@gmail.com"
            }
        }

        let token  = await snap.createTransaction(parameter)
        console.log(token, '::::::::::::::::::::::::::::::::::::::')
            res.status(200).json({token, orderId:order_id})
    } catch (error) {
      console.log(error)
        next(error)
    }
}
}

module.exports = {paymentController}
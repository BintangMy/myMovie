 await Payment.create({userId:req.user.id, itemId:1, orderId:order_id, isPayment:false})
import cron from "node-cron";
import {Auction} from "../models/auctionsSchema.js";
import {User} from "../models/userSchema.js";
import { calculateCommission } from "../controllers/commissionController.js";
import {Bid} from "../models/bidSchema.js";
import {sendEmail} from "../utils/sendEmail.js"



export const endedAuctionCron = () =>{
    cron.schedule("*/1 * * * *", async() => {
        const now = new Date();
        console.log("Cron for ended auction running....");
        const endedAuctions = await Auction.find({
            endTime:{$lt:now},
            commissionCalculated:false,
        });
        
        for(const auction of endedAuctions){
        
            try {
               const commissionAmount = await calculateCommission(auction._id); 
               auction.commissionCalculated = true;
               const highestBidder = await Bid.findOne({
                auctionItem:auction._id,
                amount:auction.currentBid,
               });
               const auctioneer = await User.findById(auction.createdBy);
               auctioneer.unpaidCommission = commissionAmount;
               if(highestBidder){
                auction.highestBidder = highestBidder.bidder.id;
                await auction.save();
                const bidder = await User.findById(highestBidder.bidder.id);
                // const highestBidAmount = bidder.moneySpent + highestBidder.amount;
                await User.findByIdAndUpdate(bidder.id,{
                $inc:{
                    moneySpent:highestBidder.amount,
                    auctionsWon:1,
                },
            },{new:true}
        );
        
        await User.findByIdAndUpdate(auctioneer._id,
            {
                $inc:{
                    unpaidCommission:commissionAmount,
                },
            },
           {new:true} 
        );
        const subject =`Congratulations! You Won the auction for ${auction.title}`;
        const message = `Dear ${bidder.userName}, \n\n 🎉🎉Congratulations! You have won the auction for ${auction.title}.
         \n\nBefore processing for payment contact your auctioneer via your auctioneer email:${auctioneer.email} \n\nPlease
         complete your payment using one of the following methods:\n\n **Bank Transfer**:\n-Account Name:${auctioneer.paymentMethods.bankTransfer.bankAccountName}
         \n-Bank:${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **RazorPay**:\n- You can send payment via RazorPay:${auctioneer.paymentMethods.razorpay.razorpayAccountNumber}\n\n3.
         **GooglePay**:\n-Send payment to: ${auctioneer.paymentMethods.googlepay.googlepayupiid}\n\n4.**Cash on Delivery(COD)**:\n-if you prefer COD,you must pay 20% of the total amount upfront before
         delivery.\n-To pay the 20% upfront,use any of the above methods.\n-the remaining 80% will be paid upon delivery.\n If you want to see the condition of your auction item then send your email on this
         :${auctioneer.email}\n\n Please ensure your payment is completed by [Payment Due Date].Once we confirm the payment,the item will be Shipped to you.\n\nThank you for participating!\n\nBest regards🙏,\nBidzz Auction Team.`;
        console.log("SENDING EMAIL TO HIGHEST BIDDER");
        sendEmail({email:bidder.email,subject,message});
        console.log("SUCCESSFULLY EMAIL SENT TO HIGHEST BIDDER");
               }else{
                await auction.save();
               }
            } catch (error) {
                return next(console.error(error || "Some error in ended auction cron"));
            }
        }
    });
};
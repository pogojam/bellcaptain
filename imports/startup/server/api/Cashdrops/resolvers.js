
import Cashdrops from "../../Cashdrops";
import sendSMS from "../../SMS";

    const Drops = Cashdrops.find({}).fetch()

export default {
    Query:{
        userDrops(obj,{limit},{user}){
          return  Cashdrops.find({userId:user._id},{limit:limit}).fetch()
        }
    },
    Mutation:{
        createCashdrop(obj,data,context){
            let smsString = `${data.date} ${data.name} Drop$${data.userDrop} CashBack$${data.cashBack}`
            Cashdrops.insert(data)
            sendSMS(smsString,data.phone)
            return data._id
        }
    }
}


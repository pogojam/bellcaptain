
import Cashdrops from "../../Cashdrops";
import sendSMS from "../../SMS";
import RunningTotals from '../../RunningTotals'


export default {
    Query:{
        userDrops(obj,{limit},{user}){
          return  Cashdrops.find({userId:user._id},{limit:limit,sort:{_id:-1}}).fetch()
        }
    },
    Mutation:{
        createCashdrop(obj,data,context){
            let smsString = `${data.date} ${data.name} Drop$${data.userDrop} CashBack$${data.cashBack}`
            // Add Drop To Database
            Cashdrops.insert(data)
            // Send Text Alert
            sendSMS(smsString,data.phone)
            // update running totals
            handleRunningTotals(data.userId,data.userDrop,data.cashBack)
            console.log(data)
            return data._id
        }
    }
}


const handleRunningTotals = (userId,cashDrop,cashBack)=>{

    RunningTotals.update({userId:userId},{
        $inc:{
            LifeTotalDrop:cashDrop,
            LifeTotalCashBack:cashBack,
        }
    },
    {
        upsert:true
    }
)

}



import Cashdrops from "../../Cashdrops";

    const Drops = Cashdrops.find().fetch({})

export default {   
    Query:{
        userDrop(obj,data,{user}){
            console.log(Drops.findOne(user._id))
          return  Cashdrops.find(user._id).fetch()
        }
    },
    Mutation:{
        createCashdrop(obj,data,context){
                console.log(data)
            return {_id:'asdfsd'}
        }
    }
}


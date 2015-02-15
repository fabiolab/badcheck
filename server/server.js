Meteor.startup(function() {
    
    Meteor.publish(
        'players', function (){
            return playersCol.find({}, {"sort": {"name":1}})
                // return playersCol.find({"here":{"$exists":true}},{"sort": {"here":-1}})
        }
        // 'checkedPlayers', function(){
        // }
    );

    return Meteor.methods({
        
        /**
         * Removes all players from the db
         */ 
        removeAllPlayers: function() {
            return playersCol.remove({});
        },

        /**
         * Updates a player presence
         * @pId         The player ID
         * @pPresence   A boolean (true for here, false for not here)
         */
        updatePresence: function(pId, pPresence){
            if (pPresence){
                playersCol.update({'_id':pId},{'$set':{"here":pPresence}},{upsert:false})
                // playersCol.update({'_id':pId},{'$set':{"$currentDate":{"here":true}}},{upsert:false})
            }else{
                playersCol.update({'_id':pId},{'$unset':{'here':""}},{upsert:false})
            } 
        },

        /**
         * Insert a player into the collection
         */
         insertPlayer: function(pPlayer){
            return playersCol.insert(pPlayer);
         }
    });
});
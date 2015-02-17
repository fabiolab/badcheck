Meteor.startup(function() {

    Meteor.publish('players', function (){
        return playersCol.find({});
    });

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
                // playersCol.update({'_id':pId},{'$set':{"here":pPresence}},{upsert:false})
                playersCol.update({'_id':pId},{'$set':{"here":new Date()}},{upsert:false})
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
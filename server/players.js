Meteor.startup(function() {

    Meteor.publish('players', function (pToken){
        return playersCol.find({'token':pToken});
    });

    Meteor.methods({
        
        /**
         * Removes all players from the db
         * @pUserId     Id of the user that creates the players
         * @pToken      Id of the collection the player belongs to
         */ 
        removeAllPlayers: function(pUserId, pToken) {
            return playersCol.remove({'user_id':pUserId, 'token':pToken});
        },
        
        clear: function() {
            playersCol.remove({}),
            eventsCol.remove({})
        },

        /**
         * Updates a player presence
         * @pId         The player ID
         * @pPresence   A boolean (true for here, false for not here)
         */
        updatePresence: function(pId, pPresence){
            if (pPresence){
                playersCol.update({'_id':pId},{'$set':{"check_date":new Date()}},{upsert:false})
            }else{
                playersCol.update({'_id':pId},{'$unset':{'check_date':""}},{upsert:false})
            } 
        },

        /**
         * Insert a player into the collection
         * @pUserId     Id of the user that creates the player
         * @pToken      Id of the collection the player belongs to (for sharing purpose)
         */
         insertPlayer: function(pPlayer, pUserId, pToken){
            pPlayer.token = pToken;
            pPlayer.user_id = pUserId;
            return playersCol.insert(pPlayer);
         }
         });
});

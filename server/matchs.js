Meteor.startup(function() {

    Meteor.publish('matchs', function (){
        return matchsCol.find({});
    });

    Meteor.methods({
        
        /**
         * Insert a match into the collection
         * @pUserId     Id of the user that creates the player
         */
         insertMatch: function(pUserId){
            return playersCol.insert({});
         }
         });
});

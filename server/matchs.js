Meteor.startup(function() {

    Meteor.publish('matchs', function (){
        return matchsCol.find({});
    });

    Meteor.publish('allMatchs', function (){
        return eventsCol.find({},{fields:{token:0}});
    });

    Meteor.publish('eventMatchs', function (pToken){
        return eventsCol.find({token:pToken});
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

Meteor.startup(function() {

    // if a pUserId is given, returns only the user events with all info
    // else, returns all the events without the token information
    Meteor.publish('events', function (pUserId){
        if (pUserId){
            return eventsCol.find({user_id:pUserId});
        }else{
            return eventsCol.find({},{fields:{token:0}});
        }
    });

    Meteor.methods({
         insertEvent: function(pEventName, pUserId, pToken){
            var doc = {
                'event':pEventName,
                'user_id':pUserId,
                'token':pToken
            };
            return eventsCol.update(doc,doc,{'upsert':true});
         },

        removeEvent: function(pUserId, pToken) {
            return eventsCol.remove({'user_id':pUserId, 'token':pToken});
        }
    });
});
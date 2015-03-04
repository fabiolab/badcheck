Meteor.startup(function() {

    // if a pUserId is given, returns only the user events with all info
    // else, returns all the events without the token information
    // Subscribing both will merge the data and proovide the token info to
    // the docs matching the current user
    Meteor.publish('allEvents', function (){
        return eventsCol.find({},{fields:{token:0}});
    });

    Meteor.publish('userEvents', function (pUserId){
        return eventsCol.find({user_id:pUserId});
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
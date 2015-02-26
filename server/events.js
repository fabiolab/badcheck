Meteor.startup(function() {

    Meteor.publish('events', function (pUserId){
        return eventsCol.find({'user_id':pUserId});
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
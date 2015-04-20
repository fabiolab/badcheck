
Template.playerlist.helpers({
    isEmpty: function() {
        return playersCol.find().count() === 0;
    },
    tokenExists: function() {
        return Session.get("token");
    }
})

Template.playerlist.events({
    click: function(){    
        new_check_date = !this.check_date;
        Meteor.call('updatePresence',this._id,new_check_date);
    }
})

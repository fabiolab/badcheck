
Template.playerlist.helpers({
    players: function() {
        return playersCol.find({}, {"sort": {"nom":1}})
    }
})

Template.playerlist.events({
    click: function(){    
        new_check_date = !this.check_date;
        Meteor.call('updatePresence',this._id,new_check_date);
    }
})

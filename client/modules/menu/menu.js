Template.menu.helpers({
    isLogged: function() {
        return Meteor.userId() != null;
    },
    nbUsers: function() {
        return Meteor.users.find().count();
    },
    event: function() {
        if (Session.get('idevent')){            
            return eventsCol.find({_id:Session.get('idevent')});
        }else{
            return false;
        }
    }
})
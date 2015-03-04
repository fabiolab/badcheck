Template.menu.helpers({
    isLogged: function() {
        return Meteor.userId() != null;
    },
    nbUsers: function() {
        return Meteor.users.find().count();
    },
    getEvent: function() {
        if (Session.get('idevent')){
            // console.log(eventsCol.findOne({_id:Session.get('idevent')});
            return eventsCol.findOne({_id:Session.get('idevent')});
        }else{
            return false;
        }
    }
})
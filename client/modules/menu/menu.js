Template.menu.helpers({
    isLogged: function() {
        return Meteor.userId() != null;
    },
    nbUsers: function() {
        return Meteor.users.find().count();
    }
})
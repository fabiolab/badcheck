Template.menu.helpers({
    isLogged: function() {
        return Meteor.userId() != null;
    }
})
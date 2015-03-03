Template.users.helpers({
    users: function() {
        return Meteor.users.find({});
    }
})

Handlebars.registerHelper("displayEmails", function(pUser) {
    return pUser[0].address;
});
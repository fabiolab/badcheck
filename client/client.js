// Subscribe to the server player collection
// Update of the client collection is done from this
Deps.autorun(function(){ 
    Meteor.subscribe('players',Session.get('token'));
    Meteor.subscribe('events',Meteor.userId());
    Meteor.subscribe('users');
});

// Helpers that formats dates in the templates
Handlebars.registerHelper("prettifyDate", function(pDate) {
    return 'le ' + moment(pDate).format('D MMMM à HH:mm');
});

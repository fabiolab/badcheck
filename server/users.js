Meteor.startup(function() {

    Meteor.publish('users', function (){
        return Meteor.users.find({},{fields:{emails:1}});
    });

});
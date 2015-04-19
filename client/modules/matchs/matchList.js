Template.matchlist.events({
    'click #addmatch': function(){
        Meteor.call('insertMatchSingle','','','','','','Morin', 'Guillaume', 'Sjb35', 'Bernabé', 'Fabrice', 'Ezanville');
    }
});

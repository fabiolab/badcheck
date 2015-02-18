// Subscribe to the server player collection
// Update of the client collection is done from this
Meteor.subscribe('players');

// Routing
Router.route('/', function () {
  this.render('playerlist');
});

Router.route('/checked', function () {
  this.render('checkedPlayers');
});

Router.route('/admin', function () {
  this.render('upload');
});

Template.playerlist.helpers({
    players: function() {
        return playersCol.find({}, {"sort": {"nom":1}})
    }
})

Template.checkedPlayers.helpers({
    players: function() {
        return playersCol.find({"check_date":{"$exists":true}},{"sort": {"check_date":-1}})
    }
})

Template.playerlist.events({
    click: function(){    
        new_check_date = !this.check_date;
        Meteor.call('updatePresence',this._id,new_check_date);
    }
})

Handlebars.registerHelper("prettifyDate", function(pDate) {
    return 'le ' + moment(pDate).format('D MMMM à HH:mm');
});

Template.upload.events({
    "change #files": function (e) {

        Meteor.call('removeAllPlayers');

        var files = e.target.files || e.dataTransfer.files;
        for (var i = 0, file; file = files[i]; i++) {
            if (file.type.indexOf("text") == 0) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var text = e.target.result;
                    var lines = text.split("\n");
                    for(var i = 0; i<lines.length; i++){
                        var fields = lines[i].split(";");
                        if (fields.length > 1){
                            doc = {'nom':fields[0],'prenom':fields[1]};
                            // playersCol.insert(doc);
                            Meteor.call('insertPlayer',doc);
                        }
                    }
                }
                reader.readAsText(file);
            }
        }
    }
})

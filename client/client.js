
Meteor.subscribe('players');

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
        return playersCol.find({"here":{"$exists":true}},{"sort": {"here":-1}})
    }
})

Template.playerlist.events({
    click: function(){    
        new_here = !this.here;
        Meteor.call('updatePresence',this._id,new_here);
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

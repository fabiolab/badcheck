
Meteor.subscribe('players');

Template.playerlist.helpers({
    players: function() {
        return playersCol.find();
    }
})

Template.playerlist.events({
    click: function(){    
        new_here = !this.here;
        Meteor.call('updatePresence',this._id,new_here);
    }
})

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
                        doc = {'name':fields[0],'here':(fields[1].toLowerCase() == "true")};
                        // playersCol.insert(doc);
                        Meteor.call('insertPlayer',doc);
                    }
                }
                reader.readAsText(file);
            }
        }
    }
})

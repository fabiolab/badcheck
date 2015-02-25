// Subscribe to the server player collection
// Update of the client collection is done from this
Deps.autorun(function(){ 
    Meteor.subscribe('players',Session.get('token'));
    Meteor.subscribe('events',Meteor.userId());
});

// Routing
Router.route('/', function () {
    if (this.params.query.token){
        Session.set('token',this.params.query.token);
    }
    this.render('playerlist');
});

Router.route('/checked', function () {
    if (this.params.query.token){
        Session.set('token',this.params.query.token);
    }
    this.render('checkedPlayers');
});

Router.route('/admin', function () {
    if (this.params.query.token){
        Session.set('token',this.params.query.token);
    }
    this.render('admin');
});

Router.route('/clear', function () {
    Meteor.call('clear');
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

Template.admin.helpers({
    myfile: function() {
        if (Session.get('myfile')){
            return Session.get('myfile');
        }else{
            return "Browse ...";
        }
    },
    events: function(){
        return eventsCol.find();
    },
    form_enable: function(){
        if (!Session.get('myfile') || !Session.get('eventName')){
            return "disabled";
        }
    },
    btnType:function(){
        if (eventsCol.findOne({'token':Session.get('currentToken')}) !== undefined){
            return {'type':"btn-danger",'label':"Ok",'message':"Event will be erased"};
        }else{
            return {'type':"btn-info",'label':"Ok",'message':""};
        }
    }
})


Template.menu.helpers({
    isLogged: function() {
        return Meteor.userId() != null;
    }
})

Template.admin.helpers({
    isLogged: function() {
        return Meteor.userId() != null;
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

Template.admin.events({
    "change #files": function (e) {
        Session.set('myfile',e.target.files[0].name);
    },

    "keyup #eventname": function (event, template){
        var token = CryptoJS.MD5(event.target.value).toString();
        Session.set('currentToken', token);
        Session.set('eventName',event.target.value);
    },

    "click #submitForm": function(event, template){
        event.preventDefault();

        // get event name
        var eventName = template.find("input[id=eventname]").value;

        // generate token
        var token = CryptoJS.MD5(eventName).toString();

        Meteor.call('removeAllPlayers',Meteor.userId(),token);
        Meteor.call('insertEvent',eventName,Meteor.userId(),token);

        var files = template.find("input[id=files]").files;

        // var files = e.target.files || e.dataTransfer.files;
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

                            Meteor.call('insertPlayer',doc,Meteor.userId(),token);
                        }
                    }
                }
                reader.readAsText(file);
                Session.set('myfile',file.name);
            }
        }
        Session.set('myfile',null);
        Session.set('currentToken', null);
        Session.set('eventName',null);
    },
    "click .deleteEvent": function(event, template){
        event.preventDefault();

        var id = event.target.value;
        var token = template.find("span[id=token_"+id+"]");

        console.log(token.innerHTML);
        Meteor.call('removeAllPlayers',Meteor.userId(),token.innerHTML);
        Meteor.call('removeEvent',Meteor.userId(),token.innerHTML);
    }
})

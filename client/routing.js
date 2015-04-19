/**
 * Sets session var depending on query params
 * @pQueryParams  a params object given by the iron Router module
 */
setSessionVar = function(pQueryParams){
    if (pQueryParams.token){
        Session.set('token',pQueryParams.token);
    }
    if (pQueryParams.idevent){
        Session.set('idevent',pQueryParams.idevent);
    }
}

// Routing
Router.route('/', function () {
    setSessionVar(this.params.query);
    this.render('home');
});

Router.route('/players', function () {
    setSessionVar(this.params.query);
    this.render('playerlist',{
        data:{
            players: function() {
                return playersCol.find({}, {"sort": {"nom":1}});
            }
        }
    });
});

Router.route('/matchs', function () {
    clear = this.params.query.clear;

    if (clear){
        Meteor.call('clearAllMatchs');
    }

    setSessionVar(this.params.query);
    this.render('matchlist',{
        data:{
            matchs: function() {
                return matchsCol.find({});
            }
        }
    });
});

Router.route('/match', function () {
    idmatch = this.params.query.idmatch;
    this.render('match',{
        data:{
            matchs: function() {
                return matchsCol.find({'_id':idmatch});
            }
        }
    });
});

Router.route('/addmatch', function () {
    idmatch = this.params.query.idmatch;
    this.render('addmatch');
});

Router.route('/clearmatchs', function () {
    this.render('clearmatch');
});

Router.route('/checked', function () {
    setSessionVar(this.params.query);
    this.render('checkedPlayers',{
        data:{
            players: function() {
                return playersCol.find({"check_date":{"$exists":true}},{"sort": {"check_date":-1}})
            }
        }
    });
});

Router.route('/admin', function () {
    setSessionVar(this.params.query);
    this.render('admin');
});

Router.route('/users', function () {
    this.render('users');
});


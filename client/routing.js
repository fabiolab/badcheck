/**
 * Sets session var depending on query params
 *
 * @param pQueryParams  a params object given by the iron Router module
 */
setSessionVarFromQueryParam = function(pQueryParams){
    if (pQueryParams.token){
        Session.set('token',pQueryParams.token);
    }
    if (pQueryParams.idevent){
        Session.set('idevent',pQueryParams.idevent);
    }
}

// Routing
// Home path
Router.route('/', function () {
    setSessionVarFromQueryParam(this.params.query);
    this.render('home');
});


/*
 * Displays the player list matching a given token
 */
Router.route('/players', function () {
    setSessionVarFromQueryParam(this.params.query);
    this.render('playerlist',{
        data:{
            players: function() {
                return playersCol.find({}, {"sort": {"nom":1}});
            }
        }
    });
});


/*
 * Displays the players matching a token that have already checked in
 */
Router.route('/checked', function () {
    setSessionVarFromQueryParam(this.params.query);
    this.render('checkedPlayers',{
        data:{
            players: function() {
                return playersCol.find({"check_date":{"$exists":true}},{"sort": {"check_date":-1}})
            }
        }
    });
});


/* 
 * Displays the match list
 */
Router.route('/matchs', function () {
    clear = this.params.query.clear;

    if (clear){
        Meteor.call('clearAllMatchs');
    }

    setSessionVarFromQueryParam(this.params.query);
    this.render('matchlist',{
        data:{
            matchs: function() {
                return matchsCol.find({});
            }
        }
    });
});


/*
 * Displays a match matching an id
 */
Router.route('/match', function () {
    idmatch = this.params.query.idmatch;
    this.render('match',{
        data:{
            match: function() {
                return matchsCol.findOne({'_id':idmatch});
            }
        }
    });
});


/*
 * Access to the admin interface
 */
Router.route('/admin', function () {
    setSessionVarFromQueryParam(this.params.query);
    this.render('admin');
});


/*
 * Displays the user list
 */
Router.route('/users', function () {
    this.render('users');
});

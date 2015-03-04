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
    this.render('playerlist');
});

Router.route('/checked', function () {
    setSessionVar(this.params.query);
    this.render('checkedPlayers');
});

Router.route('/admin', function () {
    setSessionVar(this.params.query);
    this.render('admin');
});

Router.route('/users', function () {
    this.render('users');
});


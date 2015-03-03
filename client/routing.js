// Routing
Router.route('/', function () {
    if (this.params.query.token){
        Session.set('token',this.params.query.token);
    }
    this.render('home');
});

Router.route('/players', function () {
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

Router.route('/users', function () {
    this.render('users');
});


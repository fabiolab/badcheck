Template.checkedPlayers.helpers({
    players: function() {
        return playersCol.find({"check_date":{"$exists":true}},{"sort": {"check_date":-1}})
    }
})


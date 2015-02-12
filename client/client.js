Template.playerlist.helpers({
  players: function() {
    return playersCol.find();
  }
})

Template.playerlist.events({
  click: function(){
    this.here = true;
  }
})
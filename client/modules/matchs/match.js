Template.match.helpers({
    hasWonTeamA: function(){
        return this.team_a.has_won;
    }
});

Template.match.events({
    // click on scoreup-a button increases the score of the A Team
    'click .scoreup-a': function(event, template){
        updateScores(this,1,0);
        Meteor.call('updateScores',this._id,this.set_in_progress,this.team_a.sets,
                    this.team_b.sets,this.date_end,this.team_a.has_won,
                    this.team_b.has_won);
    },
    // click on scoreup-b button increases the score of the B Team
    'click .scoreup-b': function(event, template){
        updateScores(this,0,1);
        Meteor.call('updateScores',this._id,this.set_in_progress,this.team_a.sets,
                    this.team_b.sets,this.date_end,this.team_a.has_won,
                    this.team_b.has_won);
    },
    // dblclick on scoredown-a button decreases the score of the A Team
    'dblclick .scoredown-a': function(event, template){
        updateScores(this,-1,0);
        Meteor.call('updateScores',this._id,this.set_in_progress,this.team_a.sets,
                    this.team_b.sets,this.date_end,this.team_a.has_won,
                    this.team_b.has_won);
    },
    // dblclick on scoredown-b button decreases the score of the B Team
    'dblclick .scoredown-b': function(event, template){
        updateScores(this,0,-1);
        Meteor.call('updateScores',this._id,this.set_in_progress,this.team_a.sets,
                    this.team_b.sets,this.date_end,this.team_a.has_won,
                    this.team_b.has_won);
    }
});


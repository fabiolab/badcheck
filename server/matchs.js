Meteor.startup(function() {

    Meteor.publish('allMatchs', function (){
        return matchsCol.find({});
        // return matchsCol.find({},{fields:{token:0}});
    });

    // Meteor.publish('eventMatchs', function (pToken){
    //     return matchsCol.find({token:pToken});
    // });

    Meteor.methods({
        updateScores: function(pIdMatch,pSetInProgress,pScoreA,pScoreB,pDateEnd,pTeamAHasWon,pTeamBHasWon){
            matchsCol.update({'_id':pIdMatch},
                             {'$set':{
                                'set_in_progress':pSetInProgress,
                                'team_a.sets':pScoreA,
                                'team_b.sets':pScoreB,
                                'date_end':pDateEnd,
                                'team_a.has_won':pTeamAHasWon,
                                'team_b.has_won':pTeamBHasWon,
                                    }
                             });
        },
        clearAllMatchs: function(){
            matchsCol.remove({});
        },

        /**
         * Insert a match into the collection
         * @pUserId     Id of the user that creates the match
         */
        insertMatchSingle: function(pEventId,
                                    pLocation,
                                    pDateStart,
                                    pStade, pDiscipline,
                                    pP1FirstName, pP1LastName, pP1Club, 
                                    pP2FirstName, pP2LastName, pP2Club
                                    ){
            theMatch = {
                    'event':{
                        'id':'',
                        'name':'',
                        'location':''
                    },
                    'user_id':Meteor.user()._id,
                    'hoped_start_date':'',
                    'real_start_date':'',
                    'date_end':'',
                    'stage':'Finale',
                    'tableau':'Men Single A',
                    'finished':false,
                    'set_in_progress':1,
                    'team_a':{
                        'retired':false,
                        'sets':[
                            {'score':0},{'score':0},{'score':0}
                        ],
                        'has_won':false,
                        'players':[
                            {
                                'id':'00007980',
                                'first_name':pP1FirstName,
                                'last_name':pP1LastName,
                                'club':pP1Club,
                                'ranking':''
                            }
                        ]
                    },
                    'team_b':{
                        'retired':false,
                        'sets':[
                            {'score':0},{'score':0},{'score':0}
                        ],
                        'has_won':false,
                        'players':[
                            {
                                'id':'00007980',
                                'first_name':pP2FirstName,
                                'last_name':pP2LastName,
                                'club':pP2Club,
                                'ranking':''
                            }
                        ]
                    },
                };
            console.log('adding a match');
            console.log(theMatch);
            return matchsCol.insert(theMatch);
        }
    });
});

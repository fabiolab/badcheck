
/**
 * Updates the score of a match according to a modification value for one of the team
 * - Increases or Decreases the score of a team for the current set (pMatch.set_in_progress)
 * - Check the score and set the values if the set or match is finished :
 *      o set_in_progress 
 *      o date_end
 *      o team_a.has_won, team_b.has_won
 *
 * @param pMatch Match to modify
 * @param pTeamAScoreMod Incremental value for the A Team score
 * @param pTeamBScoreMod Incremental value for the B Team score
 */
updateScores = function(pMatch, pTeamAScoreMod, pTeamBScoreMod){
    // Increase the team A score in the current set if it is not finished
    if (pTeamAScoreMod == 1 && !isSetFinished(pMatch,pMatch.set_in_progress)){
        pMatch.team_a.sets[pMatch.set_in_progress - 1].score++;
    }
    // Decrease score (if the match is finished, it is rolled back)
    if (pTeamAScoreMod == -1){
        pMatch.team_a.sets[pMatch.set_in_progress - 1].score--;
    }
    // Increase the team B score in the current set if it is not finished
    if (pTeamBScoreMod == 1 && !isSetFinished(pMatch,pMatch.set_in_progress)){
        pMatch.team_b.sets[pMatch.set_in_progress - 1].score++;
    }
    // Decrease score (if the match is finished, it is rolled back)
    if (pTeamBScoreMod == -1){
        pMatch.team_b.sets[pMatch.set_in_progress - 1].score--;
    }
    updateMatchState(pMatch);
};


/**
 * Updates a match state according to the current scores.
 * - check if a score of the current set is negative and set it to 0
 * - get back to previous set if both score of the current set are null
 * - check if the current set is finished and if it is, change the current set to 
 *   the next one
 * - check if the match is finished and if it is, set the data :
 *      o team_a.has_won
 *      o team_b.has_won
 *      o date_end
 *
 * @param pMatch Match to update
 */
 updateMatchState = function(pMatch){
    // a score can't be negative
    if (pMatch.team_b.sets[pMatch.set_in_progress - 1].score < 0){
        pMatch.team_b.sets[pMatch.set_in_progress - 1].score = 0;
    }
    // Idem for team_a score
    if (pMatch.team_a.sets[pMatch.set_in_progress - 1].score < 0){
        pMatch.team_a.sets[pMatch.set_in_progress - 1].score = 0;
    }
    // If both scores are null, it means that we are going back to the
    // previous set
    if (pMatch.team_a.sets[pMatch.set_in_progress - 1].score == 0 &&
        pMatch.team_b.sets[pMatch.set_in_progress - 1].score == 0){
        if (pMatch.set_in_progress > 1){
            pMatch.set_in_progress--;
        }
    }else{
        // Are the set and the match finished ?
        pMatch.team_a.has_won = false;
        pMatch.team_b.has_won = false;
        pMatch.date_end = null;

        if (isCurrentSetFinished(pMatch)){
            if (isMatchFinished(pMatch)){
                pMatch.date_end = new Date();
                setWinner(pMatch);
            }
            // if a set is finished but not the match, the next set becomes the current set !
            if (pMatch.set_in_progress < 3 && !isMatchFinished(pMatch)){
                pMatch.set_in_progress++;
            }
        }
    }
};


/**
 * Sets the winner of a given match
 * If the match is finished, check the score of the teams for each set. The winner
 * is the team who has won the two first set, or the third one.
 * 
 * @param pMatch the match to set the winner
 */
setWinner = function(pMatch){
    if (isMatchFinished(pMatch)){
        pMatch.team_a.has_won = true;
        pMatch.team_b.has_won = false;
        if (
            (pMatch.team_b.sets[0].score > pMatch.team_a.sets[0].score 
            && pMatch.team_b.sets[1].score > pMatch.team_a.sets[1].score)
            ||
            (pMatch.team_b.sets[2].score > pMatch.team_a.sets[2].score)
            ) {
            pMatch.team_b.has_won = true;
            pMatch.team_a.has_won = false;
        }
    }
}


/**
 * Returns true if the match is finished :
 * - The third set is finished
 * - One of the team has won the first two sets
 *
 * @param pMatch The match to check
 * @return true if the match is finished, false elsewhere.
 */
isMatchFinished = function(pMatch){
    isFinished = (isCurrentSetFinished(pMatch) && pMatch.set_in_progress == 3)
                || (pMatch.team_a.sets[0].score > pMatch.team_b.sets[0].score && pMatch.team_a.sets[1].score > pMatch.team_b.sets[1].score)
                || (pMatch.team_b.sets[0].score > pMatch.team_a.sets[0].score && pMatch.team_b.sets[1].score > pMatch.team_a.sets[1].score);
    // console.log("Match is finished ? "+isFinished);
    return isFinished;
}


/**
 * Returns trye if a given set is finished :
 * - One of the team has 30 points
 * - One of the team has at least 21 points and the other is at least 2 points behind
 *
 * @param pMatch the match to check
 * @param pNumSet the number of the set to check
 * @return true if the pNumSet of the pMatch is finished. False elsewhere.
 */
isSetFinished = function(pMatch, pNumSet){
    isFinished = (
        ((pMatch.team_a.sets[pNumSet-1].score >= 21) && (pMatch.team_b.sets[pNumSet-1].score < pMatch.team_a.sets[pNumSet-1].score - 1))
        ||
         ((pMatch.team_b.sets[pNumSet-1].score >= 21) && (pMatch.team_a.sets[pNumSet-1].score < pMatch.team_b.sets[pNumSet-1].score - 1))
        ||
         (pMatch.team_a.sets[pNumSet-1].score == 30) 
        ||
         (pMatch.team_b.sets[pNumSet-1].score == 30)
        );
    //console.log("set "+pMatch.set_in_progress+" is finished ? "+isFinished);
    return isFinished;
};


/**
 * Check if the current set is finished
 *
 * @param pMatch the match to check
 * @return True if the current set is finished, False elsewhere.
 */
isCurrentSetFinished = function(pMatch){
    return isSetFinished(pMatch,pMatch.set_in_progress);
};

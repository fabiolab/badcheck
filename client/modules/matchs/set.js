
Template.set.helpers({
    showSet:function(pSetNumber){
        return pSetNumber <= this.set_in_progress;
    }
});
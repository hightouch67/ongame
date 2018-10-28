Goals = new Mongo.Collection(null)
goalsObserver = new PersistentMinimongo2(Goals, 'goals');

Goals.add = function (goal) {
    Goals.insert(goal)
    //sessionStorage.setItem('rewards', JSON.stringify(Rewards.find().fetch()))
}
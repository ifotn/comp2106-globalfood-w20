// create a json object of global variables
module.exports = {
    'db': 'mongodb+srv://comp2106:@cluster0-pijii.mongodb.net/globalFood?retryWrites=true&w=majority',
    'ids': {
        'google': {
            'clientID': '343030349236-07srgtjgr6k334ka6vj7fm3d9nf5sgfq.apps.googleusercontent.com',
            'clientSecret': 'q6lGdz39mvW5aRZH2w1hdSYP',
            'callbackURL': 'http://localhost:3000/google/callback'
           // 'callbackURL': 'https://global-food.herokuapp.com/google/callback'
        },
        'facebook': {
            'clientID': '513583476020542',
            'clientSecret': '248c2a97e6ae38aa0911496df5eade5a',
            'callbackURL': 'https://global-food.herokuapp.com/facebook/callback'
        }
    }
}

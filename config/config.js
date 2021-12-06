'use strict';

const config = {
 
    live: {
        mode: 'live',
        port: 3000,
        db: {
           url: 'mongodb+srv://ashish:9OCgYEBzh16jhto3@cluster0.imn8q.mongodb.net/sample?retryWrites=true&w=majority'
        }
    },
};
module.exports.get = function get(env) {
    return config[env] || config.default;
}

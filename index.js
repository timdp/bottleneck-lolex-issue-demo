global.Promise = global.Promise || require('bluebird')

require((process.argv[3] === 'submit') ? './lib/submit' : './lib/schedule')

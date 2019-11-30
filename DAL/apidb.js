var mongoose = require('mongoose');
var connectionParams = {
    protocol: process.env.DBPROTOCOL,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    cluster: process.env.DBCLUSTER,
    db: process.env.DBNAME,
    retryWrites: process.env.RETRYWRITES || true,
    w: process.env.W || 'majority'
};

mongoose.connect(`${connectionParams.protocol}://${connectionParams.username}:${encodeURI(connectionParams.password)}@${connectionParams.cluster}/${connectionParams.db}?retryWrites=${connectionParams.retryWrites}&w=${connectionParams.w}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var apidb = mongoose.connection;
apidb.on('error', console.error.bind(console, 'Database connection error:'));
apidb.once('open', function(){
    console.log(`Database connection established successfully. [${connectionParams.db}]`);
});
module.exports = apidb;
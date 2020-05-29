const app = require('./app');

port = 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
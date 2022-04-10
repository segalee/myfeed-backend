const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)


// session setup
const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

// Express App Configurations

app.use(express.json());
app.use(cookieParser())
app.use(session)
// app.use(cors())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    // Configuring CORS
    const corsOptions = {
        // Make sure origin contains the url your frontend is running on
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://localhost:3030', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
const dogRoutes = require('./api/dog/dog.routes')



// routes
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
app.use('/api/dog', dogRoutes)

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})


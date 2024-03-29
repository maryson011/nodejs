const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const conn = require('./db/conn')

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Import Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRouter = require('./routes/authRoutes')

// Import Controller
const ToughtsController = require('./controllers/ToughtsConttroller')

const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// session middleware
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: ()=>{

            },
        path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }

    next()
})

// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRouter)

app.get('/', ToughtsController.showToughts)

conn
    .sync()
    .then(()=>{
        app.listen(8080, ()=>console.log('server running on port 8080'))
    })
    .catch((err)=>console.log(err))

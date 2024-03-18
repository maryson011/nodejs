const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/user');
const Address = require('./models/address');
const dateTimeFormate = require('./functions');

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json());

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', async (req, res)=>{
    const users = await User.findAll({ raw: true });

    console.log(users);

    const dataUsers = users.map((row)=>{
        return {id: row.id, name: row.name, occupation: row.occupation, dateCreated: dateTimeFormate(row.createdAt), update: dateTimeFormate(row.updatedAt)};
    })

    console.log(dataUsers);   

    res.render('home', { dataUsers });
});

app.get('/users/create', (req, res)=>{
    res.render('adduser')
})

app.post('/users/create', async (req, res)=>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({ name, occupation, newsletter })

    res.redirect('/')
});

app.get('/user/:id', async (req, res)=>{
    const id = req.params.id;

    const user =  await User.findOne({ raw: true, where: { id: id } });

    res.render('userview', { user });
})

app.post('/user/delete/:id', async (req, res)=>{
    const id = req.params.id;

    await User.destroy({where: {id: id } });

    res.redirect('/');
})

app.get('/user/edit/:id', async (req, res)=>{
    const id = req.params.id;

    try{
        const user = await User.findOne({ include: Address, where: { id: id } });

        console.log( user.get({ plain: true }))

        res.render('userEdit', { user: user.get({ plain: true }) })
    }catch(err){
        console.log(err);
    }
})

app.post('/user/update/:id', async (req, res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on'){
        newsletter = true;
    }else{
        newsletter = false;
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: {id: id } })

    res.redirect('/');
})

app.post('/address/create', async (req, res)=>{
    console.log(req.body)

    const UserId = req.body.UserId;
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;

    const address = {
        UserId,
        street,
        number,
        city
    }

    await Address.create(address);

    res.redirect(`/user/edit/${UserId}`);
})

app.post('/address/delete', async (req, res)=>{

    console.log('body:', req.body);

    const id = req.body.id;
    const UserId = req.body.UserId;

    console.log('User ID:', UserId)

    await Address.destroy({
        where: { id: id }
    });

    res.redirect(`/user/edit/${UserId}`)
})


conn
// .sync({ force: true }) // server para resetar a tabela
.sync()
.then(()=>{
    app.listen(3000, ()=>{
        console.log('Server running...')
    })
})
.catch((err)=>console.log(err));

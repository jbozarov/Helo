const bcrypt = require('bcryptjs'); 


module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body 
        const db = req.app.get('db'); 
        console.log(req.body)

        let user = await db.check_user_exists(username);
        if (!user[0]) {
            return res.status(400).send('username is not found')
        }

        let authenticated = bcrypt.compareSync(password, user[0].password); 
        if (!authenticated) {
            return res.status(401).send('Password is incorrect'); 
        }
        req.session.user = { id: user[0].id, username: user[0].username, profile_pic: user[0].profile_pic}
        console.log("line 20 controllers: ", req.session.user)
        res.status(202).send(req.session.user); 
    },
    register: async(req, res)=>{
        const { username, password, profile_pic } = req.body; 
        const db = req.app.get('db'); 

        let user = await db.check_user_exists(username);
        if (user[0]) {
            return res.status(400).send('Username exists')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt); 

        let newUser = await db.create_user(username, hash, profile_pic); 
        console.log(newUser); 
        req.session.user = {id: newUser[0].id, username: newUser[0].username, profile_pic: newUser[0].profile_pic};
        res.status(201).send(req.session.user); 
        },
    newPost: async (req, res) => {
        const {id} = req.params; 
        const { title, img, content } = req.body; 
        const db = req.app.get('db'); 
        await db.create_post([title, img, content, id])
        res.sendStatus(200); 
    },
    getPosts: (req, res) => {
        const db = req.app.get('db'); 
        db.get_posts()
        .then(posts => {
            console.log(posts)
            res.status(200).send(posts)
        }) 
    },
    getOnePost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params; 

        db.get_single_post(id)
        .then(post => res.status(200).send(post))
    }
}
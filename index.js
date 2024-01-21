const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 8383
const {collection, addDoc, getDocs} = require('firebase/firestore')

const {db} = require('./firebase.js')

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const list = querySnapshot.docs.map((doc) => doc.data())
    res.send(list)
})

app.post('/addRoom', async (req, res) => {
    const docRef = await addDoc(collection(db, "rooms"), req.body);
    console.log("Document written with ID: ", docRef.id);
    res.send('Added!')
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))
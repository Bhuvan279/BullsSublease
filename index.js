const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 8383
const {collection, addDoc, getDocs, doc, getDoc, updateDoc} = require('firebase/firestore')

const {db} = require('./firebase.js')

app.use(cors())
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    let filteredProducts = querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}))
    
    const {q, minPrice, maxPrice, from, to} = req.query

    if(from && to){
        filteredProducts = filteredProducts.filter(
            (product) => product.from >= from && product.to <= to
        );
    }else if (!from && to){
        filteredProducts = filteredProducts.filter(
            (product) => product.to <= to
        );
    }else if (from && !to){
        filteredProducts = filteredProducts.filter(
            (product) => product.from >= from
        );
    }

    if (minPrice && maxPrice) {
        filteredProducts = filteredProducts.filter(
          (product) => parseFloat(product.price) >= parseFloat(minPrice) && parseFloat(product.price) <= parseFloat(maxPrice)
        );
    }else if(!minPrice && maxPrice) {
        filteredProducts = filteredProducts.filter(
            (product) => parseFloat(product.price) >= Number.MIN_VALUE && parseFloat(product.price) <= parseFloat(maxPrice)
        );
    }else if(minPrice && !maxPrice) {
        filteredProducts = filteredProducts.filter(
            (product) => parseFloat(product.price) >= parseFloat(minPrice) && parseFloat(product.price) <= Number.MAX_VALUE
        );
    }

    if (q) {
        filteredProducts = filteredProducts.filter(
          (product) => product.apartment.toLowerCase().includes(q.toLowerCase())
        );
    }

    res.json(filteredProducts)
    
})

app.get('/room-desc/:roomID', async (req, res) => {
    const roomID = req.params.roomID;
    const docRef = doc(db, "rooms", roomID)
    const docSnap = await getDoc(docRef)
    res.send(docSnap.data())
})


app.post('/addRoom/:userID', async (req, res) => {
    const userID = req.params.userID;
    const docRef = await addDoc(collection(db, "rooms"), req.body);
    console.log("Room added for userID: ", userID);

    const userDocRef = doc(db, "users", userID);
    const userDoc = await getDoc(userDocRef);
    const updatedRooms = [...userDoc.data().listings, docRef.id];
    await updateDoc(userDocRef, { listings: updatedRooms });

    res.send("Added")
})

app.get('/getSavedRooms/:userID', async (req, res) => {
    const userID = req.params.userID;
    const userDocRef = doc(db, "users", userID);
    const userDoc = await getDoc(userDocRef);
    res.send(userDoc.data().saved_rooms)
})

app.get('/saveRoom/:userID/:roomID', async (req, res) => {
    const userID = req.params.userID;
    const roomID = req.params.roomID;

    const userDocRef = doc(db, "users", userID);
    const userDoc = await getDoc(userDocRef);

    let updatedSavedRooms = [];
    const savedRooms = userDoc.data().saved_rooms
    if(savedRooms.includes(roomID)){
        updatedSavedRooms = savedRooms.filter(id => id !== roomID);
    }else{
        updatedSavedRooms = [...savedRooms, roomID];
    }
    await updateDoc(userDocRef, { saved_rooms: updatedSavedRooms });

    res.send("Saved")
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))
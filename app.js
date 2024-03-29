const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8383;
const {collection, addDoc, getDocs, doc, getDoc, updateDoc} = require('firebase/firestore')
const nodemailer = require("nodemailer")
const path = require("path")




const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "astronomydaddies@gmail.com",
        pass: "zjwi tibw jiuh nsop"
    },

})



const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}


const {db} = require('./firebase.js');
const { async } = require('@firebase/util');

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
    const from=req.body.from;
    const to=req.body.to;
    const price=req.body.price;
    const preferences = await getDocs(collection(db, "preferences"));
    let prefs = preferences.docs.map((doc) => ({id:doc.id, ...doc.data()}))
    let emails=[]
    for (const product of prefs){
        if (product.from>=from && product.to<=to && product.price>=price){
            emails.push(product.email);
        }
    }
    const userID = req.params.userID;
    const docRef = await addDoc(collection(db, "rooms"), req.body);
    console.log("Room added for userID: ", userID);

    const userDocRef = doc(db, "users", userID);
    const userDoc = await getDoc(userDocRef);
    const updatedRooms = [...userDoc.data().listings, docRef.id];
    await updateDoc(userDocRef, { listings: updatedRooms });
    const mailOptions = {
        from: {
            name:"BS",
            address:"astronomydaddies@gmail.com"
        },
        to:emails,
        subject:  "New room matched",
        text: "HI ",
        html: "<b>We have a new room matching your preferences.</b>"
    }
    sendMail(transporter, mailOptions)

    res.send("Added")
})

app.post('/setPreferences', async(req,res)=>{
    const docRef = await addDoc(collection(db, "preferences"), req.body);
    res.send("added preference");
})

app.get('/getSavedRooms/:userID', async (req, res) => {
    const userID = req.params.userID;
    const userDocRef = doc(db, "users", userID);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists() && userDoc.data().saved_rooms){
        res.send(userDoc.data().saved_rooms) 
     }else{
         res.status(200).send("Saved rooms not found")
     }
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

const _dirname = path.dirname(__filename)
const buildPath = path.join(_dirname, "frontend/build")

app.use(express.static(buildPath))

app.get("/*", function(req, res){
    res.sendFile(
        path.join(_dirname, "frontend/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))
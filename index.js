const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 8383
const {collection, addDoc, getDocs} = require('firebase/firestore')

const {db} = require('./firebase.js')

app.use(cors())
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    let filteredProducts = querySnapshot.docs.map((doc) => doc.data())
    
    const {q, minPrice, maxPrice} = req.query

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
          (product) => product.address.toLowerCase().includes(q.toLowerCase())
        );
    }

    res.json(filteredProducts)
    
})

app.post('/addRoom', async (req, res) => {
    const docRef = await addDoc(collection(db, "rooms"), req.body);
    console.log("Document written with ID: ", docRef.id);
    res.send('Added!')
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))
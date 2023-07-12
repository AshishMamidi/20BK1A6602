const Router = require('express')
const bodyParser = require('body-parser')
const { generateRandomID, generateRandomSecret } = require('./Generate')


const dataBase = [];;
// const cookie_parser = require('cookie-parser')

// const session = require('express-session')
// require("./database/connection.js")

//give me a nodejs server template?




const router = Router();




// middleware
// router.use(cookie_parser())
// router.use(session(
//     {
//         secret: "123456789",
//         resave: false,
//         saveUninitialized: false,
//     }
// ))

const port = process.env.PORT || 3000;

//how to sort the javascript object in ascending wise?

// how to sort the train_details object which display


const train_details = [
    {
        "trainName": "Hyderabad express",
        "trainNumber": 2117,
        "departureTime":
        {
            "Hours": 21,
            "Minutes": 35,
            "Seconds": 0
        },
        "seatsAvailable":
        {
            "sleeper": 400,
            "AC": 100,
        },
        "price":
        {
            "sleeper": 1000,
            "AC": 1500,
        },
        "delayedBy": 15
    },
    {
        "trainName": "Chennai express",
        "trainNumber": 1987,
        "departureTime":
        {
            "Hours": 18,
            "Minutes": 35,
            "Seconds": 30
        },
        "seatsAvailable":
        {
            "sleeper": 4,
            "AC": 1,
        },
        "price":
        {
            "sleeper": 1000,
            "AC": 1500,
        },
        "delayedBy": 10
    },
    {
        "trainName": "odhisa express",
        "trainNumber": 2344,
        "departureTime":
        {
            "Hours": 15,
            "Minutes": 35,
            "Seconds": 10
        },
        "seatsAvailable":
        {
            "sleeper": 100,
            "AC": 150,
        },
        "price":
        {
            "sleeper": 1200,
            "AC": 200,
        },
        "delayedBy": 5
    },
    {
        "trainName": "Vijaywada express",
        "trainNumber": 7811,
        "departureTime":
        {
            "Hours": 23,
            "Minutes": 25,
            "Seconds": 10
        },
        "seatsAvailable":
        {
            "sleeper": 400,
            "AC": 100,
        },
        "price":
        {
            "sleeper": 700,
            "AC": 1250,
        },
        "delayedBy": 35
    }
];


router.post('/train/register', bodyParser.json(), (req, res, next) => {
    let clientID = null
    let clientSecret = null
    if (req.body['accessCode'] === "HzrEmn") {
        dataBase.push(req.body)
        clientID = generateRandomID(30)
        clientSecret = generateRandomSecret(15)
    }
    resObj = [
        {
            "companyName": req.body["companyName"],
            "ClientID": clientID,
            "clientSecret": clientSecret
        }
    ]
    dataBase.push(resObj)
    console.log(dataBase)
    res.send(resObj)
})
router.post('/train/auth', bodyParser.json(), (req, res, next) => {
    const filterItem = dataBase.filter((s) => s.ClientID === req.body['ClientID'])
    const finalItem = filterItem.filter((s) => s.clientSecret === req.body['clientSecret'])
    let authToken = null;

    if (finalItem) {
        let accessToken = generateRandomSecret(30)
        authToken = [{
            "token_type": "Bearer",
            "access_token": accessToken,
            "expires_in": 2000,
        }]
    }
    res.cookie("AuthToken", authToken, {
        maxAge: 2000,
    })

    res.send(authToken)
})




router.get('/train/train/',
    // the following the 3 lines is also a middleware
    // by adding next it will execute the next middleware
    (req, res, next) => {
        res.statusCode = 200;
        console.log("Started the GET request");
        next();
        if (trainNumber) {
            const sortedTrainDetails = sortedTrainDetails.filter((s) => s.trainNumber === trainNumber)
        }
    },
    (req, res, next) => {

        const sortedTrainDetails = train_details.filter((s) => s.delayedBy <= 30)


        sortedTrainDetails.sort((a, b) => {
            const departureTimeOfA = a.departureTime;
            const departureTimeOfB = b.departureTime;

            // Sort by departureTime in descending order
            if (departureTimeOfA.Hours === departureTimeOfB.Hours) {
                if (departureTimeOfA.Minutes === departureTimeOfB.Minutes) {
                    return departureTimeOfB.Seconds - departureTimeOfA.Seconds;
                }
                return departureTimeOfB.Minutes - departureTimeOfA.Minutes;
            }
            return departureTimeOfB.Hours - departureTimeOfA.Hours;
        });

        sortedTrainDetails.sort((a, b) => {
            const priceOfA = a.price;
            const priceOfB = b.price;

            // Sort by price in ascending order
            if (priceOfA.AC === priceOfB.AC) {
                return priceOfA.sleeper - priceOfB.sleeper;
            }
            return priceOfA.AC - priceOfB.AC;
        });

        sortedTrainDetails.sort((a, b) => {
            const seatsAvailableOfA = a.seatsAvailable;
            const seatsAvailableOfB = b.seatsAvailable;

            // Sort by seatsAvailable in descending order
            if (seatsAvailableOfA.AC === seatsAvailableOfB.AC) {
                return seatsAvailableOfB.sleeper - seatsAvailableOfA.sleeper;
            }
            return seatsAvailableOfB.AC - seatsAvailableOfA.AC;
        });


        res.send(sortedTrainDetails)
        next();

    },
    (req, res) => {
        console.log("Finished the GET request");
    });
router.get('/train/train/:trainNum',
    // the following the 3 lines is also a middleware
    // by adding next it will execute the next middleware
    (req, res, next) => {
        res.statusCode = 200;
        console.log("Started the GET request");
        next();
    },
    (req, res, next) => {
        const { trainNum } = req.params;
        console.log(trainNum)

        const sortedTrainDetailsDelayedBy = train_details.filter((s) => s.delayedBy <= 30)
        const sortedTrainDetails = sortedTrainDetailsDelayedBy.filter((s) => s.trainNumber == trainNum)

        sortedTrainDetails.sort((a, b) => {
            const departureTimeOfA = a.departureTime;
            const departureTimeOfB = b.departureTime;

            // Sort by departureTime in descending order
            if (departureTimeOfA.Hours === departureTimeOfB.Hours) {
                if (departureTimeOfA.Minutes === departureTimeOfB.Minutes) {
                    return departureTimeOfB.Seconds - departureTimeOfA.Seconds;
                }
                return departureTimeOfB.Minutes - departureTimeOfA.Minutes;
            }
            return departureTimeOfB.Hours - departureTimeOfA.Hours;
        });

        sortedTrainDetails.sort((a, b) => {
            const priceOfA = a.price;
            const priceOfB = b.price;

            // Sort by price in ascending order
            if (priceOfA.AC === priceOfB.AC) {
                return priceOfA.sleeper - priceOfB.sleeper;
            }
            return priceOfA.AC - priceOfB.AC;
        });

        sortedTrainDetails.sort((a, b) => {
            const seatsAvailableOfA = a.seatsAvailable;
            const seatsAvailableOfB = b.seatsAvailable;

            // Sort by seatsAvailable in descending order
            if (seatsAvailableOfA.AC === seatsAvailableOfB.AC) {
                return seatsAvailableOfB.sleeper - seatsAvailableOfA.sleeper;
            }
            return seatsAvailableOfB.AC - seatsAvailableOfA.AC;
        });


        res.send(sortedTrainDetails)
        next();

    },
    (req, res) => {
        console.log("Finished the GET request");
    });

router.listen(port, () => {
    console.log("server is running")
})






module.exports = router;

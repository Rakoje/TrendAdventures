"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const reservation_1 = __importDefault(require("./models/reservation"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/trendadventures');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
app.use('/', router);
const nodemailer = require("nodemailer");
router.route('/reserve').post((req, res) => {
    let tmp = JSON.parse(req.body.reservation);
    let r = new reservation_1.default({
        name: tmp.name,
        surname: tmp.surname,
        email: tmp.email,
        num_of_guests: tmp.num_of_guests,
        canyon: tmp.canyon,
        date: tmp.date,
        additional: tmp.additional,
        guests: tmp.guests,
        price: tmp.price
    });
    r.save().then(reservation => {
        res.status(200).json({ 'message': 'reserved' });
    }).catch(err => {
        res.status(400).json({ 'message': 'error' });
    });
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "adventurestrend@gmail.com",
            pass: "tselypcaocbdqsga"
        }
    });
    let meeting;
    let time = "8 AM";
    if (tmp.canyon === "Skurda") {
        meeting = "Kamelija Trzni Centar, Shopping Centre Kamelija https://maps.app.goo.gl/e1kq8wg5YUPur3m18";
    }
    if (tmp.canyon === "Nevidio") {
        meeting = "Eco Selo Nevidio Šavnik Municipality https://maps.app.goo.gl/LgnrHAxepEGMEJKC8";
        time = "9 AM";
    }
    if (tmp.canyon === "Medjurijec") {
        meeting = "https://maps.app.goo.gl/JyWSajWXhEFKRnAD6";
    }
    if (tmp.canyon === "Drenostica") {
        meeting = "Konoba Pojata https://maps.app.goo.gl/GWp7MeXMoKyJXq1F9";
    }
    let subject = "Your booked adventure for " + tmp.canyon + " canyon on " + tmp.date;
    let text = "Congratulations! Your adventure has been booked. Here is Your information:\n\n\
                Name: " + tmp.name + "\n\
                Surname: " + tmp.surname + "\n\
                Number of guests: " + tmp.num_of_guests + "\n\
                Canyon: " + tmp.canyon + "\n\
                Date: " + tmp.date + "\n\
                Meeting point: " + meeting + "\n\
                Time: " + time + "\n\
                Additional notes: " + tmp.additional + "\n\
                Price: " + tmp.price + "€\n\n";
    text += "Thank You for choosing Trend Adventures! We look forward to your visit. Don't forget to bring swimsuits, we will take care of the rest. For any more information, please contact us.\n\nBest regards,\nTrend Adventures\ntrend-adventures.com\n +382 68 220 057";
    let details = {
        from: "adventurestrend@gmail.com",
        to: tmp.email,
        subject: subject,
        text: text
    };
    mailTransporter.sendMail(details, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    subject = "Booked adventure for " + tmp.canyon + " canyon on " + tmp.date;
    text = "Booked Adventure:\n\n\
                Name: " + tmp.name + "\n\
                Surname: " + tmp.surname + "\n\
                Number of guests: " + tmp.num_of_guests + "\n\
                Canyon: " + tmp.canyon + "\n\
                Date: " + tmp.date + "\n\
                Meeting point: " + meeting + "\n\
                Time: " + time + "\n";
    for (var i = 0; i < tmp.num_of_guests; i++) {
        text += "Guest " + (i + 1) + ": " + tmp.guests[i] + "\n";
    }
    text += "Additional notes: " + tmp.additional + "\nPrice: " + tmp.price + "€\n";
    details = {
        from: "adventurestrend@gmail.com",
        to: "adventurestrend@gmail.com",
        subject: subject,
        text: text
    };
    mailTransporter.sendMail(details, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
});
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Reservation = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    num_of_guests: {
        type: Number
    },
    canyon: {
        type: String
    },
    date: {
        type: String
    },
    additional: {
        type: String
    },
    guests: {
        type: Array(String) 
    },
    price: {
        type: Number
    }
})

export default mongoose.model('Reservation', Reservation, 'reservations');
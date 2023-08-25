"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('Reservation', Reservation, 'reservations');
//# sourceMappingURL=reservation.js.map
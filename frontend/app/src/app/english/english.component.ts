import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { FormBuilder } from '@angular/forms';

import { formatDate } from '@angular/common';
import { Reservation } from '../models/reservation.model';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styleUrls: ['./english.component.css']
})
export class EnglishComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef,
    public formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    private bookingService: BookingService,
    private router: Router) { }

  ngOnInit(): void {
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
      dd = '0' + dd;
    }

    if (Number(mm) < 10) {
      mm = '0' + mm;
    } 

    this.today = yyyy + '-' + mm + '-' + dd;  
    this.innerWidth = window.innerWidth;
    this.date = this.today;
  }

  innerWidth: number;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  @ViewChild("guestsForm") guestsForm: ElementRef;

  today: string;
  name: string;
  surname: string;
  email: string;
  number: number = 0;
  canyonSelected: string = "Nevidio";
  date: string;
  error: boolean;
  additional: string = "";
  message: string = "";
  guest: string;
  guests: string[] = [];
  reservation: Reservation;
  reserved: string = "";
  price: number = 0;
  enabled: boolean = true;

  book() {
    this.message = "";
    this.reserved = "";
    this.error = false;
    this.guests = [];
    if (this.name === undefined || this.name === "" ||
      this.surname === undefined || this.surname === "" ||
      this.email === undefined || this.email === "" ||
      this.number === undefined || this.number <= 0 ||
      this.canyonSelected === undefined || this.canyonSelected === "" ||
      this.date === undefined || this.date === "") {
      this.error = true;
    } else {
      var regex = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
      if (!this.email.match(regex)) {
        this.error = true;
      }
    }
    for (var i = 0; i < this.number; i++) {
      if (!this.error) {
        var heightString = "guest-" + (i + 1) + "-height";
        var weightString = "guest-" + (i + 1) + "-weight";
        var shoeSizeString = "guest-" + (i + 1) + "-shoe-size";
        var ageString = "guest-" + (i + 1) + "-age";
        var height = (<HTMLInputElement>document.getElementById(heightString)).value;
        var weight = (<HTMLInputElement>document.getElementById(weightString)).value;
        var shoeSize = (<HTMLInputElement>document.getElementById(shoeSizeString)).value;
        var age = (<HTMLInputElement>document.getElementById(ageString)).value;
      }
      if (Number(height) <= 0 || Number(weight) <= 0 || Number(shoeSize) <= 0 || Number(age) <= 0) {
        this.error = true;
      } else {
        this.guest = height + "cm, " + weight + "kg, shoe size " + shoeSize + ", " + age + " years old";
        this.guests.push(this.guest);
      }
    }
    if (this.error) {
      this.message += "Please fill all required fields with correct data.\nCheck if your e-mail is in the correct format."
    } else {
      this.date = formatDate(this.date, 'dd-MM-yyyy', 'en-US');
      this.reservation = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        num_of_guests: this.number,
        canyon: this.canyonSelected,
        date: this.date,
        additional: this.additional,
        guests: this.guests,
        price: this.price
      }
      this.bookingService.reserve(this.reservation).subscribe((resp) => {
        if (resp['message'] == 'reserved') {
          this.enabled = false;
          this.reserved = "Congratulations! Your adventure has been booked. You will get confirmation mail from us soon! Check your spam folder."
          setTimeout(() => { this.enabled = true }, 5000)
        } else {
          alert("ERROR")
        }
      })
    }

  }

  dateChange(){
    this.message = "";
    this.enabled = true;
    var dateText = formatDate(this.date, 'dd-MM-yyyy', 'en-US');
    if(dateText[3] === '1'){
      this.enabled = false;
      this.message = "The selected date is not available for booking. Please pick another date.";
    }
  }

  canyonChange(canyonSelected) {
    if (canyonSelected === "Nevidio") this.price = 100 * this.number;
    if (canyonSelected === "Drenostica") this.price = 80 * this.number;
    if (canyonSelected === "Medjurijec") this.price = 100 * this.number;
    if (canyonSelected === "Skurda") this.price = 80 * this.number;
  }


  htmlToElement(html) {
    var template = this.document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

  numberOfGuests(num) {
    while (this.guestsForm.nativeElement.firstChild) {
      this.renderer.removeChild(this.guestsForm.nativeElement, this.guestsForm.nativeElement.firstChild);
    }
    if (num !== undefined) {
      for (var i = 0; i < num; i++) {
        var guest = this.htmlToElement("<div class=\"col-sm-12\">Guest " + (i + 1) + "</div>");
        this.renderer.appendChild(this.guestsForm.nativeElement, guest);
        guest = this.htmlToElement("<div class=\"form-group col-sm-6\">\
                          <input class=\"form-control br-b\" type=\"number\"\
                          name=\"guest-"+ (i + 1) + "-height\" id=\"guest-" + (i + 1) + "-height\" min=\"0\"\
                            placeholder=\"Height (in cm)\" required [(ngModel)]=\"height-"+ (i + 1) + "\
                            [ngModelOptions]=\"{standalone: true}\"></div>");
        this.renderer.appendChild(this.guestsForm.nativeElement, guest);
        guest = this.htmlToElement("<div class=\"form-group col-sm-6\">\
                          <input class=\"form-control br-b\" type=\"number\"\
                          name=\"guest-"+ (i + 1) + "-weight\" id=\"guest-" + (i + 1) + "-weight\" min=\"0\"\
                            placeholder=\"Weight (in kg)\" required></div>");
        this.renderer.appendChild(this.guestsForm.nativeElement, guest);
        guest = this.htmlToElement("<div class=\"form-group col-sm-6\">\
                          <input class=\"form-control br-b\" type=\"number\"\
                          name=\"guest-"+ (i + 1) + "-shoe-size\" id=\"guest-" + (i + 1) + "-shoe-size\" min=\"0\"\
                            placeholder=\"Shoe size (EU standard)\" required></div>");
        this.renderer.appendChild(this.guestsForm.nativeElement, guest);
        guest = this.htmlToElement("<div class=\"form-group col-sm-6\">\
                          <input class=\"form-control br-b\" type=\"number\"\
                          name=\"guest-"+ (i + 1) + "-age\" id=\"guest-" + (i + 1) + "-age\" min=\"0\"\
                            placeholder=\"Age\" required></div>");
        this.renderer.appendChild(this.guestsForm.nativeElement, guest);
      }
      if (this.canyonSelected === "Nevidio") this.price = 100 * num;
      if (this.canyonSelected === "Drenostica") this.price = 80 * num;
      if (this.canyonSelected === "Medjurijec") this.price = 100 * num;
      if (this.canyonSelected === "Skurda") this.price = 80 * num;
    }
  }

  mne(){
    this.router.navigate(['mne']).then(() => {
      window.location.reload();
    });
  }

}

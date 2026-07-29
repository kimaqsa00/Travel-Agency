
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

if (menu && navbar) {
    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    };

    window.onscroll = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    };
}


let themeBtn = document.querySelector('#theme-btn');

if (themeBtn) {
    themeBtn.onclick = () => {
        themeBtn.classList.toggle('fa-sun');

        if (themeBtn.classList.contains('fa-sun')) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };
}

let slides = document.querySelectorAll('.testimonial-slider .slide');
let index = 0;

function next() {
    if (slides.length > 0) {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }
}

function prev() {
    if (slides.length > 0) {
        slides[index].classList.remove('active');
        index = (index - 1 + slides.length) % slides.length;
        slides[index].classList.add('active');
    }
}

let nextSlideBtn = document.querySelector('#next-slide');
let prevSlideBtn = document.querySelector('#prev-slide');

if (nextSlideBtn) nextSlideBtn.onclick = next;
if (prevSlideBtn) prevSlideBtn.onclick = prev;


let loginForm = document.getElementById("login-form");
let loginBtn = document.getElementById("login-btn");
let closeLoginBtn = document.getElementById("close-login-btn");

let loginBox = document.getElementById("login-box");
let registerBox = document.getElementById("register-box");

let toRegister = document.getElementById("to-register");
let toLogin = document.getElementById("to-login");

if (loginBtn) {
    loginBtn.onclick = function () {
        loginForm.classList.add("active");
    };
}

if (closeLoginBtn) {
    closeLoginBtn.onclick = function () {
        loginForm.classList.remove("active");
    };
}

if (toRegister) {
    toRegister.onclick = function (e) {
        e.preventDefault();
        loginBox.classList.remove("active");
        registerBox.classList.add("active");
    };
}

if (toLogin) {
    toLogin.onclick = function (e) {
        e.preventDefault();
        registerBox.classList.remove("active");
        loginBox.classList.add("active");
    };
}


let tabBtns = document.querySelectorAll('.booking-tabs .tab-btn');

tabBtns.forEach((btn) => {
    btn.onclick = () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };
});


if (registerBox) {

    registerBox.addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("reg-name").value;
        let email = document.getElementById("reg-email").value;
        let password = document.getElementById("reg-password").value;

        let user = {
            name: name,
            email: email,
            password: password
        };

        let oldUser = localStorage.getItem("travelUser");

        if (oldUser) {

            let check = JSON.parse(oldUser);

            if (check.email === email) {
                alert("Email already registered!");
                return;
            }
        }

        localStorage.setItem("travelUser", JSON.stringify(user));

        alert("Registration Successful! Now Login");

        registerBox.classList.remove("active");
        loginBox.classList.add("active");

        registerBox.reset();

    });

}


if (loginBox) {

    loginBox.addEventListener("submit", function (e) {

        e.preventDefault();

        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        let savedUser = JSON.parse(localStorage.getItem("travelUser"));

        if (
            savedUser &&
            savedUser.email === email &&
            savedUser.password === password
        ) {

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(savedUser)
            );

            alert("Login Successful");

            loginForm.classList.remove("active");

            showUser();

            loginBox.reset();

        } else {

            alert("Wrong Email or Password");

        }

    });

}

function showUser() {

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    let userInfo = document.getElementById("user-info");
    let userName = document.getElementById("user-name");

    if (user) {

        if (userInfo) {
            userInfo.style.display = "flex";
        }

        if (userName) {
            userName.textContent = user.name;
        }

        if (loginBtn) {
            loginBtn.style.display = "none";
        }

    } else {

        if (userInfo) {
            userInfo.style.display = "none";
        }

        if (loginBtn) {
            loginBtn.style.display = "inline-block";
        }

    }
}


let logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {

    logoutBtn.onclick = function () {

        localStorage.removeItem("loggedInUser");

        showUser();

        alert("Logout Successful");

    };

}


window.onload = function () {
    showUser();
};


const tours = [

{
    type:"Flight",
    company:"PIA",
    from:"Lahore",
    to:"Hunza",
    time:"08:00 AM",
    price:"PKR 24,500"
},

{
    type:"Flight",
    company:"AirBlue",
    from:"Lahore",
    to:"Skardu",
    time:"10:30 AM",
    price:"PKR 28,000"
},

{
    type:"Bus",
    company:"Daewoo Express",
    from:"Lahore",
    to:"Islamabad",
    time:"09:00 AM",
    price:"PKR 3,000"
},

{
    type:"Bus",
    company:"Faisal Movers",
    from:"Lahore",
    to:"Murree",
    time:"07:00 AM",
    price:"PKR 2,400"
},

{
    type:"Train",
    company:"Green Line",
    from:"Karachi",
    to:"Lahore",
    time:"05:00 PM",
    price:"PKR 5,800"
},

{
    type:"Train",
    company:"Hazara Express",
    from:"Rawalpindi",
    to:"Karachi",
    time:"03:00 PM",
    price:"PKR 4,900"
}

];

const bookingForm = document.querySelector(".booking-form");

if (bookingForm) {

    bookingForm.addEventListener("submit", function(e){

        e.preventDefault();

        const from = document.querySelectorAll(".input-box input")[0].value.trim();
        const to = document.querySelectorAll(".input-box input")[1].value.trim();

        const results = document.getElementById("search-results");
        const container = document.getElementById("results-container");

        container.innerHTML = "";

        const filtered = tours.filter(item =>
            item.from.toLowerCase().includes(from.toLowerCase()) &&
            item.to.toLowerCase().includes(to.toLowerCase())
        );

        if(filtered.length === 0){

            container.innerHTML = `
                <h2 style="text-align:center;color:red;">
                    No Tours Found
                </h2>
            `;

        }else{

            filtered.forEach(item=>{

                container.innerHTML += `
                    <div class="tour-card">

                        <h3>${item.type}</h3>

                        <p><strong>${item.company}</strong></p>

                        <p>${item.from} ➜ ${item.to}</p>

                        <p>${item.time}</p>

                        <h2>${item.price}</h2>

                        <button class="btn book-btn">
                            Book Now
                        </button>

                    </div>
                `;

            });

        }

        results.style.display = "block";

    });

}

const bookingModal = document.getElementById("booking-modal");
const closeBooking = document.getElementById("close-booking");
const selectedTour = document.getElementById("selected-tour");
const confirmBooking = document.getElementById("booking-form");

let selectedCard = null;

document.addEventListener("click", function(e){

    if(e.target.classList.contains("book-btn")){

        selectedCard = e.target.closest(".tour-card");

        if(selectedCard){

          selectedTour.value =
    selectedCard.querySelector("strong").innerText;

            bookingModal.style.display = "flex";
        }

    }

});

if(closeBooking){

    closeBooking.onclick = function(){

        bookingModal.style.display = "none";

    };

}

window.addEventListener("click", function(e){

    if(e.target === bookingModal){

        bookingModal.style.display = "none";

    }

});

if(confirmBooking){

    confirmBooking.addEventListener("submit", function(e){

        e.preventDefault();

      
let booking = {

    bookingId: "AQ" + Math.floor(Math.random() * 100000),

    name: document.getElementById("passenger-name").value,

    email: document.getElementById("passenger-email").value,

    phone: document.getElementById("passenger-phone").value,

    seat: document.getElementById("seat-class").value,

    tour: selectedTour.value,
    company: selectedCard.querySelector("strong").innerText,

    from: selectedCard.querySelectorAll("p")[1].innerText.split("➜")[0].trim(),

    to: selectedCard.querySelectorAll("p")[1].innerText.split("➜")[1].trim(),

    departure: selectedCard.querySelectorAll("p")[2].innerText,

    arrival: getArrivalTime(
        selectedCard.querySelectorAll("p")[2].innerText
    ),

    date: new Date().toLocaleDateString("en-GB")

};

        localStorage.setItem("booking", JSON.stringify(booking));

        alert(
`✅ Booking Confirmed!

Booking ID : ${booking.bookingId}

Passenger : ${booking.name}

Tour Type : ${booking.tour}

Seat Class : ${booking.seat}`
        );

        bookingModal.style.display = "none";

        confirmBooking.reset();

    });

}


const ticketModal=document.getElementById("ticket-modal");
const closeTicket=document.getElementById("close-ticket");

if(confirmBooking){

confirmBooking.addEventListener("submit",function(){

const booking=JSON.parse(localStorage.getItem("booking"));

document.getElementById("ticket-company").innerText=booking.tour;

document.getElementById("ticket-id").innerText=booking.bookingId;

document.getElementById("ticket-name").innerText=booking.name;

document.getElementById("ticket-email").innerText=booking.email;

document.getElementById("ticket-phone").innerText=booking.phone;

document.getElementById("ticket-seat").innerText=booking.seat;

const qrData =
`Booking:${booking.bookingId}
Passenger:${booking.name}
From:${booking.from}
To:${booking.to}`;

document.getElementById("ticket-qr").src =
"https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=" +
encodeURIComponent(qrData);
document.getElementById("ticket-from").innerText = booking.from;
document.getElementById("ticket-to").innerText = booking.to;
document.getElementById("ticket-departure").innerText = booking.departure;
document.getElementById("ticket-date").innerText = booking.date;
document.getElementById("ticket-arrival").innerText = booking.arrival;
ticketModal.style.display="flex";

});

}

if(closeTicket){

closeTicket.onclick=function(){

ticketModal.style.display="none";

}

}


const bookTab = document.getElementById("book-tab");
const manageTab = document.getElementById("manage-tab");
const statusTab = document.getElementById("status-tab");

const bookingFormSection = document.querySelector(".booking-form");
const searchResults = document.getElementById("search-results");
const manageBooking = document.getElementById("manage-booking");
const travelStatus = document.getElementById("travel-status");

if (bookTab) {

    bookTab.onclick = function () {

        bookTab.classList.add("active");
        manageTab.classList.remove("active");
        statusTab.classList.remove("active");

        bookingFormSection.style.display = "block";
        searchResults.style.display = "none";
        manageBooking.style.display = "none";
        travelStatus.style.display = "none";
    };

}

if (manageTab) {

    manageTab.onclick = function () {

        manageTab.classList.add("active");
        bookTab.classList.remove("active");
        statusTab.classList.remove("active");

        bookingFormSection.style.display = "none";
        searchResults.style.display = "none";
        manageBooking.style.display = "block";
        travelStatus.style.display = "none";
    };

}

if (statusTab) {

    statusTab.onclick = function () {

        statusTab.classList.add("active");
        bookTab.classList.remove("active");
        manageTab.classList.remove("active");

        bookingFormSection.style.display = "none";
        searchResults.style.display = "none";
        manageBooking.style.display = "none";
        travelStatus.style.display = "block";
    };

}

const findBooking = document.getElementById("find-booking");

if (findBooking) {

    findBooking.onclick = function () {

        const id = document.getElementById("search-booking-id").value.trim();

        const booking = JSON.parse(localStorage.getItem("booking"));

        if (!booking) {
            alert("No Booking Found");
            return;
        }

        if (booking.bookingId === id) {

            document.getElementById("booking-details").style.display = "block";

            document.getElementById("manage-name").innerText = booking.name;

            document.getElementById("manage-id").innerText = booking.bookingId;

            document.getElementById("manage-email").innerText = booking.email;

            document.getElementById("manage-phone").innerText = booking.phone;

            document.getElementById("manage-seat").innerText = booking.seat;

        } else {

            alert("Booking ID Not Found");

        }

    };

}


const editBooking = document.getElementById("edit-booking");

if (editBooking) {

    editBooking.onclick = function () {

        let booking = JSON.parse(localStorage.getItem("booking"));

        let newName = prompt("Enter New Passenger Name", booking.name);

        if (newName) {

            booking.name = newName;

            localStorage.setItem("booking", JSON.stringify(booking));

            document.getElementById("manage-name").innerText = newName;

            alert("Booking Updated Successfully");

        }

    };

}

const cancelBooking = document.getElementById("cancel-booking");

if (cancelBooking) {

    cancelBooking.onclick = function () {

        if (confirm("Cancel this booking?")) {

            localStorage.removeItem("booking");

            document.getElementById("booking-details").style.display = "none";

            alert("Booking Cancelled");

        }

    };

}


const checkStatus = document.getElementById("check-status");

if (checkStatus) {

    checkStatus.onclick = function () {

        const id = document.getElementById("status-id").value.trim();

        const booking = JSON.parse(localStorage.getItem("booking"));

        if (!booking) {

            alert("No Booking Found");

            return;

        }

        if (booking.bookingId === id) {

            document.getElementById("status-company").innerText = booking.tour;

            document.getElementById("status-result").style.display = "block";

        } else {

            alert("Invalid Booking ID");

        }

    };

}


const printBtn = document.getElementById("print-ticket");
const downloadBtn = document.getElementById("download-ticket");

if (printBtn) {

    printBtn.addEventListener("click", () => {

        const ticket = document.getElementById("ticket-content").innerHTML;

        const win = window.open("", "", "width=1000,height=700");

        win.document.write(`
            <html>
            <head>
                <title>Aqsora Ticket</title>

                <style>

                    body{
                        background:#f5f5f5;
                        font-family:Poppins,sans-serif;
                        padding:30px;
                    }

                    #ticket-content{
                        width:900px;
                        margin:auto;
                    }

                    @media print{

                        body{
                            background:#fff;
                            padding:0;
                        }

                    }

                </style>

            </head>

            <body>

                <div id="ticket-content">

                    ${ticket}

                </div>

            </body>

            </html>
        `);

        win.document.close();

        setTimeout(() => {

            win.print();

            win.close();

        }, 700);

    });

}



if (downloadBtn) {

    downloadBtn.addEventListener("click", async () => {

        const ticket = document.getElementById("ticket-content");

        const canvas = await html2canvas(ticket, {

            scale: 2,
            useCORS: true

        });

        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 190;

        const pdfHeight = canvas.height * pdfWidth / canvas.width;

        pdf.addImage(

            imgData,
            "PNG",
            10,
            10,
            pdfWidth,
            pdfHeight

        );

        pdf.save("Aqsora_Travel_Ticket.pdf");

    });

}

function getArrivalTime(time){

    const map = {

        "08:00 AM":"10:45 AM",

        "10:30 AM":"01:00 PM",

        "09:00 AM":"03:00 PM",

        "07:00 AM":"11:30 AM",

        "05:00 PM":"09:00 PM",

        "03:00 PM":"08:00 PM"

    };

    return map[time] || "--";

}
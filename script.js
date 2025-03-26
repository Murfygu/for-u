function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        
        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "Waktu Habis!";
        }
    }
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
}


function createPopup(imageSrc, note) {
    let popup = document.createElement("div");
    popup.classList.add("popup");

    let popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times;";

    let img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Daily Image";

    let text = document.createElement("p");
    text.textContent = note;

    closeBtn.addEventListener("click", function () {
        popup.remove();
    });

    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.remove();
        }
    });

    popupContent.appendChild(closeBtn);
    popupContent.appendChild(img);
    popupContent.appendChild(text);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
}


function createCalendar() {
    const calendarEl = document.getElementById("calendar");
    const today = new Date();
    let logs = JSON.parse(localStorage.getItem("logs")) || {};

    let images = [
        "img/day1.jpg", "img/day2.jpg", "img/day3.jpg", "img/day4.jpg", "img/day5.jpg",
        "img/day6.jpg", "img/day7.jpg", "img/day8.jpg", "img/day9.jpg", "img/day10.jpg"
    ];

    let notes = [
        "Hehe lagi tidurrr, kangennn sini tidurrr", "UAS kelas 12 pake baju daerah wkwkkw", "Dulu iseng gambarr hehe skrg cuman bisa coret2", "Kerjaan gw sama visel pas sem 1 di kelas b indo wkwkwk", 
        "Nginep di apart temennn", "hehe", "Dulu belajar gitarr tapi ga bisa2 wkwkkw", "efwaipiii duluu", 
        "Foto antique. H-1 yeeeyyy", "Foto sama bocyil di ikeaa. Yeeeeyy ketemuu jugaaaaa"
    ];
    
    for (let i = 0; i < 10; i++) {
        let date = new Date();
        date.setDate(today.getDate() + i);
        let dateString = date.toISOString().split("T")[0];
        
        let dayBox = document.createElement("div");
        dayBox.classList.add("day-box");
        dayBox.textContent = date.getDate();
        
        if (logs[dateString]) {
            dayBox.classList.add("logged");
        }
        
        dayBox.addEventListener("click", function() {
            let currentDate = new Date().toISOString().split("T")[0];
        
            if (dateString === currentDate) {
                // Jika hari ini, beri hati dan munculkan popup dengan foto
                logs[dateString] = true;
                localStorage.setItem("logs", JSON.stringify(logs));
                dayBox.classList.add("logged");
                createPopup(images[i], notes[i]);
            } else if (logs[dateString]) {
                // Jika sudah pernah diklik sebelumnya, munculkan popup dengan foto
                createPopup(images[i], notes[i]);
            } else if (dateString < currentDate) {
                // Jika tanggal sudah lewat tapi belum diklik, munculkan pesan
                createPopup("", "Kamu telah melewati hari ini tanpa membuka, tidak bisa diakses.");
            } else {
                // Jika tanggal belum diklik dan bukan hari ini, munculkan pesan
                createPopup("", `Belum bisa diakses, datang lagi di tanggal ${dateString} untuk membuka.`);
            }
        });
        

        
        let currentDate = new Date().toISOString().split("T")[0];
        if (dateString === currentDate) {
            dayBox.classList.add("today");
        }
        else if(dateString <= currentDate){
            dayBox.classList.add("before");
        }
        
        calendarEl.appendChild(dayBox);
    }
}


// (format: YYYY, MM-1, DD, HH, MM, SS)
const targetDate = new Date(2025, 3, 4, 17, 0, 0).getTime();
startCountdown(targetDate);


createCalendar();

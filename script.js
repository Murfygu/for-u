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

document.addEventListener("click", function(e) {
    // Create a heart element
    const heart = document.createElement("div");
    heart.classList.add("click-heart");
    heart.textContent = "❤️";
    
    // Position the heart at the click/touch coordinates
    // Use clientX and clientY for mouse clicks, adjust for scrolling if needed
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
  
    // Append the heart to the body
    document.body.appendChild(heart);
  
    // Remove the heart after the animation completes (2 seconds)
    setTimeout(() => {
      heart.remove();
    }, 2000);
  });
  

function createCalendar() {
    const calendarEl = document.getElementById("calendar");
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

    // **Fixed Start Date: March 26, 2025**
    const startDate = new Date(2025, 2, 26); // March is month 2 (0-based index)

    for (let i = 0; i < 10; i++) {
        let date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        // ✅ Fix: Use local date format to prevent UTC time shift
        let dateString = date.toLocaleDateString("en-CA"); // Format: YYYY-MM-DD

        let dayBox = document.createElement("div");
        dayBox.classList.add("day-box");
        dayBox.textContent = date.getDate();

        if (logs[dateString]) {
            dayBox.classList.add("logged");
        }

        dayBox.addEventListener("click", function () {
            let currentDate = new Date().toLocaleDateString("en-CA");

            if (dateString === currentDate) {
                logs[dateString] = true;
                localStorage.setItem("logs", JSON.stringify(logs));
                dayBox.classList.add("logged");
                createPopup(images[i], notes[i]);
            } else if (logs[dateString]) {
                createPopup(images[i], notes[i]);
            } else if (dateString < currentDate) {
                createPopup("", "Yahhh ga dibuka pas tanggalnya :( jadi ga bisa dibukaaa");
            } else {
                createPopup("", `Belum bisa diakses, buka lagii pas tanggal ${dateString}. Sabar yaaa`);
            }
        });

        let currentDate = new Date().toLocaleDateString("en-CA");
        if (dateString === currentDate) {
            dayBox.classList.add("today");
        } else if (dateString < currentDate) {
            dayBox.classList.add("before");
        }

        calendarEl.appendChild(dayBox);
    }
}

// Define your random messages
const messages = [
    "Haiii", "Helooww", "Heheehehhehehhe", "Heheee", "haaaaaaaaiiiiiii", "Sayangggggg", "Baee acuuuu", "Bee", "Bebebebbebbe", "Kangen", "Kangenn", "Kaaaangeeennnn", "Hehe", "❤️", "😻", "💛", "😭", "🥰", "😘", "💗", "🩷", "🩵", "🤍", "🫀", "💕", "🫶", "pelukk", "Ga sabarrr", "Sayang bangeet", "Sama gw terus yaaa", "Thanks yaaa selalu buat gw hepii", "Gw dibuat hepi mulu sama uuuu", "Hanzzzz", "Jel jel", "Hanzelll", "Mangaattt", "Sabar yooww", "Semoga sukaaa", "Temenin gw terus yaaa", "Ayo pergiii", "Ayok pergi mammm", "Jangan lupa minumm", "Minummm", "Sehat-sehat yaa senggg", "Seneng seneng yaaa", "Mangaaatt", "Kalo kangen bilanggg", "3 bulan paling bahagiaa", "Cowo yang paling gw sayang sedunia,\nseangkasa, sejagat raya", "Lucu banget sih kamu", "Pengen gigittt", "Rawrrr", "Yok nontonnn", "Pengen nyantai sama uuu", "Temenin gw sampe tua yaa hehe", "Diapain siiii sayang banget kacauuuu", "Gw dibikin sesayang ituuuu", "Senenggg ngeliat u manja hehe", "Suka bangettt", "Makin ketemu makin sayaaangg gada obat", "Gw dibuat senempel ituuuu, gw lem juga ya luuu", "Mau dipeluk uu 24/7 365 selamanyaaa", "U charger gw hehee", "U pengisi energiii", "Tiap cape pengennya ketemu u ajaaa,\nserasa senyaman ituuu", "Mau masukin u ke kantong\nbiar bisa dibawa kemana-manaaa", "Pengen makan bebek sama uuu", "Sekarang tiap pengen makan apa,\nmau makannya sama uuu", "Senenggg explore tempat sama uuu", "Seneng ngelakuin apapun sama uuu", "Kalo sama u diem doang pun seneng bangeeeet", "Kok bisa ada orang sespesial uuu", "Syukur bangeeettt bisa ketemu uuu", "Di antara 8 juta orang, u yg paling spesial di hatiiii", "hanz buaz", "Kamu senyumku tiap harinyaaa", "Dunia serasa milik berduaa", "Ada yg kurang kalo gada uu", "Semoga gw bisa bahagiain uuu selaluu", "Gw mau jadi pendukung u selamanyaa", "U rumah gw, tempat gw istirahat dan bisa ngelakuin apapun", "Lop lop", "Senyum u paling maniss", "Kamu manis amat si seng", "sopo jenengmu", "piye kabare", "Aku ora butuh akeh, cukup kowe", "Kowe kuwi penting kanggo aku", "Kowe wis ngombe durung?"
  ];
  
  // Get elements
  const chatIcon = document.getElementById('chatIcon');

// When the chat icon is clicked, display a floating message
chatIcon.addEventListener('click', function() {
  // Select a random message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  // Create a new element for the floating message
  const floatingMessage = document.createElement('div');
  floatingMessage.classList.add('floating-chat');
  floatingMessage.textContent = randomMessage;

  // Append the floating message inside the chat icon container (so it positions relative to the icon)
  chatIcon.parentElement.appendChild(floatingMessage);

  // Remove the floating message after the animation (3 seconds)
  setTimeout(() => {
    floatingMessage.remove();
  }, 3000);
});

const heartIcon = document.getElementById("heartIcon");

// Function to trigger beat animation
function triggerBeat() {
  heartIcon.classList.add("heart-beat");
  setTimeout(() => {
    heartIcon.classList.remove("heart-beat");
  }, 400); // duration of the beat animation
}

// On click, trigger beat immediately
heartIcon.addEventListener("click", triggerBeat);

// Automatically trigger beat every 1 second
setInterval(triggerBeat, 1500);



// (format: YYYY, MM-1, DD, HH, MM, SS)
const targetDate = new Date(2025, 3, 4, 17, 0, 0).getTime();
startCountdown(targetDate);

createCalendar();





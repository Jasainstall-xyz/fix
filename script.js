// 1. Hilangkan tanda pagar (#) di URL saat klik menu navigasi / tombol jangkar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '#top') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
        }
    });
});

// Bersihkan # jika URL dibuka langsung dengan hash dari luar
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
        }
        window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }
});

// 2. Kontrol Widget Asisten AI
const toggleBtn = document.getElementById('ai-toggle-btn');
const closeBtn = document.getElementById('ai-close-btn');
const chatBox = document.getElementById('ai-chat-box');
const messagesContainer = document.getElementById('ai-messages');
const inputField = document.getElementById('ai-input');
const sendBtn = document.getElementById('ai-send-btn');

// Buka & Tutup Kotak AI
toggleBtn.addEventListener('click', () => {
    chatBox.classList.remove('hidden');
    toggleBtn.classList.add('hidden');
});

closeBtn.addEventListener('click', () => {
    chatBox.classList.add('hidden');
    toggleBtn.classList.remove('hidden');
});

// Fungsi menambah pesan ke layar chat
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', sender);
    msgDiv.innerHTML = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Logika jawaban cerdas untuk customer awam
function getBotResponse(userText) {
    const text = userText.toLowerCase();

    if (text.includes('harga') || text.includes('biaya') || text.includes('beda') || text.includes('60') || text.includes('70')) {
        return "Perbedaannya jelas ya:<br>• <b>Paket Rp 60.000:</b> Untuk laptop resmi baru yang punya lisensi Office bawaan pabrik (dibantu buat akun baru & klaim).<br>• <b>Paket Rp 70.000:</b> Untuk laptop lama, habis instal ulang, laptop non-resmi/lokal tanpa lisensi bawaan, atau lupa akun Office lama (dipasangkan Office Full Activated + aplikasi standar).";
    }
    else if (text.includes('adobe') || text.includes('photoshop') || text.includes('premiere') || text.includes('master')) {
        return "Ada dong! Kami punya lengkap keluarga <b>Adobe Master Collection</b> (Photoshop, Premiere Pro, After Effects, Illustrator, Lightroom, dll) untuk Windows 10 & 11. Langsung chat WhatsApp untuk cek kecocokan spek laptopmu ya!";
    }
    else if (text.includes('download') || text.includes('teamviewer') || text.includes('edge') || text.includes('install')) {
        return "Di browser Microsoft Edge ini, ikuti langkah berikut:<br>1. Klik tombol biru <b>'Download TeamViewer Host (.exe)'</b>.<br>2. Jika muncul jendela login Dropbox, klik tulisan <b>'Or just download'</b> di bagian bawah pop-up.<br>3. Buka file hasil unduhan di pojok kanan atas browser, klik <b>Yes</b>, lalu klik <b>Accept - next</b>.<br>4. Setelah jendela TeamViewer terbuka, foto <b>ID & Kata Sandi</b> lalu kirim ke WA admin.";
    }
    else if (text.includes('id') || text.includes('password') || text.includes('sandi')) {
        return "Setelah proses instalasi TeamViewer Host selesai, aplikasi akan otomatis terbuka dan menampilkan kotak bertuliskan <b>'ID Anda'</b> (angka 9–10 digit) beserta <b>'Kata Sandi'</b> di bawahnya. Foto layar tersebut dan kirim ke WhatsApp admin (0895-2223-8269) ya!";
    }
    else if (text.includes('windows') || text.includes('win 10') || text.includes('win 11')) {
        return "Bisa! Semua layanan dan file download di website ini sudah mendukung penuh <b>Windows 10 dan Windows 11</b>.";
    }
    else if (text.includes('office') || text.includes('akun') || text.includes('lupa') || text.includes('lokal')) {
        return "Kalau laptopnya seri lokal/distributor tanpa lisensi bawaan, laptop lama, atau lupa akun Office sebelumnya, langsung ambil <b>Paket Rp 70.000</b> saja agar Office langsung aktif!";
    } 
    else if (text.includes('syarat') || text.includes('aturan') || text.includes('sentuh')) {
        return "Syaratnya 3 saja: <br>1. Internet stabil.<br>2. <b>Jangan sentuh mouse/keyboard</b> saat teknisi bekerja.<br>3. Charger laptop terpasang.";
    } 
    else if (text.includes('virus') || text.includes('aman') || text.includes('crack')) {
        return "Semua installer sudah diuji bersih tanpa virus. Anda juga bisa memantau langsung pergerakan kursor teknisi di layar laptop Anda dari awal sampai selesai.";
    } 
    else {
        return "Silakan pilih paket yang sesuai di halaman ini atau klik tombol <b>Chat WhatsApp</b> untuk langsung terhubung dengan teknisi kami!";
    }
}

// Kirim pesan dari tombol cepat
function sendQuickReply(question) {
    addMessage(question, 'user');
    setTimeout(() => {
        const reply = getBotResponse(question);
        addMessage(reply, 'bot');
    }, 400);
}

// Kirim pesan dari ketikan manual
function handleUserSend() {
    const text = inputField.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    inputField.value = '';
    setTimeout(() => {
        const reply = getBotResponse(text);
        addMessage(reply, 'bot');
    }, 400);
}

sendBtn.addEventListener('click', handleUserSend);
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserSend();
});

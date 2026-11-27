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
        return "Ada dong! Kami punya lengkap keluarga <b>Adobe Master Collection</b> (Photoshop, Premiere Pro, After Effects, Illustrator, Lightroom, dll). Langsung chat WhatsApp untuk cek kecocokan spek laptopmu ya!";
    }
    else if (text.includes('download') || text.includes('rustdesk') || text.includes('edge')) {
        return "Di browser Microsoft Edge ini, klik tombol biru <b>'Download RustDesk Resmi'</b> di halaman ini. Setelah selesai, lihat pojok kanan atas browser (ikon panah ke bawah), lalu klik file <b>rustdesk.exe</b> untuk membukanya.";
    } 
    else if (text.includes('id') || text.includes('password') || text.includes('sandi')) {
        return "Setelah aplikasi RustDesk terbuka, lihat di bagian kiri bertuliskan <b>'ID Anda'</b> (9 digit angka) dan <b>'Kata Sandi Sekali Pakai'</b> di bawahnya. Foto layar tersebut dan kirim ke WhatsApp admin (0895-2223-8269) ya!";
    } 
    else if (text.includes('office') || text.includes('akun') || text.includes('lupa') || text.includes('lokal')) {
        return "Kalau laptopnya seri lokal/distributor tanpa lisensi bawaan, laptop lama, atau lupa akun Office sebelumnya, langsung ambil <b>Paket Rp 70.000</b> saja agar Office langsung aktif permanen!";
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
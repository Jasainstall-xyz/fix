// Nomor WhatsApp Admin (Format Internasional tanpa +)
const NOMOR_WA_ADMIN = "6289522238269";

// 1. Hapus tanda pagar (#) di URL & Smooth Scroll saat klik link internal
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Tutup menu mobile otomatis jika sedang terbuka
        const navLinks = document.getElementById('nav-links');
        if (navLinks) navLinks.classList.remove('active');

        if (targetId === '#') {
            e.preventDefault();
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

// Bersihkan # jika dibuka langsung dari link ber-hash
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
        }
        window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }
});

// 2. Toggle Menu Mobile (Hamburger)
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// 3. Fungsi Pilih Paket Layanan -> Otomatis isi form & scroll tanpa #
function pilihLayanan(namaPaket) {
    const inputPaket = document.getElementById('paket');
    const formSection = document.getElementById('pesan');
    if (inputPaket) {
        inputPaket.value = namaPaket;
    }
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }
}

// 4. Kirim Formulir ke WhatsApp
const orderForm = document.getElementById('order-form');
if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nama = document.getElementById('nama').value.trim();
        const paket = document.getElementById('paket').value.trim();
        const tvId = document.getElementById('tv_id').value.trim() || "Belum diinstall";
        const catatan = document.getElementById('catatan').value.trim() || "-";

        const pesanWA = `Halo Admin, saya mau order layanan remote:%0A%0A` +
                        `*Nama:* ${encodeURIComponent(nama)}%0A` +
                        `*Layanan:* ${encodeURIComponent(paket)}%0A` +
                        `*ID & Sandi TeamViewer:* ${encodeURIComponent(tvId)}%0A` +
                        `*Catatan:* ${encodeURIComponent(catatan)}`;

        window.open(`https://wa.me/${NOMOR_WA_ADMIN}?text=${pesanWA}`, '_blank');
    });
}

// 5. Widget Asisten AI
const aiToggle = document.getElementById('ai-toggle');
const aiChatBox = document.getElementById('ai-chat-box');
const aiClose = document.getElementById('ai-close');
const aiForm = document.getElementById('ai-form');
const aiInput = document.getElementById('ai-input');
const aiMessages = document.getElementById('ai-messages');

if (aiToggle && aiChatBox) {
    aiToggle.addEventListener('click', () => {
        aiChatBox.classList.toggle('active');
    });
}

if (aiClose && aiChatBox) {
    aiClose.addEventListener('click', () => {
        aiChatBox.classList.remove('active');
    });
}

function getBotReply(input) {
    const text = input.toLowerCase();
    if (text.includes('download') || text.includes('teamviewer') || text.includes('edge') || text.includes('install') || text.includes('drive')) {
        return "Ikuti langkah berikut di browser:<br>1. Klik tombol biru <b>'Download TeamViewer Host (.exe)'</b>.<br>2. Jika Google Drive menampilkan halaman <i>'Tidak dapat memindai file dari virus'</i>, klik <b>Tetap download</b>.<br>3. Buka file di menu Downloads pojok kanan atas browser, klik <b>Yes</b>, lalu klik <b>Accept - next</b>.<br>4. Setelah jendela TeamViewer terbuka, foto <b>ID & Kata Sandi</b> lalu kirim ke WA admin.";
    } else if (text.includes('id') || text.includes('password') || text.includes('sandi')) {
        return "Setelah instalasi TeamViewer Host selesai, aplikasi akan otomatis terbuka dan menampilkan <b>'ID Anda'</b> (9–10 digit) serta <b>'Kata Sandi'</b>. Foto layar tersebut dan kirim ke WhatsApp admin (0895-2223-8269).";
    } else if (text.includes('harga') || text.includes('biaya') || text.includes('paket')) {
        return "Paket kami mulai dari <b>Rp 50.000</b> (Office & Standar), <b>Rp 100.000</b> (Paket Lengkap + Aktivasi), hingga <b>Rp 150.000</b> (Install Ulang / Aplikasi Berat). Silakan klik tombol <b>Pilih Paket Ini</b> di bagian Layanan.";
    } else if (text.includes('aman') || text.includes('privasi')) {
        return "100% aman! Anda bisa melihat langsung kursor teknisi bekerja di layar Anda secara live, dan setelah selesai akses remote otomatis terputus begitu aplikasi ditutup.";
    } else {
        return "Untuk konsultasi spesifik atau kirim foto ID TeamViewer, silakan langsung isi formulir di halaman ini atau hubungi WhatsApp admin di <b>0895-2223-8269</b>.";
    }
}

if (aiForm) {
    aiForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userText = aiInput.value.trim();
        if (!userText) return;

        // Tampilkan pesan user
        const userMsg = document.createElement('div');
        userMsg.className = 'msg user';
        userMsg.textContent = userText;
        aiMessages.appendChild(userMsg);
        aiInput.value = '';

        // Tampilkan balasan bot
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'msg bot';
            botMsg.innerHTML = getBotReply(userText);
            aiMessages.appendChild(botMsg);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }, 300);
    });
}

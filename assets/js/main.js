document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SISTEM NAVIGASI HALAMAN (SPA) ---
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('[data-page-link]');
    const appContainer = document.getElementById('app-container');

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.querySelector(`[data-page="${pageId}"]`);
        if (targetPage) {
            // Scroll ke atas saat ganti halaman
            window.scrollTo(0, 0);
            // Tambahkan delay kecil untuk efek transisi
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 10);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page-link');
            showPage(pageId);
        });
    });

    // --- 2. LOGIKA MENU HAMBURGER ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- 3. LOGIKA ANIMASI STATISTIK (HANYA DI HALAMAN BERANDA) ---
    const statItems = document.querySelectorAll('#beranda .stat-item');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.stat-number');
                startCounting(counter);
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    function startCounting(counter) {
        const target = +counter.getAttribute('data-target');
        const speed = 200;
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString('id-ID');
            }
        };
        updateCount();
    }

    // --- 4. LOGIKA KALKULATOR JEJAK KARBON ---
    const calculatorForm = document.getElementById('carbon-calculator-form');
    const resultBox = document.getElementById('carbon-result');

    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Ambil nilai dari form
            const transport = document.querySelector('input[name="transport"]:checked')?.value || 'sepeda';
            const meat = document.querySelector('input[name="meat"]:checked')?.value || 'jarang';
            const electricity = document.getElementById('listrik').value || 0;

            // Logika perhitungan sederhana (ini hanya contoh)
            let transportScore = 0;
            if (transport === 'mobil') transportScore = 2.5;
            else if (transport === 'motor') transportScore = 1.5;
            else if (transport === 'umum') transportScore = 0.5;

            let meatScore = 0;
            if (meat === 'setiap-hari') meatScore = 3.5;
            else if (meat === 'beberapa-kali') meatScore = 1.8;

            const electricityScore = electricity * 0.0005; // asumsi 0.5kg CO2/kWh

            const totalScore = ((transportScore + meatScore + electricityScore) * 12).toFixed(2); // total per tahun

            // Tampilkan hasil
            document.getElementById('carbon-score').innerText = totalScore;
            resultBox.style.display = 'block';
        });
    }

    // --- 5. LOGIKA EFEK PARALLAX (HANYA DI HALAMAN BERANDA) ---
    const heroBg = document.querySelector('#beranda .hero-bg-layer');
    const heroContent = document.querySelector('#beranda .hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroBg && heroContent) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrolled * -0.3}px)`;
            heroContent.style.opacity = 1 - scrolled / 600;
        }
    });

        // --- 6. LOGIKA FILTER PETA AKSI ---
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            filterBtns.forEach(b => b.classList.remove('active'));
            // Tambahkan class active ke tombol yang diklik
            btn.classList.add('active');
            
            // Di sini Anda bisa menambahkan logika untuk memfilter marker di peta sungguhan
            // Contoh: console.log('Filter yang dipilih:', btn.getAttribute('data-filter'));
        });
    });

    console.log("EkoPedia Website dengan halaman Peta Aksi & EkoLearn Marketplace & Carbon Calculator siap!");
});
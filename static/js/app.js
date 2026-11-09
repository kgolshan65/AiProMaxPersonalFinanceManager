document.addEventListener('DOMContentLoaded', function () {
    /* ---- scroll progress bar ---- */
    const progress = document.getElementById('scroll-progress');
    function updateProgress() {
        if (!progress) return;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
        progress.style.width = (ratio * 100) + '%';
    }
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    /* ---- auto scroll reveal (multi-stage) ---- */
    if (typeof AOS !== 'undefined') {
        const main = document.querySelector('main');
        if (main) {
            const targets = main.querySelectorAll(
                '.banner, .card, .summary-box, .filters, .chart-container, table, h2, h3, p, form'
            );
            const anims = ['fade-up', 'fade-up', 'zoom-in', 'fade-in', 'fade-up'];
            let seq = 0;
            targets.forEach((el) => {
                if (el.hasAttribute('data-aos')) return;
                el.setAttribute('data-aos', anims[seq % anims.length]);
                el.setAttribute('data-aos-delay', (seq % 5) * 45);
                seq++;
            });
        }
        AOS.init({
            duration: 650,
            easing: 'ease-out-cubic',
            once: false,
            offset: 70
        });
    }

    /* ---- logout confirmation ---- */
    const logoutBtn = document.getElementById('logout-btn');
    const logoutForm = document.getElementById('logout-form');
    if (logoutBtn && logoutForm) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'خروج از حساب',
                    text: 'آیا مطمئن هستید که می‌خواهید خارج شوید؟',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'بله، خروج',
                    cancelButtonText: 'انصراف',
                    confirmButtonColor: '#dc3545'
                }).then((result) => {
                    if (result.isConfirmed) logoutForm.submit();
                });
            } else if (confirm('آیا مطمئن هستید که می‌خواهید خارج شوید؟')) {
                logoutForm.submit();
            }
        });
    }
});

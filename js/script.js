// ===== Initialize AOS Animation Library =====
document.addEventListener('DOMContentLoaded', function() {
    // Prevent scrolling initially
    document.body.classList.add('loading');

    // ===== Handle URL Parameters for Different Views =====
    const urlParams = new URLSearchParams(window.location.search);
    const viewMode = urlParams.get('view');

    // Hide specific event cards if view=simple
    if (viewMode === 'simple') {
        const eventCards = document.querySelectorAll('.event-card');

        // Hide Haldi/Dua card (1st card, index 0)
        if (eventCards[0]) {
            eventCards[0].style.display = 'none';
        }

        // Hide Mehendi card (2nd card, index 1)
        if (eventCards[1]) {
            eventCards[1].style.display = 'none';
        }
    }

    // Get elements
    const introScreen = document.getElementById('intro-screen');
    const openBtn = document.getElementById('open-btn');
    const videoOverlay = document.getElementById('video-overlay');
    const introVideo = document.getElementById('intro-video');
    const bgMusic = document.getElementById('bg-music');
    const mainContent = document.getElementById('main-content');

    // ===== Preload Images for Smooth Transition =====
    const imagesToPreload = [
        'assets/couple-image.png',
        'assets/beach-arch.png'
    ];

    let imagesLoaded = 0;
    const totalImages = imagesToPreload.length;

    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                imagesLoaded++;
                resolve();
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    // Preload all images
    Promise.all(imagesToPreload.map(preloadImage)).then(() => {
        console.log('All images preloaded');
        // Add preload class to force render
        mainContent.classList.add('preload');
        setTimeout(() => mainContent.classList.remove('preload'), 10);
    }).catch(err => {
        console.error('Error preloading images:', err);
    });

    // ===== Open Button Click Handler =====
    openBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';

        setTimeout(() => {
            // Hide intro screen
            introScreen.classList.add('hidden');

            // Show video overlay
            videoOverlay.classList.add('active');

            // Play video and music
            const playPromise = introVideo.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Video started playing
                    // Try to play music (may be blocked by browser)
                    bgMusic.play().catch(err => {
                        console.log('Audio autoplay prevented:', err);
                        // Music will play when user interacts with page
                    });
                }).catch(err => {
                    console.error('Video playback failed:', err);
                });
            }
        }, 300);
    });

    // ===== Video End Handler =====
    introVideo.addEventListener('ended', function() {
        // Immediate smooth transition to main content
        // Hide video overlay
        videoOverlay.classList.remove('active');

        // Show main content immediately
        requestAnimationFrame(() => {
            mainContent.classList.add('visible');
        });

        // Remove intro screen from DOM after transition
        setTimeout(() => {
            introScreen.remove();
            videoOverlay.remove();
        }, 1000);

        // Enable scrolling
        document.body.classList.remove('loading');

        // Initialize AOS animations
        initializeAOS();

        // Start countdown timer
        initializeCountdown();

        // Initialize scratch card after a delay
        setTimeout(() => {
            initializeScratchCard();
        }, 1500);
    });

    // ===== Skip video on click (optional) =====
    videoOverlay.addEventListener('click', function(e) {
        if (e.target === videoOverlay) {
            // Skip to end
            introVideo.currentTime = introVideo.duration;
        }
    });

    // ===== Music Control (fade in/out) =====
    function fadeInAudio(audio, duration = 2000) {
        audio.volume = 0;
        audio.play();

        let volume = 0;
        const step = 0.05;
        const interval = duration / (1 / step);

        const fadeIn = setInterval(() => {
            if (volume < 0.7) {
                volume += step;
                audio.volume = Math.min(volume, 0.7);
            } else {
                clearInterval(fadeIn);
            }
        }, interval);
    }

    function fadeOutAudio(audio, duration = 1000) {
        let volume = audio.volume;
        const step = 0.05;
        const interval = duration / (volume / step);

        const fadeOut = setInterval(() => {
            if (volume > 0) {
                volume -= step;
                audio.volume = Math.max(volume, 0);
            } else {
                clearInterval(fadeOut);
                audio.pause();
            }
        }, interval);
    }

    // ===== Initialize AOS Animations =====
    function initializeAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 0,
            delay: 0,
            startEvent: 'load',
            disable: false,
            mirror: false
        });
        // Refresh AOS to trigger animations immediately
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }

    // ===== Countdown Timer with Flip Animation =====
    function initializeCountdown() {
        // Set wedding date: November 28, 2026
        const weddingDate = new Date('2026-11-28T11:00:00').getTime();

        // Store previous values for flip animation
        let prevDays = -1, prevHours = -1, prevMinutes = -1, prevSeconds = -1;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update with flip animation
            updateWithFlip('days', days, prevDays);
            updateWithFlip('hours', hours, prevHours);
            updateWithFlip('minutes', minutes, prevMinutes);
            updateWithFlip('seconds', seconds, prevSeconds);

            // Update previous values
            prevDays = days;
            prevHours = hours;
            prevMinutes = minutes;
            prevSeconds = seconds;

            // If countdown is finished
            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
            }
        }

        function updateWithFlip(id, newValue, oldValue) {
            const element = document.getElementById(id);
            const formattedValue = String(newValue).padStart(2, '0');

            if (newValue !== oldValue && oldValue !== -1) {
                // Trigger flip animation
                element.classList.add('flip-up');

                setTimeout(() => {
                    element.textContent = formattedValue;
                    element.classList.remove('flip-up');
                    element.classList.add('flipNumber');

                    setTimeout(() => {
                        element.classList.remove('flipNumber');
                    }, 600);
                }, 300);
            } else {
                element.textContent = formattedValue;
            }
        }

        // Initial call
        updateCountdown();

        // Update every second
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // ===== Scratch Card Functionality =====
    function initializeScratchCard() {
        const canvas = document.getElementById('scratchCard');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const wrapper = document.querySelector('.scratch-card-wrapper');
        const revealBox = document.querySelector('.scratch-reveal');
        if (!wrapper || !revealBox) return;

        // Set canvas size to match the reveal box exactly
        const width = revealBox.offsetWidth;
        const height = revealBox.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        // Explicitly set canvas dimensions in CSS
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        // Draw rounded rectangle scratch surface
        function roundRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        }

        // Create scratch surface with rounded corners
        ctx.save();
        roundRect(ctx, 0, 0, width, height, 25);

        // Add gradient for depth
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(212, 184, 150, 0.95)');
        gradient.addColorStop(1, 'rgba(201, 169, 110, 1)');
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        // Add text on scratch surface
        ctx.fillStyle = '#fff';
        ctx.font = 'italic 18px serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 3;
        ctx.fillText('Scratch here', width / 2, height / 2 - 8);
        ctx.font = '14px sans-serif';
        ctx.fillText('to reveal the date', width / 2, height / 2 + 15);
        ctx.shadowBlur = 0;

        // Scratch functionality
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function getCoordinates(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            let clientX, clientY;

            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }

        function scratch(x, y) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
        }

        function startDrawing(e) {
            e.preventDefault();
            isDrawing = true;
            const coords = getCoordinates(e);
            lastX = coords.x;
            lastY = coords.y;
            scratch(coords.x, coords.y);
        }

        function draw(e) {
            if (!isDrawing) return;
            e.preventDefault();

            const coords = getCoordinates(e);

            // Draw line between points
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 50;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();

            lastX = coords.x;
            lastY = coords.y;

            // Check if enough is scratched
            checkScratchPercentage();
        }

        function stopDrawing() {
            isDrawing = false;
        }

        let confettiTriggered = false;

        function checkScratchPercentage() {
            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;
            let transparent = 0;

            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i + 3] < 128) {
                    transparent++;
                }
            }

            const percentage = (transparent / (pixels.length / 4)) * 100;

            if (percentage > 50 && !confettiTriggered) {
                confettiTriggered = true;

                // Trigger confetti celebration
                triggerConfetti();

                // Remove canvas completely
                canvas.style.transition = 'opacity 0.5s';
                canvas.style.opacity = '0';
                setTimeout(() => {
                    canvas.style.display = 'none';
                }, 500);
            }
        }

        function triggerConfetti() {
            const myConfetti = confetti.create(document.getElementById('confetti-canvas'), {
                resize: true,
                useWorker: true
            });

            // Wedding colors
            const colors = ['#c9a96e', '#d4b896', '#f5f3ed', '#ffffff', '#e8dcc8'];

            // First burst
            myConfetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: colors,
                ticks: 200,
                gravity: 1,
                drift: 0,
                scalar: 1.2
            });

            // Second burst from sides
            setTimeout(() => {
                myConfetti({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                myConfetti({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });
            }, 200);

            // Continuous confetti rain for celebration
            let duration = 3000;
            let end = Date.now() + duration;

            (function frame() {
                myConfetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                myConfetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }

        // Mouse events
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        // Touch events
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
    }

    // ===== Smooth Scroll for Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Parallax Effect on Scroll (Optional Enhancement) =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.couple-image');

        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== Handle Music Replay =====
    bgMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });

    // ===== Release Lanterns Animation =====
    const releaseLanternsBtn = document.getElementById('release-lanterns-btn');
    const lanternsContainer = document.getElementById('lanterns-animation-container');

    if (releaseLanternsBtn && lanternsContainer) {
        releaseLanternsBtn.addEventListener('click', function() {
            // Release multiple lanterns
            const numberOfLanterns = 15;

            for (let i = 0; i < numberOfLanterns; i++) {
                setTimeout(() => {
                    createFloatingLantern();
                }, i * 300); // Stagger the lantern releases
            }

            // Disable button temporarily
            releaseLanternsBtn.disabled = true;
            releaseLanternsBtn.style.opacity = '0.6';
            releaseLanternsBtn.style.cursor = 'not-allowed';

            // Re-enable after animation
            setTimeout(() => {
                releaseLanternsBtn.disabled = false;
                releaseLanternsBtn.style.opacity = '1';
                releaseLanternsBtn.style.cursor = 'pointer';
            }, 8000);
        });
    }

    function createFloatingLantern() {
        const lantern = document.createElement('img');
        lantern.src = 'assets/lantern.png';
        lantern.className = 'floating-lantern';

        // Random starting position at bottom
        const startX = Math.random() * 100;
        lantern.style.left = startX + '%';
        lantern.style.bottom = '-100px';

        // Random drift and rotation
        const drift = (Math.random() - 0.5) * 200; // Random drift left or right
        const rotate = (Math.random() - 0.5) * 30; // Random rotation

        lantern.style.setProperty('--drift', drift + 'px');
        lantern.style.setProperty('--rotate', rotate + 'deg');

        // Random size variation
        const size = 60 + Math.random() * 40; // Between 60px and 100px
        lantern.style.width = size + 'px';

        // Random animation duration
        const duration = 7 + Math.random() * 3; // Between 7s and 10s
        lantern.style.animationDuration = duration + 's';

        lanternsContainer.appendChild(lantern);

        // Remove lantern after animation completes
        setTimeout(() => {
            lantern.remove();
        }, duration * 1000);
    }
});

// ===== Service Worker for PWA (Optional - for offline support) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below to enable PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===== Prevent right-click on images (Optional) =====
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        // Uncomment to prevent right-click on images
        // e.preventDefault();
    }
});

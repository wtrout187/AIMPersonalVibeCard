// Futuristic Vibe Card Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize matrix rain background
    initMatrixRain();
    
    // Quote text and typing animation
    const quote = "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They're not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can't do is ignore them. Because they change things. They push the human race forward. And while some may see them as the crazy ones, we see genius. Because the people who are crazy enough to think they can change the world, are the ones who do.";
    
    const quoteElement = document.getElementById('quoteText');
    const powerButton = document.getElementById('powerButton');
    const vibeCard = document.getElementById('vibeCard');
    const easterEgg = document.getElementById('easterEgg');
    
    let typingIndex = 0;
    let isTyping = false;
    let konamiSequence = [];
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    // Terminal typing effect
    function typeQuote() {
        if (isTyping) return;
        isTyping = true;
        quoteElement.textContent = '';
        typingIndex = 0;
        
        function typeNextChar() {
            if (typingIndex < quote.length) {
                quoteElement.textContent += quote[typingIndex];
                typingIndex++;
                setTimeout(typeNextChar, Math.random() * 50 + 30); // Varied typing speed
            } else {
                isTyping = false;
            }
        }
        
        typeNextChar();
    }
    
    // Start typing animation after a short delay
    setTimeout(typeQuote, 1000);
    
    // Power button theme toggle
    powerButton.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        // Add power-up animation
        powerButton.style.transform = 'scale(0.8)';
        setTimeout(() => {
            powerButton.style.transform = 'scale(1.1)';
            setTimeout(() => {
                powerButton.style.transform = 'scale(1)';
            }, 100);
        }, 100);
        
        // Flash effect
        const flashOverlay = document.createElement('div');
        flashOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            z-index: 9999;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(flashOverlay);
        
        setTimeout(() => {
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(flashOverlay);
            }, 300);
        }, 50);
    });
    
    // Parallax effect on mouse movement
    document.addEventListener('mousemove', function(e) {
        const card = vibeCard;
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const deltaX = (mouseX - cardCenterX) / rect.width;
        const deltaY = (mouseY - cardCenterY) / rect.height;
        
        const rotateX = deltaY * 5; // Max 5 degrees
        const rotateY = deltaX * 5; // Max 5 degrees
        
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        
        // Parallax for decorative elements
        const techLines = document.querySelectorAll('.tech-lines .line');
        techLines.forEach((line, index) => {
            const intensity = (index % 2 === 0) ? 0.5 : -0.5;
            line.style.transform = `translate(${deltaX * intensity}px, ${deltaY * intensity}px)`;
        });
    });
    
    // Reset card transform when mouse leaves
    document.addEventListener('mouseleave', function() {
        vibeCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        
        const techLines = document.querySelectorAll('.tech-lines .line');
        techLines.forEach(line => {
            line.style.transform = 'translate(0px, 0px)';
        });
    });
    
    // Data cards animation on scroll/load
    function animateDataCards() {
        const dataCards = document.querySelectorAll('.data-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInData 0.6s ease forwards';
                }
            });
        }, {
            threshold: 0.1
        });
        
        dataCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    animateDataCards();
    
    // Enhanced hover effects for data cards
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Intensify hologram effect
            const hologram = this.querySelector('.hologram-effect');
            hologram.style.animationDuration = '1s';
            
            // Add data stream effect
            const dataValue = this.querySelector('.data-value');
            dataValue.style.textShadow = '0 0 10px rgba(0, 255, 65, 0.8)';
            
            // Sound effect simulation (visual feedback)
            this.style.boxShadow = `
                0 0 30px rgba(0, 255, 65, 0.6),
                inset 0 0 30px rgba(0, 255, 65, 0.2),
                0 0 60px rgba(139, 0, 255, 0.3)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            const hologram = this.querySelector('.hologram-effect');
            hologram.style.animationDuration = '3s';
            
            const dataValue = this.querySelector('.data-value');
            dataValue.style.textShadow = 'none';
            
            this.style.boxShadow = '';
        });
    });
    
    // Konami Code Easter Egg
    document.addEventListener('keydown', function(e) {
        konamiSequence.push(e.code);
        
        // Keep only the last 10 keys
        if (konamiSequence.length > 10) {
            konamiSequence = konamiSequence.slice(-10);
        }
        
        // Check if sequence matches Konami code
        if (konamiSequence.length === 10) {
            const matches = konamiSequence.every((key, index) => key === konamiCode[index]);
            
            if (matches) {
                activateEasterEgg();
                konamiSequence = []; // Reset sequence
            }
        }
    });
    
    function activateEasterEgg() {
        easterEgg.classList.add('active');
        
        // Matrix rain effect
        createMatrixRain();
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            easterEgg.classList.remove('active');
            removeMatrixRain();
        }, 5000);
        
        // Add screen shake effect
        document.body.style.animation = 'screenShake 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    }
    
    // Click to close easter egg
    easterEgg.addEventListener('click', function() {
        this.classList.remove('active');
        removeMatrixRain();
    });
    
    // Matrix rain effect for easter egg
    function createMatrixRain() {
        const matrixContainer = document.createElement('div');
        matrixContainer.id = 'matrixRain';
        matrixContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
            drop.style.cssText = `
                position: absolute;
                color: #00FF41;
                font-family: monospace;
                font-size: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}%;
                animation: matrixFall ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            matrixContainer.appendChild(drop);
        }
        
        document.body.appendChild(matrixContainer);
        
        // Add matrix fall animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes matrixFall {
                0% { transform: translateY(-100vh); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
            @keyframes screenShake {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-0.5deg); }
                20% { transform: translate(-3px, 0px) rotate(0.5deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(0.5deg); }
                50% { transform: translate(-1px, 2px) rotate(-0.5deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-0.5deg); }
                80% { transform: translate(-1px, -1px) rotate(0.5deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    function removeMatrixRain() {
        const matrixRain = document.getElementById('matrixRain');
        if (matrixRain) {
            document.body.removeChild(matrixRain);
        }
    }
    
    // Terminal command simulation
    const terminal = document.querySelector('.terminal-body');
    terminal.addEventListener('click', function() {
        if (!isTyping) {
            // Restart typing animation
            typeQuote();
        }
    });
    
    // Add loading sequence on page load
    window.addEventListener('load', function() {
        const loadingSequence = [
            'INITIALIZING NEURAL INTERFACE...',
            'CONNECTING TO QUANTUM NETWORK...',
            'LOADING PERSONALITY MATRIX...',
            'WAYNE TROUT PROFILE LOADED',
            'WELCOME TO THE FUTURE'
        ];
        
        // Create temporary loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            color: #00FF41;
            font-family: 'Electrolize', monospace;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-size: 1.2rem;
            text-align: center;
        `;
        
        const loadingText = document.createElement('div');
        loadingOverlay.appendChild(loadingText);
        document.body.appendChild(loadingOverlay);
        
        let sequenceIndex = 0;
        function showNextLoadingMessage() {
            if (sequenceIndex < loadingSequence.length) {
                loadingText.textContent = loadingSequence[sequenceIndex];
                sequenceIndex++;
                setTimeout(showNextLoadingMessage, 800);
            } else {
                // Fade out loading overlay
                loadingOverlay.style.transition = 'opacity 1s ease';
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(loadingOverlay);
                }, 1000);
            }
        }
        
        setTimeout(showNextLoadingMessage, 500);
    });
    
    // Add random glitch effects periodically
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            const glitchElements = document.querySelectorAll('.data-card, .quote-terminal, .hexagon-frame');
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            
            randomElement.style.filter = 'hue-rotate(180deg) saturate(2)';
            setTimeout(() => {
                randomElement.style.filter = '';
            }, 100);
        }
    }, 3000);
    
    // Circuit animation on data card hover
    const circuitDecorations = document.querySelectorAll('.circuit-decoration');
    circuitDecorations.forEach(decoration => {
        decoration.addEventListener('animationiteration', function() {
            // Add random pulse effect
            if (Math.random() < 0.3) {
                this.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.8)';
                setTimeout(() => {
                    this.style.boxShadow = '';
                }, 200);
            }
        });
    });
});

// Additional utility functions
function createScanLine() {
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: absolute;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00FF41, transparent);
        top: ${Math.random() * 100}%;
        animation: scanSweep 2s linear forwards;
        pointer-events: none;
        z-index: 5;
    `;
    
    document.querySelector('.vibe-card').appendChild(scanLine);
    
    setTimeout(() => {
        scanLine.remove();
    }, 2000);
}

// Add scan line effect periodically
setInterval(createScanLine, 5000);

// Add CSS for scan sweep animation
const scanStyle = document.createElement('style');
scanStyle.textContent = `
    @keyframes scanSweep {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(scanStyle);

// Matrix Rain Background Effect
function initMatrixRain() {
    const matrixContainer = document.getElementById('matrixBackground');
    const matrixChars = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const columns = Math.floor(window.innerWidth / 20);
    
    // Clear existing drops
    matrixContainer.innerHTML = '';
    
    // Create matrix drops
    for (let i = 0; i < columns; i++) {
        createMatrixColumn(i, matrixContainer, matrixChars);
    }
}

function createMatrixColumn(columnIndex, container, chars) {
    const column = document.createElement('div');
    column.style.cssText = `
        position: absolute;
        left: ${columnIndex * 20}px;
        top: 0;
        width: 20px;
        height: 100%;
    `;
    
    // Create multiple drops per column with different delays
    for (let j = 0; j < 3; j++) {
        const drop = document.createElement('div');
        drop.className = 'matrix-drop';
        drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        drop.style.cssText = `
            position: absolute;
            left: 0;
            font-size: ${12 + Math.random() * 8}px;
            animation-duration: ${3 + Math.random() * 5}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        column.appendChild(drop);
        
        // Randomly change character during animation
        setInterval(() => {
            drop.textContent = chars[Math.floor(Math.random() * chars.length)];
        }, 100 + Math.random() * 200);
    }
    
    container.appendChild(column);
}

// Reinitialize matrix rain on window resize
window.addEventListener('resize', initMatrixRain);

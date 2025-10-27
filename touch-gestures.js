// Touch Gestures Module
// Handles Swipe Detection and Touch Interactions

class SwipeDetector {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            threshold: options.threshold || 50,          // Min. Pixel für Swipe
            restraint: options.restraint || 100,         // Max. Pixel in anderen Richtung
            allowedTime: options.allowedTime || 500,     // Max. Zeit für Swipe (ms)
            onSwipeLeft: options.onSwipeLeft || null,
            onSwipeRight: options.onSwipeRight || null,
            onSwipeUp: options.onSwipeUp || null,
            onSwipeDown: options.onSwipeDown || null,
            onSwipeMove: options.onSwipeMove || null     // Visuelles Feedback während Swipe
        };

        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.startTime = 0;
        this.isScrolling = false;

        this.init();
    }

    init() {
        this.element.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.element.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.element.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.startTime = Date.now();
        this.isScrolling = undefined;
    }

    handleTouchMove(e) {
        if (!e.touches.length) return;

        const touch = e.touches[0];
        this.touchEndX = touch.clientX;
        this.touchEndY = touch.clientY;

        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;

        // Detect if user is trying to scroll vertically
        if (this.isScrolling === undefined) {
            this.isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
        }

        // If horizontal swipe, prevent default scrolling
        if (!this.isScrolling && Math.abs(deltaX) > 10) {
            e.preventDefault();
        }

        // Call onSwipeMove for visual feedback
        if (this.options.onSwipeMove && !this.isScrolling) {
            this.options.onSwipeMove(deltaX, deltaY);
        }
    }

    handleTouchEnd(e) {
        const elapsedTime = Date.now() - this.startTime;

        // If it took too long, it's not a swipe
        if (elapsedTime > this.options.allowedTime) {
            this.reset();
            return;
        }

        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;

        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Horizontal Swipe
        if (absDeltaX >= this.options.threshold && absDeltaY <= this.options.restraint) {
            if (deltaX > 0) {
                // Swipe Right
                if (this.options.onSwipeRight) {
                    this.options.onSwipeRight();
                    this.triggerHaptic();
                }
            } else {
                // Swipe Left
                if (this.options.onSwipeLeft) {
                    this.options.onSwipeLeft();
                    this.triggerHaptic();
                }
            }
        }

        // Vertical Swipe
        if (absDeltaY >= this.options.threshold && absDeltaX <= this.options.restraint) {
            if (deltaY > 0) {
                // Swipe Down
                if (this.options.onSwipeDown) {
                    this.options.onSwipeDown();
                    this.triggerHaptic();
                }
            } else {
                // Swipe Up
                if (this.options.onSwipeUp) {
                    this.options.onSwipeUp();
                    this.triggerHaptic();
                }
            }
        }

        this.reset();
    }

    reset() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.isScrolling = false;
    }

    triggerHaptic() {
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }

    destroy() {
        this.element.removeEventListener('touchstart', this.handleTouchStart);
        this.element.removeEventListener('touchmove', this.handleTouchMove);
        this.element.removeEventListener('touchend', this.handleTouchEnd);
    }
}


// Pull-to-Refresh Handler
class PullToRefresh {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            threshold: options.threshold || 80,          // Min. Pull-Distance
            onRefresh: options.onRefresh || null,
            refreshText: options.refreshText || 'Ziehen zum Aktualisieren...',
            releaseText: options.releaseText || 'Loslassen zum Aktualisieren',
            loadingText: options.loadingText || 'Lädt...'
        };

        this.startY = 0;
        this.currentY = 0;
        this.isRefreshing = false;
        this.isPulling = false;

        this.createRefreshIndicator();
        this.init();
    }

    createRefreshIndicator() {
        this.indicator = document.createElement('div');
        this.indicator.className = 'pull-refresh-indicator';
        this.indicator.innerHTML = `
            <div class="refresh-spinner"></div>
            <div class="refresh-text">${this.options.refreshText}</div>
        `;
        this.element.insertBefore(this.indicator, this.element.firstChild);
    }

    init() {
        this.element.addEventListener('touchstart', (e) => this.handleStart(e), { passive: true });
        this.element.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
        this.element.addEventListener('touchend', (e) => this.handleEnd(e), { passive: true });
    }

    handleStart(e) {
        // Only trigger if scrolled to top
        if (this.element.scrollTop === 0 && !this.isRefreshing) {
            this.startY = e.touches[0].clientY;
            this.isPulling = true;
        }
    }

    handleMove(e) {
        if (!this.isPulling || this.isRefreshing) return;

        this.currentY = e.touches[0].clientY;
        const pullDistance = this.currentY - this.startY;

        if (pullDistance > 0) {
            e.preventDefault();

            // Visual feedback
            const distance = Math.min(pullDistance, this.options.threshold * 1.5);
            this.indicator.style.height = `${distance}px`;
            this.indicator.style.opacity = Math.min(distance / this.options.threshold, 1);

            // Update text
            const textEl = this.indicator.querySelector('.refresh-text');
            if (pullDistance >= this.options.threshold) {
                textEl.textContent = this.options.releaseText;
                this.indicator.classList.add('ready');
            } else {
                textEl.textContent = this.options.refreshText;
                this.indicator.classList.remove('ready');
            }
        }
    }

    handleEnd(e) {
        if (!this.isPulling) return;

        const pullDistance = this.currentY - this.startY;

        if (pullDistance >= this.options.threshold && !this.isRefreshing) {
            this.triggerRefresh();
        } else {
            this.reset();
        }

        this.isPulling = false;
    }

    async triggerRefresh() {
        this.isRefreshing = true;
        this.indicator.classList.add('loading');
        const textEl = this.indicator.querySelector('.refresh-text');
        textEl.textContent = this.options.loadingText;

        if (this.options.onRefresh) {
            await this.options.onRefresh();
        }

        // Simulate min loading time for UX
        await new Promise(resolve => setTimeout(resolve, 500));

        this.reset();
        this.isRefreshing = false;
    }

    reset() {
        this.indicator.style.height = '0';
        this.indicator.style.opacity = '0';
        this.indicator.classList.remove('ready', 'loading');
        this.startY = 0;
        this.currentY = 0;
    }

    destroy() {
        this.element.removeEventListener('touchstart', this.handleStart);
        this.element.removeEventListener('touchmove', this.handleMove);
        this.element.removeEventListener('touchend', this.handleEnd);
        this.indicator.remove();
    }
}


// Export für module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SwipeDetector, PullToRefresh };
}

// 🟦 = ENTIRE SECTION DIVIDER


document.addEventListener("DOMContentLoaded", () => {  

// CAROUSEL
    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    function updateSlides(newIndex) {
        slides[currentIndex].classList.add("hidden");
        slides[newIndex].classList.remove("hidden");
        currentIndex = newIndex;

        document.getElementById("carousel-status").textContent =
            `Slide ${newIndex + 1} of ${slides.length}`;
    }

    prevBtn.addEventListener("click", () => {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides(newIndex);
        prevBtn.focus();
    });

    nextBtn.addEventListener("click", () => {
        const newIndex = (currentIndex + 1) % slides.length;
        updateSlides(newIndex);
        nextBtn.focus();
    });

    document.querySelector(".carousel").addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevBtn.click();
        } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextBtn.click();
        }
    });


// RESET FOCUS ON PAGE RELOAD
    (function resetFocusOnReload() {
        const topElement = document.querySelector('body'); // or use a header if you prefer
        if (!topElement) return;

        if (!topElement.hasAttribute('tabindex')) {
            topElement.setAttribute('tabindex', '-1');
            topElement.dataset.tempTabindex = 'true';
        }

        topElement.focus({ preventScroll: true });

        if (topElement.dataset.tempTabindex) {
            topElement.addEventListener('blur', () => {
                topElement.removeAttribute('tabindex');
                delete topElement.dataset.tempTabindex;
            }, { once: true });
        }
    })();


// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦


// CUSTOM FOCUS HANDLER
(function handleFocus() {

    // Add focus indicator and ensure skip links or tabindex=-1 elements can receive focus
    document.addEventListener("focusin", (event) => {
        const el = event.target;

        // Add custom focus class
        el.classList.add("custom-focus-style");

        // If the element is a skip link target, scroll it into view smoothly
        if (el.hasAttribute("tabindex") && el.getAttribute("tabindex") === "-1") {
            el.scrollIntoView({ behavior: "smooth", block: "top" });
        }
    });

    // Remove focus indicator when element loses focus
    document.addEventListener("focusout", (event) => {
        const el = event.target;
        el.classList.remove("custom-focus-style");
    });
})();


// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦


//ARIA-EXPANDED AND ARIA-HIDDEN TOGGLE
    function toggleCandyContent(expandableClass) {
    const candyElements = document.querySelectorAll(`.${expandableClass}`);

    candyElements.forEach(el => {
        const isHidden = el.getAttribute("aria-hidden") === "true";

        // Toggle visibility class
        el.classList.toggle("hidden");

        // Update ARIA
        el.setAttribute("aria-hidden", String(!isHidden));
    });
}
    //hidden/data-expandable class control
    document.querySelectorAll("button[data-expandable]").forEach(button => {
    button.addEventListener("click", () => {
        const expandableClass = button.dataset.expandable;

        // Toggle content visibility and aria-hidden
        toggleCandyContent(expandableClass);

        // Toggle aria-expanded on the button itself
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
    });
});


// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦


// MOBILE MENU TOGGLE
    const modal = document.getElementById("mobile-modal");
    const openBtn = document.getElementById("mobile-open");
    const closeBtn = document.getElementById("mobile-close");
    const menu = document.getElementById("mobile-menu");
    const heading = document.getElementById("mobile-heading");
    let escHandler;


    function trapFocus(modal) {
        const focusable = modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        function focusHandler(e) {
            if (e.key !== "Tab") return;

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        modal.addEventListener("keydown", focusHandler);
        modal._trapHandler = focusHandler;
    }

    function removeTrap(modal) {
        if (modal._trapHandler) {
        modal.removeEventListener("keydown", modal._trapHandler);
        modal._trapHandler = null;
        }
    }

    function handleEscape(modal, closeFn) {
        escHandler = function (e) {
            if (e.key === "Escape") {
                closeFn();
                document.removeEventListener("keydown", escHandler);
            }
        };
        document.addEventListener("keydown", escHandler);
    }

    function announce(msg) {
        if (announcer) announcer.textContent = msg;
    }

    function openMenu() {
        menu.classList.remove("hidden");
        menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        heading.focus();
        trapFocus(menu);
        handleEscape(menu, closeMenu);
    }

    function closeMenu() {
        menu.classList.add("hidden");
        menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

        openBtn.focus();
        removeTrap(menu);

        if (escHandler) {
            document.removeEventListener("keydown", escHandler);
            escHandler = null;
        }
    }

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    // Close the menu if any nav link inside it is clicked
    menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
    });

    document.body.classList.add("overflow-hidden");
    document.getElementById("mobile-menu").classList.remove("hidden");

    document.body.classList.remove("overflow-hidden");
    document.getElementById("mobile-menu").classList.add("hidden");


// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦


// WATCH VIDEO MODAL
    const VidModal = document.getElementById("vid-modal");
    const VidOpenBtn = document.getElementById("vid-modal-open");
    const VidCloseBtn = document.getElementById("vid-modal-close");
    const VidMenu = document.getElementById("vid-modal-menu");
    const VidHeading = document.getElementById("vid-modal-heading");
    let VidEscHandler;


    function trapFocus(VidModal) {
        const focusable = VidModal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const VidFirst = focusable[0];
        const VidLast = focusable[focusable.length - 1];

        function focusHandler(e) {
            if (e.key !== "Tab") return;

            if (e.shiftKey && document.activeElement === VidFirst) {
                e.preventDefault();
                VidLast.focus();
            } else if (!e.shiftKey && document.activeElement === VidLast) {
                e.preventDefault();
                VidFirst.focus();
            }
        }

        VidModal.addEventListener("keydown", focusHandler);
        VidModal._trapHandler = focusHandler;
    }

    function removeTrap(VidModal) {
        if (VidModal._trapHandler) {
        VidModal.removeEventListener("keydown", VidModal._trapHandler);
        VidModal._trapHandler = null;
        }
    }

    function handleEscape(VidModal, closeFn) {
        VidEscHandler = function (e) {
            if (e.key === "Escape") {
                closeFn();
                document.removeEventListener("keydown", VidEscHandler);
            }
        };
        document.addEventListener("keydown", VidEscHandler);
    }

    function VidOpenMenu() {
        VidMenu.classList.remove("hidden");
        VidMenu.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        VidHeading.focus();
        trapFocus(VidMenu);
        handleEscape(VidMenu, VidCloseMenu);
    }

    function VidCloseMenu() {
        VidMenu.classList.add("hidden");
        VidMenu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

        VidOpenBtn.focus();
        removeTrap(VidMenu);

        if (VidEscHandler) {
            document.removeEventListener("keydown", VidEscHandler);
            VidEscHandler = null;
        }
    }

    VidOpenBtn.addEventListener("click", VidOpenMenu);
    VidCloseBtn.addEventListener("click", VidCloseMenu);

    document.body.classList.add("overflow-hidden");
    document.getElementById("vid-modal-menu").classList.remove("hidden");

    document.body.classList.remove("overflow-hidden");
    document.getElementById("vid-modal-menu").classList.add("hidden");



// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦



// FEATIRED DESTINATIONS 1 MODAL
    const fd1Modal = document.getElementById("fd-1-modal");
    const fd1OpenBtns = document.querySelectorAll("[id*='fd-1-modal-open']");
    const fd1Menu = document.getElementById("fd-1-modal-menu");
    const fd1CloseBtn = document.getElementById("fd-1-modal-close");
    const fd1Heading = document.getElementById("fd-1-modal-heading");
    let fd1EscHandler = null;
    let fd1LastTriggerButton = null;

    function trapFocus(fd1Modal) {
        const focusable = fd1Modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        const fd1First = focusable[0];
        const fd1Last = focusable[focusable.length - 1];

        function focusHandler(e) {
            if (e.key !== "Tab") return;

            if (e.shiftKey && document.activeElement === fd1First) {
                e.preventDefault();
                fd1Last.focus();
            }
            else if (!e.shiftKey && document.activeElement === fd1Last) {
                e.preventDefault();
                fd1First.focus();
            }
        }

        fd1Modal.addEventListener("keydown", focusHandler);
        fd1Modal._trapHandler = focusHandler;
    }

    function removeTrap(fd1Modal) {
        if (fd1Modal._trapHandler) {
            fd1Modal.removeEventListener("keydown", fd1Modal._trapHandler);
            fd1Modal._trapHandler = null;
        }
    }

    function handleEscape(fd1Modal, closeFn) {
        fd1EscHandler = function (e) {
            if (e.key === "Escape") {
                closeFn();
                document.removeEventListener("keydown", fd1EscHandler);
            }
        };
        document.addEventListener("keydown", fd1EscHandler);
    }

    function fd1OpenMenu() {
        fd1Menu.classList.remove("hidden");
        fd1Menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        fd1Heading.focus();
        trapFocus(fd1Menu);
        handleEscape(fd1Menu, fd1CloseMenu);
    }

    function fd1CloseMenu() {
        fd1Menu.classList.add("hidden");
        fd1Menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

// Return focus to whichever trigger button was used last
        fd1LastTriggerButton?.focus();

        removeTrap(fd1Menu);

        if (fd1EscHandler) {
            document.removeEventListener("keydown", fd1EscHandler);
            fd1EscHandler = null;
        }
    }

// Attach click listeners to ALL open buttons (desktop + mobile)
    fd1OpenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            fd1LastTriggerButton = btn;   // Track which button opened the modal
            fd1OpenMenu();
        });
    });

// Close button
    fd1CloseBtn.addEventListener("click", fd1CloseMenu);

// Ensure modal starts hidden in case JS loads late
    document.body.classList.remove("overflow-hidden");
    fd1Menu.classList.add("hidden");





// FEATIRED DESTINATIONS 2 MODAL
    const fd2Modal = document.getElementById("fd-2-modal");
    const fd2OpenBtns = document.querySelectorAll("[id*='fd-2-modal-open']");
    const fd2Menu = document.getElementById("fd-2-modal-menu");
    const fd2CloseBtn = document.getElementById("fd-2-modal-close");
    const fd2Heading = document.getElementById("fd-2-modal-heading");
    let fd2EscHandler = null;
    let fd2LastTriggerButton = null;


    function trapFocus(fd2Modal) {
        const focusable = fd2Modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-2"])'
        );

        const fd2First = focusable[0];
        const fd2Last = focusable[focusable.length - 2];

        function focusHandler(e) {
            if (e.key !== "Tab") return;

            if (e.shiftKey && document.activeElement === fd2First) {
                e.preventDefault();
                fd2Last.focus();
            } 
            else if (!e.shiftKey && document.activeElement === fd2Last) {
                e.preventDefault();
                fd2First.focus();
            }
        }

        fd2Modal.addEventListener("keydown", focusHandler);
        fd2Modal._trapHandler = focusHandler;
    }

    function removeTrap(fd2Modal) {
        if (fd2Modal._trapHandler) {
            fd2Modal.removeEventListener("keydown", fd2Modal._trapHandler);
            fd2Modal._trapHandler = null;
        }
    }

    function handleEscape(fd2Modal, closeFn) {
        fd2EscHandler = function (e) {
            if (e.key === "Escape") {
                closeFn();
                document.removeEventListener("keydown", fd2EscHandler);
            }
        };
        document.addEventListener("keydown", fd2EscHandler);
    }

    function fd2OpenMenu() {
        fd2Menu.classList.remove("hidden");
        fd2Menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        fd2Heading.focus();
        trapFocus(fd2Menu);
        handleEscape(fd2Menu, fd2CloseMenu);
    }

    function fd2CloseMenu() {
        fd2Menu.classList.add("hidden");
        fd2Menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

// Return focus to whichever trigger button was used last
        fd2LastTriggerButton?.focus();

        removeTrap(fd2Menu);

        if (fd2EscHandler) {
            document.removeEventListener("keydown", fd2EscHandler);
            fd2EscHandler = null;
        }
    }

// Attach click listeners to ALL open buttons (desktop + mobile)
    fd2OpenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            fd2LastTriggerButton = btn;   // Track which button opened the modal
            fd2OpenMenu();
        });
    });

// Close button
    fd2CloseBtn.addEventListener("click", fd2CloseMenu);

// Ensure modal starts hidden in case JS loads late
    document.body.classList.remove("overflow-hidden");
    fd2Menu.classList.add("hidden");


// FEATIRED DESTINATIONS 3 MODAL
    const fd3Modal = document.getElementById("fd-3-modal");
    const fd3OpenBtns = document.querySelectorAll("[id*='fd-3-modal-open']");
    const fd3Menu = document.getElementById("fd-3-modal-menu");
    const fd3CloseBtn = document.getElementById("fd-3-modal-close");
    const fd3Heading = document.getElementById("fd-3-modal-heading");
    let fd3EscHandler = null;
    let fd3LastTriggerButton = null;


    function trapFocus(fd3Modal) {
        const focusable = fd3Modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-3"])'
        );

        const fd3First = focusable[0];
        const fd3Last = focusable[focusable.length - 3];

        function focusHandler(e) {
            if (e.key !== "Tab") return;

            if (e.shiftKey && document.activeElement === fd3First) {
                e.preventDefault();
                fd3Last.focus();
            } 
            else if (!e.shiftKey && document.activeElement === fd3Last) {
                e.preventDefault();
                fd3First.focus();
            }
        }

        fd3Modal.addEventListener("keydown", focusHandler);
        fd3Modal._trapHandler = focusHandler;
    }

    function removeTrap(fd3Modal) {
        if (fd3Modal._trapHandler) {
            fd3Modal.removeEventListener("keydown", fd3Modal._trapHandler);
            fd3Modal._trapHandler = null;
        }
    }

    function handleEscape(fd3Modal, closeFn) {
        fd3EscHandler = function (e) {
            if (e.key === "Escape") {
                closeFn();
                document.removeEventListener("keydown", fd3EscHandler);
            }
        };
        document.addEventListener("keydown", fd3EscHandler);
    }

    function fd3OpenMenu() {
        fd3Menu.classList.remove("hidden");
        fd3Menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        fd3Heading.focus();
        trapFocus(fd3Menu);
        handleEscape(fd3Menu, fd3CloseMenu);
    }

    function fd3CloseMenu() {
        fd3Menu.classList.add("hidden");
        fd3Menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

// Return focus to whichever trigger button was used last
        fd3LastTriggerButton?.focus();

        removeTrap(fd3Menu);

        if (fd3EscHandler) {
            document.removeEventListener("keydown", fd3EscHandler);
            fd3EscHandler = null;
        }
    }

// Attach click listeners to ALL open buttons (desktop + mobile)
    fd3OpenBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            fd3LastTriggerButton = btn;   // Track which button opened the modal
            fd3OpenMenu();
        });
    });

// Close button
    fd3CloseBtn.addEventListener("click", fd3CloseMenu);

// Ensure modal starts hidden in case JS loads late
    document.body.classList.remove("overflow-hidden");
    fd3Menu.classList.add("hidden");



// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦



// MOBILE MENU TOGGLE
    const DesModal = document.getElementById("mobile-modal");
    const DesOpenBtn = document.getElementById("mobile-open");
    const DesCloseBtn = document.getElementById("mobile-close");
    const DesMenu = document.getElementById("mobile-menu");
    const DesHeading = document.getElementById("mobile-heading");
    let DesEscHandler;


    function trapFocus(modal) {
        const focusable = modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        function focusHandler(e) {
            if (e.key !== "Tab") return;

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        modal.addEventListener("keydown", focusHandler);
        modal._trapHandler = focusHandler;
    }

    function removeTrap(modal) {
        if (modal._trapHandler) {
        modal.removeEventListener("keydown", modal._trapHandler);
        modal._trapHandler = null;
        }
    }

    function handleEscape(modal, closeFn) {
        escHandler = function (e) {
            if (e.key === "Escape") {
                closeFn();
                document.removeEventListener("keydown", escHandler);
            }
        };
        document.addEventListener("keydown", escHandler);
    }

    function announce(msg) {
        if (announcer) announcer.textContent = msg;
    }

    function openMenu() {
        menu.classList.remove("hidden");
        menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        heading.focus();
        trapFocus(menu);
        handleEscape(menu, closeMenu);
    }

    function closeMenu() {
        menu.classList.add("hidden");
        menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

        openBtn.focus();
        removeTrap(menu);

        if (escHandler) {
            document.removeEventListener("keydown", escHandler);
            escHandler = null;
        }

        announce("Menu closed. Focus returned to menu button.");
    }

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    // Close the menu if any nav link inside it is clicked
    menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
    });

    document.body.classList.add("overflow-hidden");
    document.getElementById("mobile-menu").classList.remove("hidden");

    document.body.classList.remove("overflow-hidden");
    document.getElementById("mobile-menu").classList.add("hidden");



// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦


// MOBILE MENU TOGGLE
    const LocModal = document.getElementById("mobile-modal");
    const LocOpenBtn = document.getElementById("mobile-open");
    const LocCloseBtn = document.getElementById("mobile-close");
    const LocMenu = document.getElementById("mobile-menu");
    const LocHeading = document.getElementById("mobile-heading");
    let LocEscHandler;


    function trapFocus(modal) {
        const focusable = modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        function focusHandler(e) {
            if (e.key !== "Tab") return;

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        modal.addEventListener("keydown", focusHandler);
        modal._trapHandler = focusHandler;
    }

    function removeTrap(modal) {
        if (modal._trapHandler) {
        modal.removeEventListener("keydown", modal._trapHandler);
        modal._trapHandler = null;
        }
    }

    function handleEscape(modal, closeFn) {
        escHandler = function (e) {
            if (e.key === "Escape") {
                closeFn();
                document.removeEventListener("keydown", escHandler);
            }
        };
        document.addEventListener("keydown", escHandler);
    }

    function announce(msg) {
        if (announcer) announcer.textContent = msg;
    }

    function openMenu() {
        menu.classList.remove("hidden");
        menu.setAttribute("aria-hidden", "false");
        document.body.classList.add("overflow-hidden");

        heading.focus();
        trapFocus(menu);
        handleEscape(menu, closeMenu);
    }

    function closeMenu() {
        menu.classList.add("hidden");
        menu.setAttribute("aria-hidden", "true");
        document.body.classList.remove("overflow-hidden");

        openBtn.focus();
        removeTrap(menu);

        if (escHandler) {
            document.removeEventListener("keydown", escHandler);
            escHandler = null;
        }

        announce("Menu closed. Focus returned to menu button.");
    }

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);

    // Close the menu if any nav link inside it is clicked
    menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
    });

    document.body.classList.add("overflow-hidden");
    document.getElementById("mobile-menu").classList.remove("hidden");

    document.body.classList.remove("overflow-hidden");
    document.getElementById("mobile-menu").classList.add("hidden");


// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦


// PACKAGE BOOKING BUTTONS
    const packageButtons = document.querySelectorAll('.package-book-button');

    packageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageCard = button.closest('.package-card');
            if (packageCard) {
                const packageName = packageCard.querySelector('h3').textContent;
                alert(`Thank you for your interest in our ${packageName} package! Our travel specialist will contact you shortly.`);
            }
        });
    });


// 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦


// BACK TO TOP BUTTON
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
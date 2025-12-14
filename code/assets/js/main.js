
const AI_RESPONSES = {
    "pricing": "We offer three main plans: Day Pass ($25/day), Hot Desk Pro ($250/month - most popular), and Private Studio ($800/month). All include high-speed WiFi and access to common areas. The monthly plans include additional benefits like meeting room credits and 24/7 access.",
    "amenities": "Our premium amenities include: 1. High-speed fiber internet 2. Premium coffee & tea bar 3. Printing/scanning services 4. 24/7 secure access 5. Meeting rooms 6. Ergonomic furniture 7. Phone booths 8. Community events 9. Mail handling 10. Free snacks",
    "booking": "To book a tour, you can: 1. Fill out the contact form on our website 2. Call us at +1 (555) 123-4567 3. Email hello@nexusworkspace.com 4. Use the 'Book a Tour' button in the hero section 5. Visit us at 123 Innovation Blvd during business hours",
    "services": "We offer: 1. Hot Desks (flexible seating) 2. Dedicated Desks (personal space) 3. Private Cabins (teams 2-10) 4. Meeting Rooms (hourly/day rental) 5. Virtual Office (mail service + address)",
    "hours": "We're open 24/7 for members with keycard access. Staffed reception is available Monday-Friday 9AM-6PM, and Saturday 10AM-4PM. Tours are available by appointment.",
    "location": "We're located at 123 Innovation Blvd in the Tech District. Easy access to public transport, with parking available. The space features natural light, modern design, and plenty of collaboration areas.",
    "default": "I can help you with information about pricing, amenities, booking tours, our services, hours of operation, or location details. What specific information are you looking for?"
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('preloader-hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // 2. Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 3. Navbar Scroll Effect
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('scrolled', 'shadow-sm');
        }
    });

    // 4. Lightbox Logic

    const lightboxModalele = document.getElementById('lightboxModal');
    if (lightboxModalele) {
        const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
        const lightboxImage = document.getElementById('lightboxImage');

        window.openLightbox = (element) => {
            const img = element.querySelector('img');
            lightboxImage.src = img.src;
            lightboxModal.show();
        };
    }



    // 5. Scroll to Top Functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 6. Chat Widget Logic
    initChatWidget();






});

document.addEventListener("DOMContentLoaded", function () {

    const btnTeal = document.querySelector('#newsletterbtn');

    btnTeal.addEventListener('click', function () {
        const emailInput = document.getElementById('newsletterEmail');
        const emailValue = emailInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            alert('Please enter your email address');
            emailInput.focus();
            return;
        }

        if (!emailRegex.test(emailValue)) {
            alert('Please enter a valid email address');
            emailInput.focus();
            return;
        }

        alert('Thank you for subscribing!');
        emailInput.value = '';
    });

});


function initChatWidget() {
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const sendBtn = document.getElementById('chat-send-btn');
    const input = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');

    let isOpen = false;

    function toggleChat() {
        isOpen = !isOpen;
        if (isOpen) {
            chatWindow.classList.remove('d-none');
            toggleBtn.innerHTML = '<i class="bi bi-x-lg fs-4"></i>';
            toggleBtn.classList.add('btn-navy');
            toggleBtn.classList.remove('btn-teal');
            input.focus();
        } else {
            chatWindow.classList.add('d-none');
            toggleBtn.innerHTML = '<i class="bi bi-chat-dots-fill fs-4"></i>';
            toggleBtn.classList.remove('btn-navy');
            toggleBtn.classList.add('btn-teal');
        }
    }

    function appendMessage(role, text) {
        const div = document.createElement('div');
        div.className = `d-flex ${role === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`;

        const bubble = document.createElement('div');
        bubble.className = role === 'user'
            ? 'bg-teal text-white p-3  rounded-top-0 border-0 shadow-sm'
            : 'bg-white p-3 rounded-top-0 border shadow-sm';
        bubble.style.maxWidth = '85%';

        if (role === 'ai') {
            bubble.innerHTML = `<span class="fw-semibold text-teal">Nexus Assistant:</span> ${text}`;
        } else {
            bubble.textContent = text;
        }

        div.appendChild(bubble);
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getAIResponse(userInput) {
        const input = userInput.toLowerCase();

        if (input.includes('price') || input.includes('cost') || input.includes('plan')) {
            return AI_RESPONSES.pricing;
        } else if (input.includes('amenit') || input.includes('feature') || input.includes('include')) {
            return AI_RESPONSES.amenities;
        } else if (input.includes('book') || input.includes('tour') || input.includes('visit')) {
            return AI_RESPONSES.booking;
        } else if (input.includes('service') || input.includes('offer') || input.includes('desk') || input.includes('office')) {
            return AI_RESPONSES.services;
        } else if (input.includes('hour') || input.includes('open') || input.includes('time')) {
            return AI_RESPONSES.hours;
        } else if (input.includes('location') || input.includes('address') || input.includes('where')) {
            return AI_RESPONSES.location;
        } else {
            return AI_RESPONSES.default;
        }
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;

        input.value = '';
        appendMessage('user', text);

        // Simulate AI thinking
        setTimeout(() => {
            const response = getAIResponse(text);
            appendMessage('ai', response);
        }, 500);
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Quick response buttons
    const quickQuestions = ['What are your pricing plans?', 'What amenities do you offer?', 'How do I book a tour?'];

    quickQuestions.forEach(question => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-teal btn-sm me-2 mb-2';
        btn.textContent = question;
        btn.addEventListener('click', () => {
            input.value = question;
            handleSend();
        });
        // You could add these to a quick responses section if needed
    });
}
document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
        const navbar = document.getElementById('navbarContent');
        const bsCollapse = new bootstrap.Collapse(navbar, {
            toggle: false
        });
        bsCollapse.hide();
    });
});

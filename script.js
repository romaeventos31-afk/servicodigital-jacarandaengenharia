/* ============ ANO NO RODAPÉ ============ */
document.getElementById('ano').textContent = new Date().getFullYear();

/* ============ MENU MOBILE ============ */
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

/* ============ HEADER AO ROLAR ============ */
const header = document.getElementById('header');
const topBtn = document.getElementById('top-btn');

window.addEventListener('scroll', () => {
    const y = window.scrollY;

    if (y > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (y > 400) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }

    ativarLinkAtual();
});

/* ============ BOTÃO VOLTAR AO TOPO ============ */
topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ LINK ATIVO CONFORME SEÇÃO ============ */
const sections = document.querySelectorAll('section[id]');

function ativarLinkAtual() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

/* ============ ANIMAÇÃO DE ENTRADA (REVEAL) ============ */
const revealElements = document.querySelectorAll(
    '.info-card, .valor-card, .servico-bloco, .empresa-card, .contato-item, .contato-form, .sobre-text'
);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => observer.observe(el));

/* ============ FORMULÁRIO DE CONTATO ============ */
const form = document.getElementById('contato-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
        feedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        feedback.className = 'form-feedback error';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        feedback.textContent = 'Por favor, insira um e-mail válido.';
        feedback.className = 'form-feedback error';
        return;
    }

    // Monta mensagem para WhatsApp
    const texto = `Olá, Jacarandá Engenharia!%0A%0A` +
                  `*Nome:* ${nome}%0A` +
                  `*E-mail:* ${email}%0A` +
                  `*Telefone:* ${telefone || 'Não informado'}%0A%0A` +
                  `*Mensagem:* ${mensagem}`;

    const url = `https://wa.me/5575991358911?text=${texto}`;
    window.open(url, '_blank');

    feedback.textContent = 'Redirecionando para o WhatsApp... Obrigado pelo contato!';
    feedback.className = 'form-feedback success';

    form.reset();

    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
    }, 5000);
});

/* ============ SCROLL SUAVE PARA LINKS INTERNOS (fallback) ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 75;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

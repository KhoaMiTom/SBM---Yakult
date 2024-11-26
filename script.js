const products = [
    { 
        name: 'Yakult Original', 
        price: 25000, 
        image: 'yakult-1.png',
        isNew: false,
        description: 'Yakult Original is available in packs of 5 and 10 65ml bottles with each bottle containing 6.5 billion probiotics.'
    },
    { 
        name: 'Yakult Light', 
        price: 27000, 
        image: 'yakult-2.png',
        isNew: false,
        description: 'Yakult LIGHT is a reduced sugar version of Yakult, with 40% fewer calories and less than 3 grams of sugar per bottle. It provides all the same benefits as the Original with the same high probiotic count.'
    },
    { 
        name: 'BioMax', 
        price: 59000, 
        image: 'biomax.png',
        isNew: true,
        description: 'A blend of tropical fruit juice with 6.5 billion probiotics included in each bottle. Offers excellent hydration and beneficial digestive properties for kids.'
    }
];

const articles = [
    {
        title: 'Advantages of Probiotics',
        image: 'article-1.png',
        date: '2024-03-15',
        description: 'Probiotics produce enzymes to combat harmful bacteria and boost immunity.',
        link: '#'
    },
    {
        title: 'Daily Practices for Enhanced Digestion',
        image: 'article-2.png',
        date: '2024-03-10',
        description: "Explore Yakult's methods to boost immunity and protect your health during changing weather.",
        link: '#'
    },
    {
        title: 'Comprehending fermented meals that include probiotics.',
        image: 'article-3.png',
        date: '2024-03-05',
        description: 'Discover probiotics, their benefits for digestion, and foods rich in them.',
        link: '#'
    }
];

const promotions = [
    {
        title: 'Buy 2 Get 1 Free',
        description: 'For all Yakult Original products',
        endDate: '2024-12-01',
        code: 'YAKULT241'
    },
    {
        title: '20% Off',
        description: 'Special offer for new customers',
        endDate: '2024-12-01',
        code: 'NEWCUST20'
    }
];

function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    if (product.isNew) {
        const badge = document.createElement('span');
        badge.classList.add('badge');
        badge.textContent = 'New!';
        card.appendChild(badge);
    }

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const name = document.createElement('h3');
    name.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;
    description.style.marginBottom = '1rem';

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = formatVND(product.price);

    const buyButton = document.createElement('button');
    buyButton.classList.add('btn', 'btn-primary');
    buyButton.textContent = 'Add to Cart';
    buyButton.onclick = () => addToCart(product);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(buyButton);

    return card;
}

function addToCart(product) {
    alert(`Added ${product.name} to cart!`);
}

function populateProducts() {
    const productGrid = document.getElementById('product-grid');
    const newProductGrid = document.getElementById('new-product-grid');
    
    productGrid.innerHTML = '';
    newProductGrid.innerHTML = '';

    const regularProducts = products.filter(p => !p.isNew);
    const newProducts = products.filter(p => p.isNew);

    regularProducts.forEach(product => {
        productGrid.appendChild(createProductCard(product));
    });

    newProducts.forEach(product => {
        newProductGrid.appendChild(createProductCard(product));
    });

    document.getElementById('new-products').style.display = 
        newProducts.length === 0 ? 'none' : 'block';
    document.getElementById('products').style.display = 
        regularProducts.length === 0 ? 'none' : 'block';
}

function createArticleCard(article) {
    const card = document.createElement('div');
    card.classList.add('article-card');
    
    const truncatedDesc = article.description.length > 150 
        ? article.description.substring(0, 150) + '...'
        : article.description;
    
    card.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="article-image">
        <div class="article-content">
            <div>
                <p class="article-date">${new Date(article.date).toLocaleDateString()}</p>
                <h3>${article.title}</h3>
                <p class="article-description">${truncatedDesc}</p>
            </div>
            <a href="${article.link}" class="btn btn-primary">Read More</a>
        </div>
    `;
    
    return card;
}

function createPromotionCard(promotion) {
    const card = document.createElement('div');
    card.classList.add('promotion-card');
    
    const endDate = new Date(promotion.endDate);
    const timeRemaining = getTimeRemaining(endDate);
    
    card.innerHTML = `
        <div>
            <h3>${promotion.title}</h3>
            <p>${promotion.description}</p>
        </div>
        <div>
            <div class="promotion-timer" data-end="${promotion.endDate}">
                <div class="countdown">
                    <span>${timeRemaining.days}</span> days
                    <span>${timeRemaining.hours}</span> hours
                    <span>${timeRemaining.minutes}</span> min
                </div>
            </div>
            <p class="promo-code">Use code: <strong>${promotion.code}</strong></p>
        </div>
    `;
    
    return card;
}

function getTimeRemaining(endDate) {
    const total = endDate - new Date();
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
        days,
        hours,
        minutes
    };
}

function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader-container';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
    }, 1000);
}

function populateContent() {
    showLoading();
    addSmoothScroll();
    populateProducts();

    // Populate articles
    const articlesGrid = document.getElementById('articles-grid');
    articles.forEach(article => {
        articlesGrid.appendChild(createArticleCard(article));
    });

    // Populate promotions
    const promotionsGrid = document.getElementById('promotions-grid');
    promotions.forEach(promotion => {
        promotionsGrid.appendChild(createPromotionCard(promotion));
    });

    // Handle contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    initMobileMenu();
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
}

document.addEventListener('DOMContentLoaded', populateContent);


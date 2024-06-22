document.addEventListener("DOMContentLoaded", function() {
    const homePage = document.getElementById("home-page");
    const bookContent = document.getElementById("book-content");
    const homeButton = document.getElementById("home-button");
    const bookLinks = document.querySelectorAll("#book-list a");
    const bookPagesContainer = document.getElementById("book-pages-container");
    const bookPages = document.getElementById("book-pages");
    const pageTurnSound = document.getElementById("page-turn-sound");
    let currentPage = 0;
    let totalPages = 0;

    bookLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const book = event.target.getAttribute("data-book");
            fetch(`books/${book}`)
                .then(response => response.text())
                .then(data => {
                    loadBook(data);
                    showBookContent();
                });
        });
    });

    document.getElementById("next-page").addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            turnPage();
        }
    });

    document.getElementById("prev-page").addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            turnPage();
        }
    });

    homeButton.addEventListener("click", showHomePage);

    function loadBook(data) {
        const pages = data.split('<!-- pagebreak -->');
        bookPages.innerHTML = '';
        pages.forEach((pageContent, index) => {
            const page = document.createElement('div');
            page.classList.add('page');
            page.innerHTML = pageContent;
            page.style.zIndex = pages.length - index;
            bookPages.appendChild(page);
        });
        totalPages = pages.length;
        resetPages();
    }

    function turnPage() {
        const pages = document.querySelectorAll(".page");
        pages.forEach((page, index) => {
            page.style.display = 'none';
            if (index === currentPage) {
                page.style.display = 'block';
                page.style.transform = "rotateY(0deg)";
            } else if (index < currentPage) {
                page.style.display = 'block';
                page.style.transform = "rotateY(-180deg)";
            }
        });
        pageTurnSound.play();
    }

    function resetPages() {
        const pages = document.querySelectorAll(".page");
        pages.forEach((page, index) => {
            page.style.display = index === 0 ? "block" : "none";
            page.style.transform = index === 0 ? "rotateY(0deg)" : "rotateY(-180deg)";
        });
        currentPage = 0;
    }

    function showBookContent() {
        homePage.style.display = "none";
        bookContent.style.display = "flex";
        homeButton.style.display = "block";
    }

    function showHomePage() {
        homePage.style.display = "block";
        bookContent.style.display = "none";
        homeButton.style.display = "none";
    }
});
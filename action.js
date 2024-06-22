document.addEventListener("DOMContentLoaded", function() {
    const bookLinks = document.querySelectorAll("#book-list a");
    const bookPages = document.querySelectorAll(".page");
    const pageTurnSound = document.getElementById("page-turn-sound");
    let currentPage = 0;

    bookLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const book = event.target.getAttribute("data-book");
            fetch(`books/${book}`)
                .then(response => response.text())
                .then(data => {
                    bookPages.forEach((page, index) => {
                        page.innerHTML = index === 0 ? data : '';
                    });
                    currentPage = 0;
                    resetPages();
                });
        });
    });

    document.getElementById("next-page").addEventListener("click", () => {
        if (currentPage < bookPages.length - 1) {
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

    function turnPage() {
        bookPages.forEach((page, index) => {
            page.style.transform = index <= currentPage ? "rotateY(0deg)" : "rotateY(-180deg)";
        });
        pageTurnSound.play();
    }

    function resetPages() {
        bookPages.forEach((page, index) => {
            page.style.transform = index === 0 ? "rotateY(0deg)" : "rotateY(-180deg)";
        });
    }
});
// $("#menu-toggle").click(function(e) {
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled");
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const categoryLinks = document.querySelectorAll('.category-link');
//     const filters = document.querySelectorAll('.filter');

//     categoryLinks.forEach(link => {
//         link.addEventListener('mouseenter', function() {
//             const filterType = this.dataset.filter;
//             const activeFilter = document.querySelector(`.filter.${filterType}-filter`);

//             if (activeFilter) {
//                 activeFilter.style.display = 'block';
//             }
//         });
//     });

//     // Handle hover over filter itself
//     filters.forEach(filter => {
//         filter.addEventListener('mouseenter', function() {
//             this.style.display = 'block';
//         });

//         filter.addEventListener('mouseleave', function() {
//             this.style.display = 'none';
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const filters = document.querySelectorAll('.filter');

    categoryLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const filterType = this.dataset.filter;
            const activeFilter = document.querySelector(`.filter.${filterType}-filter`);

            filters.forEach(filter => {
                filter.style.display = 'none';
            });

            if (activeFilter) {
                activeFilter.style.display = 'block';
            }
        });

        link.addEventListener('mouseleave', function() {
            const filterType = this.dataset.filter;
            const activeFilter = document.querySelector(`.filter.${filterType}-filter`);

            setTimeout(() => {
                if (!activeFilter.matches(':hover')) {
                    activeFilter.style.display = 'none';
                }
            }, 400);
        });
    });

    filters.forEach(filter => {
        filter.addEventListener('mouseleave', function() {
            this.style.display = 'none';
        });

        filter.addEventListener('mouseenter', function() {
            this.style.display = 'block';
        });
    });
});

// function toggleNavbar() {
//     const navbarCollapse = document.querySelector("#navbarCollapse");
//     navbarCollapse.classList.toggle("show");
// }

// function hideNavbar() {
//     const navbarCollapse = document.querySelector("#navbarCollapse");
//     navbarCollapse.classList.remove("show");
// }

// document.querySelector(".navbar-toggler").addEventListener("click", function(event) {
//     event.stopPropagation();
//     toggleNavbar();
// });

// document.addEventListener("click", function(event) {
//     const navbarCollapse = document.querySelector("#navbarCollapse");
//     if (!navbarCollapse.contains(event.target) && navbarCollapse.classList.contains("show")) {
//         hideNavbar();
//     }
// });






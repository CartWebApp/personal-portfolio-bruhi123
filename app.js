const buttonProjectsHome = document.querySelector(".projectsLearnMore");
const navProjects = document.getElementById("projectsNav");
const footerProjectsLink = document.querySelector(".projectsFooter");

function openProjectsDropdown() {
    navProjects.scrollIntoView({ behavior: "smooth", block: "center" });
    navProjects.classList.add("open");
    setTimeout(() => {
        navProjects.classList.remove("open");
    }, 2000);
}

if (buttonProjectsHome) {
    buttonProjectsHome.addEventListener("click", (e) => {
        e.preventDefault();
        openProjectsDropdown();
    });
}

if (footerProjectsLink) {
    footerProjectsLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (navProjects) {
            openProjectsDropdown();
        } else {
            window.location.href = "/index.html#projectsNav";
        }
    });
}

if (window.location.hash === "#projectsNav" && navProjects) {
    openProjectsDropdown();
}
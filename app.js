const buttonProjectsHome = document.querySelector(".projectsLearnMore");
const navProjects = document.getElementById("projectsNav");
const footerProjectsLink = document.querySelector(".projectsFooter");

buttonProjectsHome.addEventListener("click", (e) => {
    e.preventDefault();
    navProjects.scrollIntoView({ behavior: "smooth", block: "center" });
    navProjects.classList.add("open");
    setTimeout(() => {
        navProjects.classList.remove("open");
    }, 2000);
});

footerProjectsLink.addEventListener("click", (e) => {
    e.preventDefault();
    navProjects.scrollIntoView({ behavior: "smooth", block: "center" });
    navProjects.classList.add("open");
    setTimeout(() => {
        navProjects.classList.remove("open");
    }, 2000);
});
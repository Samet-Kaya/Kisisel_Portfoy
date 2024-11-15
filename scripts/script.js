let updateTimeInterval;

document.addEventListener("DOMContentLoaded", function () {
    // Sayfa yüklendiğinde tarih ve saati güncelle
    updateTime();
    // Ana sayfa açıksa zamanı düzenli olarak güncellemeye başla
    if (document.getElementById("home").classList.contains("active")) {
        updateTimeInterval = setInterval(updateTime, 1000);
    }
});

function updateTime() {
    const now = new Date();
    document.getElementById("currentDate").textContent = now.toLocaleString();
}

function navigateTo(sectionId) {
    const sections = document.querySelectorAll(".content-section");
    sections.forEach(section => section.classList.remove("active"));

    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add("active");

    const currentDateElement = document.getElementById("currentDate");

    if (sectionId === "home") {
        currentDateElement.style.display = "block";
        updateTime(); // İlk olarak zamanı güncelle

        // Daha önce tanımlanmış bir interval varsa temizle
        clearInterval(updateTimeInterval);
        // Zamanı her saniye güncellenen bir interval başlat
        updateTimeInterval = setInterval(updateTime, 1000);
    } else {
        currentDateElement.style.display = "none";

        // Ana sayfadan çıkıldığında interval'i durdur
        clearInterval(updateTimeInterval);
    }
}

function validateForm() {
    let isValid = true;
  
    // Hata mesajlarını sıfırla
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
  
    // Ad doğrulama
    const name = document.getElementById("name").value.trim();
    if (name.length < 4) {
      document.getElementById("nameError").textContent = "Lütfen en az 4 karakter giriniz.";
      isValid = false;
    }
  
    // Email doğrulama
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basit e-posta doğrulama
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Lütfen geçerli bir e-posta adresi giriniz (örneğin: ornek@domain.com).";
      isValid = false;
    }
  
    // Mesaj doğrulama
    const message = document.getElementById("message").value.trim();
    if (message.length < 10) {
      document.getElementById("messageError").textContent = "Lütfen en az 10 karakter giriniz.";
      isValid = false;
    }
  
    // Form geçerli değilse gönderimi durdur
    if (!isValid) {
      return false;
    }
  
    // Form geçerli ise başarı mesajını göster
    document.getElementById("contactForm").style.display = "none"; // Formu gizle
    document.getElementById("successMessage").style.display = "block"; // Başarı mesajını göster
  
    return false; // Sayfanın yeniden yüklenmesini engelle
  }
  

function toggleBio() {
    const fullBio = document.getElementById("fullBio");
    const bioButton = document.getElementById("bioButton");

    if (fullBio.style.display === "none") {
        fullBio.style.display = "block";
        bioButton.textContent = "Daha Az Göster";
    } else {
        fullBio.style.display = "none";
        bioButton.textContent = "Daha Fazla Göster";
    }
}


function toggleImageSize(imgElement) {
    imgElement.classList.toggle("expanded");
}

function openProject(projectId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.style.display = 'none');

    if (projectId === 'allProjects') {
        const allProjectsContainer = document.getElementById('allProjects');
        
        if (!allProjectsContainer.hasAttribute('data-loaded')) {
            const uniqueProjectIds = new Set();

            ['project1', 'project2'].forEach(sectionId => {
                const projects = document.getElementById(sectionId).querySelectorAll('.project-item');

                projects.forEach(project => {
                    const projectDataId = project.getAttribute('data-id');
                    if (projectDataId && !uniqueProjectIds.has(projectDataId)) {
                        uniqueProjectIds.add(projectDataId);
                        allProjectsContainer.insertAdjacentHTML('beforeend', project.outerHTML);
                    }
                });
            });

            allProjectsContainer.setAttribute('data-loaded', 'true');
        }
        allProjectsContainer.style.display = 'block';
    } else {
        document.getElementById(projectId).style.display = 'block';
    }

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

// Modal açma fonksiyonu
function openModal(title, imageUrl, description) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalImage").src = imageUrl;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("projectModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
}

window.onclick = function(event) {
    if (event.target === document.getElementById("projectModal")) {
        closeModal();
    }
};

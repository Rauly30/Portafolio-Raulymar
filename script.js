document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active")

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })

    // Burger Animation
    burger.classList.toggle("toggle")
  })

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      // Skip if it's a modal link
      if (targetId.startsWith("#project-")) return

      e.preventDefault()

      // Close mobile menu if open
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active")
        burger.classList.remove("toggle")
        navLinks.forEach((link) => {
          link.style.animation = ""
        })
      }

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      const headerOffset = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    })
  })

  // Active Navigation Link
  const sections = document.querySelectorAll("section[id]")

  if (sections.length > 0) {
    window.addEventListener("scroll", () => {
      let current = ""

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight

        if (pageYOffset >= sectionTop - 150) {
          current = section.getAttribute("id")
        }
      })

      document.querySelectorAll(".nav-links a").forEach((item) => {
        item.classList.remove("active")
        const href = item.getAttribute("href")
        if (href && href.includes(current)) {
          item.classList.add("active")
        }
      })
    })
  }

  // Form Submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Here you would normally send the form data to a server
      // For this example, we'll just show an alert
      alert(`Gracias ${name} por tu mensaje. Te contactaré pronto.`)

      // Reset form
      contactForm.reset()
    })
  }

  // Floating WhatsApp button notification
  setupFloatingButtonsNotifications()

  // Check if we need to adjust hero layout for mobile
  adjustHeroLayoutForMobile()
  
  // Listen for window resize to adjust hero layout
  window.addEventListener('resize', adjustHeroLayoutForMobile)

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectItems = document.querySelectorAll(".project-item")

  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        btn.classList.add("active")

        const filterValue = btn.getAttribute("data-filter")

        projectItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Project Modal
  const projectLinks = document.querySelectorAll(".view-project")
  const closeModals = document.querySelectorAll(".close-modal")

  if (projectLinks.length > 0) {
    projectLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const modalId = link.getAttribute("href")
        const modal = document.querySelector(modalId)

        if (modal) {
          modal.classList.add("show")
          document.body.style.overflow = "hidden"
        }
      })
    })
  }

  if (closeModals.length > 0) {
    closeModals.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        const modal = closeBtn.closest(".project-modal")
        modal.classList.remove("show")
        document.body.style.overflow = "auto"
      })
    })

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      document.querySelectorAll(".project-modal").forEach((modal) => {
        if (e.target === modal) {
          modal.classList.remove("show")
          document.body.style.overflow = "auto"
        }
      })
    })
  }

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".project-card, .resume-card, .skills-box, .contact-item, .highlight-item",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load

  // Dots pattern animation
  const dotsPattern = document.querySelector(".dots-pattern")

  if (dotsPattern) {
    window.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      dotsPattern.style.transform = `translate(${x * 20}px, ${y * 20}px)`
    })
  }

  // Set current year in footer
  const currentYearElement = document.getElementById("currentYear")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
})

// Function to adjust hero layout for mobile
function adjustHeroLayoutForMobile() {
  const heroContent = document.querySelector('.hero-content')
  
  if (window.innerWidth <= 992) {
    // Make sure the image is above the text on mobile
    heroContent.classList.add('mobile-layout')
  } else {
    heroContent.classList.remove('mobile-layout')
  }
}

// Function to set up floating buttons notifications
function setupFloatingButtonsNotifications() {
  const body = document.body
  const whatsappBtn = document.querySelector(".whatsapp-btn")

  if (!whatsappBtn) {
    console.error("WhatsApp button not found")
    return
  }

  console.log("Setting up WhatsApp notification")

  // Create notification for WhatsApp
  const whatsappNotification = document.createElement("div")
  whatsappNotification.className = "notification whatsapp-notification"
  whatsappNotification.innerHTML = `
    <div class="notification-header">
      <i class="fab fa-whatsapp notification-icon"></i>
      <div class="notification-title">WhatsApp</div>
    </div>
    <div class="notification-message">Envíanos un mensaje por WhatsApp para atención inmediata</div>
  `
  body.appendChild(whatsappNotification)

  // Show notification on hover
  let notificationTimeout

  whatsappBtn.addEventListener("mouseenter", () => {
    console.log("Mouse entered WhatsApp button")
    clearTimeout(notificationTimeout)
    // Show WhatsApp notification
    whatsappNotification.classList.add("show")
  })

  whatsappBtn.addEventListener("mouseleave", () => {
    console.log("Mouse left WhatsApp button")
    notificationTimeout = setTimeout(() => {
      whatsappNotification.classList.remove("show")
    }, 500)
  })

  // Modified click event for mobile devices
  whatsappBtn.addEventListener("click", (e) => {
    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768
    
    if (isMobile) {
      e.preventDefault()
      console.log("WhatsApp button clicked on mobile")
      clearTimeout(notificationTimeout)
      whatsappNotification.classList.add("show")

      // Hide notification after 2 seconds and then follow the link
      setTimeout(() => {
        whatsappNotification.classList.remove("show")
        window.location.href = whatsappBtn.href
      }, 2000)
    } else {
      // For desktop, keep the original behavior but hide after 3 seconds
      console.log("WhatsApp button clicked on desktop")
      clearTimeout(notificationTimeout)
      whatsappNotification.classList.add("show")

      setTimeout(() => {
        whatsappNotification.classList.remove("show")
      }, 3000)
    }
  })

  // Prevent notification from disappearing when mouse is over it
  whatsappNotification.addEventListener("mouseenter", () => {
    console.log("Mouse entered WhatsApp notification")
    clearTimeout(notificationTimeout)
  })

  whatsappNotification.addEventListener("mouseleave", () => {
    console.log("Mouse left WhatsApp notification")
    whatsappNotification.classList.remove("show")
  })

  // Show notification briefly on page load
  setTimeout(() => {
    whatsappNotification.classList.add("show")
    console.log("Showing WhatsApp notification on page load")

    // Hide after 2 seconds
    setTimeout(() => {
      whatsappNotification.classList.remove("show")
    }, 2000)
  }, 1500)
}
/**
 * ==========================================================================
 * VIMAK DENTAL CENTRE — MAIN JAVASCRIPT (js/main.js)
 * ==========================================================================
 * EDITABLE BUSINESS CONFIGURATION:
 * Update the values below if the client provides updated phone numbers,
 * WhatsApp contact, email address, clinic locations, or opening hours.
 * ==========================================================================
 */

const VIMAK_CONFIG = {
  businessName: "Vimak Dental Centre",
  tagline: "Giving you something to smile about",
  whatsappNumber: "254720285819", // International format for wa.me links (0720 285 819)
  phones: ["020 222 89000", "0720 285 819", "0714 481 158"],
  email: "info@vimakdentalcentre.co.ke",
  tiktokUrl: "https://www.tiktok.com/@_vimak_dental_centre",
  tiktokHandle: "@_vimak_dental_centre",
  socialIdentity: "@VimakDentalCentre",
  locations: {
    nairobi: "ICEA Building (JKUAT Towers), 2nd Floor, Kenyatta Avenue, Nairobi",
    thika: "Maisha Heights Building, Ground Floor, Kenyatta Avenue, Thika"
  },
  hours: {
    monSat: "Monday - Saturday: 8:00 AM - 8:00 PM",
    sunday: "Sunday: 8:00 AM - 5:00 PM"
  }
};

// 1. Sticky Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".main-nav");
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// 2. Initialize AOS (Animate On Scroll) safely if loaded
document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true
    });
  }

  // Set minimum date on date inputs to today
  const todayStr = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    if (!input.getAttribute("min")) {
      input.setAttribute("min", todayStr);
    }
  });

  // 3. Quick Hero Appointment Bar Handler (Home Page)
  const quickBarForm = document.getElementById("quickAppointmentBarForm");
  if (quickBarForm) {
    quickBarForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (document.getElementById("quickName")?.value || "").trim();
      const phone = (document.getElementById("quickPhone")?.value || "").trim();
      const location = (document.getElementById("quickLocation")?.value || "Nairobi Clinic").trim();
      const service = (document.getElementById("quickService")?.value || "General Dental Consultation").trim();
      const date = (document.getElementById("quickDate")?.value || "").trim();

      // Pre-fill the main booking form if on the same page
      const fullForm = document.getElementById("vimakAppointmentForm");
      if (fullForm) {
        if (name && document.getElementById("appFullName")) document.getElementById("appFullName").value = name;
        if (phone && document.getElementById("appPhone")) document.getElementById("appPhone").value = phone;
        if (location && document.getElementById("appLocation")) document.getElementById("appLocation").value = location;
        if (service && document.getElementById("appService")) document.getElementById("appService").value = service;
        if (date && document.getElementById("appDate")) document.getElementById("appDate").value = date;

        const targetSection = document.getElementById("book-appointment");
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // Otherwise open WhatsApp with quick request details
      const messageLines = [
        "Hello Vimak Dental Centre, I would like to request a dental appointment:",
        name ? "- Name: " + name : "",
        phone ? "- Phone: " + phone : "",
        "- Preferred Clinic: " + location,
        "- Service: " + service,
        date ? "- Preferred Date: " + date : ""
      ].filter(Boolean);

      const waUrl =
        "https://wa.me/" +
        VIMAK_CONFIG.whatsappNumber +
        "?text=" +
        encodeURIComponent(messageLines.join("\n"));
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 4. Full Appointment Request Form Handler (WhatsApp + Email Integration)
  const appointmentForm = document.getElementById("vimakAppointmentForm");
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleAppointmentSubmission("whatsapp");
    });

    const emailBtn = document.getElementById("sendAppointmentEmailBtn");
    if (emailBtn) {
      emailBtn.addEventListener("click", function () {
        if (appointmentForm.reportValidity()) {
          handleAppointmentSubmission("email");
        }
      });
    }
  }

  function handleAppointmentSubmission(channel) {
    const fullName = (document.getElementById("appFullName")?.value || "").trim();
    const phone = (document.getElementById("appPhone")?.value || "").trim();
    const email = (document.getElementById("appEmail")?.value || "").trim();
    const location = (document.getElementById("appLocation")?.value || "").trim();
    const prefDate = (document.getElementById("appDate")?.value || "").trim();
    const prefTime = (document.getElementById("appTime")?.value || "").trim();
    const service = (document.getElementById("appService")?.value || "").trim();
    const notes = (document.getElementById("appMessage")?.value || "").trim();

    const summaryText = [
      "Hello Vimak Dental Centre, I would like to request an appointment:",
      "",
      "• Full Name: " + (fullName || "Not provided"),
      "• Phone Number: " + (phone || "Not provided"),
      email ? "• Email: " + email : null,
      "• Preferred Clinic: " + (location || "Nairobi / Thika"),
      "• Preferred Date: " + (prefDate || "Flexible"),
      "• Preferred Time: " + (prefTime || "Flexible"),
      "• Service / Reason for Visit: " + (service || "General Consultation"),
      notes ? "• Additional Message: " + notes : null,
      "",
      "Please let me know available appointment slots to confirm my visit."
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl =
      "https://wa.me/" +
      VIMAK_CONFIG.whatsappNumber +
      "?text=" +
      encodeURIComponent(summaryText);

    const mailSubject =
      "Appointment Request — " +
      (fullName || "Patient") +
      " (" +
      (location || "Vimak Dental Centre") +
      ")";
    const mailtoUrl =
      "mailto:" +
      VIMAK_CONFIG.email +
      "?subject=" +
      encodeURIComponent(mailSubject) +
      "&body=" +
      encodeURIComponent(summaryText);

    const feedbackBox = document.getElementById("appointmentFormFeedback");
    if (feedbackBox) {
      feedbackBox.classList.remove("d-none");
      feedbackBox.innerHTML = `
        <div class="alert alert-info border-0 shadow-sm mb-0 mt-3" role="status">
          <div class="d-flex align-items-start gap-2">
            <i class="bi bi-info-circle-fill fs-5 text-primary mt-1"></i>
            <div>
              <strong>Appointment Request Prepared (Confirmation Required)</strong>
              <p class="small mb-2 mt-1">
                Submitting this form prepares your request for our reception desk. Your appointment will be confirmed once our team contacts you via WhatsApp, phone, or email.
              </p>
              <div class="d-flex flex-wrap gap-2">
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-whatsapp">
                  <i class="bi bi-whatsapp"></i> Send via WhatsApp Now
                </a>
                <a href="${mailtoUrl}" class="btn btn-sm btn-vimak-outline-dark">
                  <i class="bi bi-envelope"></i> Send via Email App
                </a>
                <a href="tel:+254720285819" class="btn btn-sm btn-vimak-cyan">
                  <i class="bi bi-telephone"></i> Call 0720 285 819
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (channel === "email") {
      window.location.href = mailtoUrl;
    } else {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  }
});

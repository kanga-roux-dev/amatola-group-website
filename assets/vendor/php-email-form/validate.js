/**
* PHP Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";
  emailjs.init("50VO_u39JTShOI7zK");
  
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      let name = document.getElementById("name-field").value;
	    let subject = document.getElementById("subject-field").value;
      let email = document.getElementById("email-field").value;
      let message = document.getElementById("message-field").value;
      let newsletterEmail = formData.get("newsletter-email");

      let serviceID = "service_4mpuv8i";
      let templateID;
      let templateParams = {};

      if (newsletterEmail && newsletterEmail.trim() !== "") {
        // Use the newsletter template if the newsletter-email field is filled
        templateID = "template_p0bbis3";
        templateParams = {
          newsletter_email: newsletterEmail
        };
      } else {
        // Use the default contact template if no newsletter-email is provided
        templateID = "template_r3ku9b8";
        templateParams = {
          from_name: name,
          from_email: email,
          message: message,
		      subject: subject,
		      reply_to: email
        };
      }
      
      emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
          console.log("Email sent successfully!", response);
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        })
        .catch(error => {
          console.error("Error sending email:", error);
          thisForm.querySelector('.loading').classList.remove('d-block');
          displayError(thisForm, "Failed to send email. Please try again later.");
        });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();

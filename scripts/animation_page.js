document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('a:not(.no-script-execution)');

  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      var nextPage = this.getAttribute('href');

      // Ajoute la classe de transition fade-out à l'élément <body>
      document.body.classList.add('fade-out');

      // Attends la fin de l'animation de transition fade-out
      setTimeout(function() {
        // Redirige vers la nouvelle page
        window.location.href = nextPage;
      }, 500); // Ajustez le délai selon vos préférences (500ms = 0,5 seconde)
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Attends un court délai avant d'ajouter la classe fade-in à l'élément <body>
  setTimeout(function() {
    document.body.classList.add('fade-in');
  }, 100); // Ajustez le délai selon vos préférences (100ms = 0,1 seconde)
});

window.addEventListener('load', function() {
  // Supprime la classe fade-in de l'élément <body> après l'animation de transition fade-in
  var body = document.body;
  body.addEventListener('transitionend', function(event) {
    if (event.target === body && event.propertyName === 'opacity') {
      body.classList.remove('fade-in');
    }
  });
});

function closeEmailPopup() {
  var popup = document.getElementById("emailPopup");
  popup.style.display = "none";
}

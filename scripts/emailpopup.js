function openEmailPopup() {
  var popup = document.getElementById("emailPopup");
  popup.style.display = "block";

  // Ajoute un événement de clic à l'extérieur du pop-up pour le fermer
  window.addEventListener("click", outsideClick);
}

function closeEmailPopup() {
  var popup = document.getElementById("emailPopup");
  popup.style.display = "none";

  // Supprime l'événement de clic à l'extérieur du pop-up
  window.removeEventListener("click", outsideClick);
}

function outsideClick(event) {
  var popup = document.getElementById("emailPopup");
  if (event.target === popup) {
    popup.style.display = "none";
    // Supprime l'événement de clic à l'extérieur du pop-up
    window.removeEventListener("click", outsideClick);
  }
}

// Fonction qui intercepte les erreurs de script
function blockScriptExecution(errorMsg, url, lineNumber) {
  // Vérifie si l'élément déclencheur a la classe "no-script-execution"
  var triggerElement = document.querySelector('.no-script-execution');
  if (triggerElement) {
    // Bloque l'erreur de script
    return true;
  }
  
  // Permet à d'autres erreurs de script de se propager normalement
  return false;
}

// Définit la fonction "blockScriptExecution" comme gestionnaire des erreurs de script
window.onerror = blockScriptExecution;


export function gestionErreur(erreur, msg_erreur) {

    if (!erreur.response) {
        msg_erreur.textContent = "Serveur injoignable";

    } else if (erreur.response.status === 404) {
        msg_erreur.textContent = "Recette introuvable";

    } else if (erreur.response.status === 500) {
        msg_erreur.textContent = "Erreur du serveur";

    } else {
        msg_erreur.textContent = "Une erreur inattendue est survenue";
    }

    msg_erreur.classList.remove("hidden");
}

// Esquisse de jeu pendu
// v0.1     Test des divisions et affichage des mots sans caractères (_)
let mots = ["noel", "paques", "revolution", "nouvel an", "assomption", "toussaint", "fete du travail", "liberation"]
let lettresConnues = []
let lettresMauvaises = []
let monMot

// Cette fonction vérifie si la lettre choisie existe dans la liste des lettres connues, sinon renvoie un '_'
function verifier(lettre) {
    let chaineLettresConnues = lettresConnues.join('') + " "
    if (chaineLettresConnues.indexOf(lettre) >= 0) {
        return lettre
    } else {
        return "_"
    }
}

// Cette fonction affiche le mot choisi avec des '_' ou les lettres connues
// ⚠ les espaces ne sont pas comptés
function afficher(mot, termine) {
    let contenuHTML = ""
    let cDeb
    if (termine) {
        cDeb = "<div class='lettreGood'>"
    } else {
        cDeb = "<div class='lettre'>"
    }
    let cFin = "</div>"
    let compteur = 0

    console.log(mot, mot.length)
    for (let lettre of mot) {
        contenuHTML = contenuHTML + cDeb + verifier(lettre) + cFin
        if (verifier(lettre) == '_') compteur++
    }
    document.getElementById("motComplet").innerHTML = contenuHTML
    console.log("compteur : ", compteur)
    return compteur
}

// Afficher les lettres déjà testées
function afficherLettres() {
    let contenuHTML = ""
    let cDeb = "<div class='lettre'>"
    let cFin = "</div>"

    for (let lettre of lettresConnues) {
        contenuHTML = contenuHTML + cDeb + lettre + cFin
    }
    document.getElementById("anciennesLettres").innerHTML = contenuHTML
}

// Fonction qui sélectionne un mot au hasard dans la liste
function choisirMot() {
    let numeroMot = Math.floor(Math.random() * mots.length)
    console.log("mot choisi ", mots[numeroMot], "numero ", numeroMot)
    return mots[numeroMot]
}

// fonction de vérification lorsqu'une lettre est saisie
function testerLettre() {
    let lettreInconnues = 0
    let choix = document.getElementById("jouerLettre").value
    console.log(choix)
    choix = choix.toLowerCase();
    if (verifier(choix) == "_") {          // lettre nouvelle
        lettresConnues.push(choix)
        lettreInconnues = afficher(monMot, false)
        afficherLettres()
        if (lettreInconnues == 0) {
            x.disabled = true
            afficher(monMot, true)
            setTimeout(jouer, 1500)
        }

    }
    document.getElementById("jouerLettre").value = ''

}

function jouer() {
    monMot = choisirMot()
    lettresConnues = []
    lettresMauvaises = []
    afficher(monMot, false)
    afficherLettres()
    x.disabled = false
}

let x = document.getElementById("jouerLettre")
x.addEventListener("input", testerLettre)
jouer()

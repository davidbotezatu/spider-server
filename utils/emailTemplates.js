exports.emailUserNou = (parola) => {
  return {
    subiect: "Utilizator creat",
    text: `Felicitari, noul tau cont a fost creat cu succes. Parola ta este: ${parola}`,
  };
};

exports.schimbareParola = {
  subiect: "Parola schimbata",
  text: "Felicitari, parola ta a fost schimbata cu succes.",
};

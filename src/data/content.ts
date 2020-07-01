import randomArrayElement from '../services/random.service'

const contents = [
  "No es para comérselo 🥰🥰🥰",
  "Se me cae la baba 🤤",
  "Uy uy uy uy 😍",
  "Una monada...",
  "Que cosita más pequeñita 😄",
  "Qué carita 😍",
  "Estos peques te sacarán una sonrisa 😀",
  "Los peques de la casa 🏠",
  "Nuestros pequeños favoritos",
  "Amor a primera vista ♥",
  "Un flechazo en toda regla 💘",
  "Acaso puede ser más guapo! 😍",
  "No hay cosa más bonita",
  "PRE-CIO-SO, sin más",
  "Me lo como 🥰",
  "El rey de la casa 👑",
  "Es que me lo como 😍",
  "Imposible que no se te caiga la baba...",
  "Uy que monooooo!!!",
];

const getContent = (term: string, producer: string): string => {
  const phrase = randomArrayElement(contents)
  const isGif = producer === 'giphy'
  if (term === 'puppy') {
    return (isGif) ?  `🐶 #pukilovers #puppy #cachorro` : `${phrase} #pukilovers #puppy #cachorro` 
  }
  return (isGif) ? `🐱 #pukilovers #kittie #gatito` : `${phrase} #pukilovers #kittie #gatito` 
}



export default getContent;

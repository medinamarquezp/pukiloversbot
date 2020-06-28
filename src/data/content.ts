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

const getContent = (term: string): string => {
  const phrase = randomArrayElement(contents)
  if (term === 'puppy') {
    return `${phrase} #pukilovers #puppy #cachorro`
  }
  return `${phrase} #pukilovers #kittie #gatito`
}

export default getContent;

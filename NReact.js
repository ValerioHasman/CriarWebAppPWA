/** Cria um elemento HTML e anexa os itens do array.
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} tagName - O nome da tag do elemento a ser criado. 
 * @param {HTMLElementTagNameMap[K]} props - Um array de itens para anexar ao elemento criado.
 * @param {Array<Node|string>} array - Um array de itens para anexar ao elemento criado.
 * @returns {HTMLElementTagNameMap[K]} - O elemento HTML criado. */
export default function NReact(tagName, props = {}, array = []) {
  const element = document.createElement(tagName);
  adicionaFilhos(element, array);
  definePropriedades(element, props);
  return element;
}

export function adicionaFilhos(element, array = []) {
  for (const item of array) {
    element.append(item);
  }
}

/**
 * @param {HTMLElement} props1 - 1, quem recebe
 * @param {HTMLElement} props2 - 2, quem doa
 */
export function definePropriedades(props1 = {}, props2) {
  for (const prop in props2) {
    if (typeof props2[prop] == "object" && !(props2[prop] instanceof HTMLElement)) {
      definePropriedades(props1[prop], props2[prop]);
    } else {
      props1[prop] = props2[prop]
    }
  }
  return props1;
}

export function Urli(caminho = ""){
  const arr = (import.meta.url).split( "/" );
  arr.pop();
  caminho = caminho[0] == "/" ? caminho : "/" + caminho;
  return arr.join("/") + caminho;
}
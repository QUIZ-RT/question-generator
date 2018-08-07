class DomManager {
  static getAParaNode(text, className) {
    const paraElement = document.createElement('p');
    paraElement.className = className;
    const textNode = document.createTextNode(text);
    paraElement.appendChild(textNode);
    return paraElement;
  }

  static getContainerTemplate() {
    return `<div id='userManagerContainer' class='pt-3'>
              <div class="text-center">
                <p> <b> Access manager </b></p>
              </div> 
            </div> `;
  }
}
export default DomManager;

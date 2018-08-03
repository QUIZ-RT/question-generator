export function topic(data) {
  let template = '<ul id="my-list" class="mdc-list" aria-orientation="vertical">';
  if (data) {
    for (const topicObj in data) {
      const topicData = data[topicObj];
      template += `<li class="mdc-list-item" data-id='${topicObj}' tabindex="-1">${topicData.topicText}</li>`;
    }
  }
  template += '</ul';
  return template;
}

export function loadButtons() {
  return `<div id='topicManagerContainer' class='pt-5'><div>
  <a tabindex="-1">
  <i class="material-icons topicIcon">
add_circle
</i>
</a>
</div> </div>
`;
}

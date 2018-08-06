export const sidenav = `<nav class="mdc-drawer__drawer">
    <nav class="mdc-drawer__content mdc-list-group">
        <div id="icon-with-text-demo" class="mdc-list">
            <!--
            <a class="navScreen mdc-list-item mdc-list-item--selected demo-drawer-list-item" tabindex="-1" href="#questionManager">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">question manager</i>Question Manager</a>
            -->
                <a class="navScreen mdc-list-item demo-drawer-list-item" tabindex="-1" data-screen="questionManager" href="#questionManager">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">question manager</i>Question Manager</a>
                <a class="navScreen mdc-list-item demo-drawer-list-item" tabindex="-1" data-screen="topicManager" href="#topicManager">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">topic manager</i>Topic Manager</a>
            
                <a class="navScreen mdc-list-item demo-drawer-list-item" tabindex="-1" href="#questionGenerator">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">question generator</i>Question Generator</a>
        </div>
    </nav>
</nav>`

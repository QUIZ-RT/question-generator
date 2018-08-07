export const messages = `<div class="alert alert-success alert-dismissible fade show hide good" id="success" role="alert">
    <strong>Success! </strong>
    <span id="op-msg"> Repository Added!</span>
    <button type="button" id="hideSuccessAlert" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="alert alert-danger alert-dismissible hide good" id="failureAlert" role="alert">
    <button type="button" id="hideDangerAlert" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <span id="msgFailure"><strong>Oh snap!</strong> Change a few things up and try submitting again.</span>
</div>
<div class="alert alert-info alert-dismissible hide good" id="infoAlert" role="alert">
    <button type="button" id="hideInfoAlert" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>I understand you intend to: &nbsp;&nbsp;</strong>
    <span id="intentName"></span>&nbsp;&nbsp;If not, please choose the correct option:
</div>`;

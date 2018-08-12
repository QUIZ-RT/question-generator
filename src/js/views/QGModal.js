export const QGModal = `<div class="modal good" id="generatedQuestionsDisplay" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="qgModalContent">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Confirm!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Below Questions were generated using the template provided, please review and click submit to push to database?</p>
                <span id="tableHolder"></span>
            </div>
            <div class="modal-footer">
                <button id="btnCancelConfirm" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="btnSubmitQuestions" type="button" class="btn btn-primary" data-dimsiss="modal">Submit</button>
            </div>
        </div>
    </div>
</div>
<button style="display: none" id="btnGeneratedQuestionsDisplay" type="submit" data-toggle="modal" data-target="#generatedQuestionsDisplay"></button>`
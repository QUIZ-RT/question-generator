export const confirmQESubmitModal = `<div class="modal good" id="confirmQESubmitModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style='margin-top: 300px;'>
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="confirmQESubmitModalContent">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Confirm!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h4>Going to submit questions to the Quiz Engine, click OK to confirm, Cancel to abort</h4>
                <p>Note: Cancelling will result in inconsistent data between QGDB and QEDB until entire data is pulled again from QGDB</p>
            </div>
            <div class="modal-footer">
                <button id="btnConfirmQESubmitModalCancel" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="btnConfirmQESubmitModalSubmit" type="button" class="btn btn-primary" data-dimsiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>
<button style="display: none" id="btnShowConfirmQESubmitModal" type="submit" data-toggle="modal" data-target="#confirmQESubmitModal"></button>`
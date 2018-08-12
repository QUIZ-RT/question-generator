export const updateQuesModal = `<div class="modal" id="updateQuestionsDisplay" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="" role="document">
        <div class="modal-content" id="updateModalContent">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Confirm!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Question Details for selected question below, please make changes and submit!!</p>
                <span id="quesDetailsHolder"></span>
            </div>
            <div class="modal-footer">
                <button id="btnQUCancelConfirm" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="btnQUSubmitQuestions" type="button" class="btn btn-primary" data-dimsiss="modal">Submit</button>
            </div>
        </div>       
    </div>
</div>'

<button style="display: none" id="btnUpdateQuestionsDisplay" type="submit" data-toggle="modal" data-target="#updateQuestionsDisplay"></button>`
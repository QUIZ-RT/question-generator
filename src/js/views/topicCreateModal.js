export const topicCreateModal = `<div class="modal good" id="topicCreateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="width: 50%; margin: auto;">
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="topicCreateModalContent" style="padding: 20px">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Create Topic</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="row login">
                <div class="form-group has-danger col-md-12 col-lg-12 topicontainer">
                    <hr>
                    <div class="input-group topic">
                        <input type="text" id="topicInputViaQG" name="topic" class="form-control" placeholder="Topic Name"  autocomplete="off" required>
                    </div>
                    <hr>
                    <div class="input-group topic">
                        <input type="text" id="topicURLViaQG" name="template" class="form-control" placeholder="Topic URL" required>
                    </div>
                </div>
            </div>
            <hr>
            <div class="modal-footer">
                <button id="btnTopicCreateCancel" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="btnTopicCreateSubmit" type="button" class="btn btn-primary" data-dimsiss="modal">Submit</button>
            </div>
        </div>
    </div>
</div>
<button style="display: none" id="btnTopicCreateModal" type="submit" data-toggle="modal" data-target="#topicCreateModal"></button>`
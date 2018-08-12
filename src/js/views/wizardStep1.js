export const wizardStep1 = `<div class="row wizardStep" id="wizardStep1Content">
    <div class="col-lg-12 col-md-12 logindash loginform">
        <form class="form-horizontal">
            <div class="row login">
                <div class="form-group has-danger col-md-12 col-lg-12 topicontainer">
                    <h2 class="heading">QG Wizard</h2>
                    <hr>
                    <div class="input-group topic">
                        <div class="input-group-addon iconspace" style="width: 2.6rem">
                            <i class="far fa-comments"></i>
                        </div>
                        <input type="text" id="topicInput" name="topic" class="form-control" placeholder="Type topic to select from the list or create anew.. "  autocomplete="off" required>
                        <span class="remarks">For eg., celebrity, bollywood, space, cricket, etc.</span>
                    </div>
                    <hr>
                    <div class="input-group topic">
                        <div class="input-group-addon iconspace" style="width: 2.6rem">
                            <i class="far fa-comments"></i>
                        </div>
                        <input type="text" id="templateInput" name="template" class="form-control" placeholder="Enter a question template to allow sampling and generation... "
                            required>
                        <span class="remarks">For eg., Who was the first Prime Minister of India?</span>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row login">
                <div>
                    <button type="button" id="btnGenerate" class="btn btn-info generateBtn">
                        <i class="fa fa-sign-in"></i>  Proceed!</button>
                </div>
            </div>
        </form>
    </div>
</div>`;

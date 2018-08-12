import {updateQuesModal} from './updateQuesModal';
import {quesUpdateView} from './quesUpdateView';
import {displayQuestionOnTopicBasis} from '../services/questionSearchDisplayService';

export function loadDropdownAndButton() {
  return `<div id='questionOnTopicContainer' class='pt-5'>
 <table>
 <tr>
 <td>
 <h1> <span class="badge badge-secondary marginLeft">Select the topic</span></h1>
 </td>
 
 <td>

    <div class="dropdown marginLeft">
          <button type="button" id="dropDownButton" class="btn btn-primary dropdown-toggle topicButton" data-toggle="dropdown">
            Topics
          </button>
          <div class="dropdown-menu" id="topicDropDown">
          </div>
  </div>
  </td>
  <td>
 
          <div class="text-right marginLeft">
              <nav aria-label="Page navigation example">
                  <ul class="pagination">                    
                  <li class="page-item marginLeft-small invisible" id="previousPageButton"><a class="page-link" href="#">Previous</a></li>
                  <li class="page-item marginLeft-small invisible" id="nextPageButton"><a class="page-link" href="#">Next</a></li>
                  </ul>
                </nav>
       </div>
       </td>
</tr></table>

<div>
<input type="hidden" id="quesIdTextbox" value=""/>
<input type="hidden" id="batchIdTextbox" value=""/>
<input type="hidden" id="topicIdTextbox" value=""/>
<input type="hidden" id="storePageNumberTextbox" value=""/>

</div>


  </div>
  `;
}

export function populateDropDownValues(topics) {   
  $.each(topics, (i, item) => {
    if(item){
    $('#topicDropDown').append($('<a>', {
      class: 'dropdown-item',
      href: '#',
      text: item.topicText,
    }));
  }
  });

  $(document).on('click', '.clickToDisplayQues',  function(event) {
    debugger;
    let target = event.target;
    $(updateQuesModal).insertAfter('#messages');
    $('#btnUpdateQuestionsDisplay').trigger('click');
    $('#quesDetailsHolder').append(quesUpdateView);
    let parent = target.closest('.updateQueRow');
    console.log(parent);

    let ques = $(parent).find('.quesText').html().trim();    
    $('#exampleInputQuestion').val(ques);

    let options = $(parent).find('.optionText');
    for(let i=0;i<options.length;i++){
        var option = $(options[i]).html().trim();   
        $('#opt'+(i+1)).val(option);
        }
    
    let answer = $(parent).find('.ansText').html().trim();
    $("#exampleInputAnswer").val(answer);
    debugger;
    let topic = $(parent).find('.topicText').html().trim();
    $("#topicIdTextbox").val(topic);

    let qid = $(parent).find('.clickToDisplayQues').html().trim();
    $("#quesIdTextbox").val(qid);

  });
};


export function getQuestionTable(myArray) {
  return `<div id='display_question'>
    
  <table class="table table-bordered table-striped table-hover">
  <thead class="thead-dark">
  <tr>
  <th class="tableCellBorder">QID</th> 
  <th class="tableCellBorder">TOPIC</th> 
  <th class="tableCellBorder">Question</th>
  <th class="tableCellBorder">Options</th> 
  <th class="tableCellBorder">Answer</th>             
</tr>
</thead>
<tbody class="questionTable">

  ${myArray.map(ques => `<tr class="updateQueRow">                         
                          
                        <td class="tableCellBorder">
                        <button id= ${ques.qid} class="clickToDisplayQues"> ${ques.qid}  </button> </td>
                        <td class="tableCellBorder topicText"> ${ques.topic} </td>         
                        <td class="tableCellBorder quesText"> ${ques.question} </td>
                          <td> <table> 
                           <tr> <td class="tableCellBorder optionText"> ${Object.values(ques.options)[0]} </td> </tr>
                           <tr>  <td class="tableCellBorder optionText"> ${Object.values(ques.options)[1]} </td> </tr>
                           <tr>  <td class="tableCellBorder optionText"> ${Object.values(ques.options)[2]} </td> </tr>
                           <tr>  <td class="tableCellBorder optionText"> ${Object.values(ques.options)[3]} </td> </tr>
                          </table> </td>
                          <td class="tableCellBorder ansText"> ${ques.options[ques.answer]} </td>                          
      </tr>`).join('')}

  </table>
 
  </div>
  `;
}
export function showQuestionsByTopic(myData) {
  const quesArea = document.getElementById('display_question');
  if (quesArea) {
    jQuery('#display_question').remove();
  }
  $('#questionOnTopicContainer').append(getQuestionTable(myData));
}

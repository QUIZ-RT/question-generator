import SearchQuestionController from './../controllers/searchQuestionController';
export function loadDropdownAndButton() {

  debugger;
  return `<div id='searchQuestionOnTopicContainer' class='pt-5'><div class="text-center">

    <div class="dropdown">
    <button type="button" id="dropDownButton" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
      Topics
    </button>
    <div class="dropdown-menu" id="topicDropDown">

    </div>
  </div>
 
  </div>
  `;
}

export function populateDropDownValues(topics) {
  $.each(topics, function (i, item) {
    $('#topicDropDown').append($('<a>', { 
        class : "dropdown-item",
        href :"#",
        text : item.topicText
    }));
});


$('#topicDropDown').on('click', '.dropdown-item', function(){
  let selectedValue = $(this).html();
  $('#dropDownButton').html(selectedValue);
})

}

export function showQuestionsByTopic(myData){
  debugger;
  var quesArea = document.getElementById("display_question");
  if(quesArea){
    jQuery('#display_question').remove();
  }
  $('#searchQuestionOnTopicContainer').append(getQuestionTable(myData));
}



export function getQuestionTable(myArray) {
  debugger;
  return `<div id='display_question'>
    
  <table class="table table-bordered table-striped table-hover">
    <tr>
    <td class="tableCellBorder">QID</td> 
    <td class="tableCellBorder">Question</td>
    <td class="tableCellBorder">Options</td> 
    <td class="tableCellBorder">Answer</td>             
  </tr>

  ${myArray.map(ques => `<tr>                         
                          <td class="tableCellBorder"> ${ques.qid} </td>
                          <td class="tableCellBorder"> ${ques.question} </td>
                          <td> <table> 
                           <tr> <td class="tableCellBorder"> ${Object.values(ques.options)[0]} </td> </tr>
                           <tr>  <td class="tableCellBorder"> ${Object.values(ques.options)[1]} </td> </tr>
                           <tr>  <td class="tableCellBorder"> ${Object.values(ques.options)[2]} </td> </tr>
                           <tr>  <td class="tableCellBorder"> ${Object.values(ques.options)[3]} </td> </tr>
                          </table> </td>
                          <td class="tableCellBorder"> ${ques.options[ques.answer]} </td>
                          

                          

      </tr>`).join('')}

  </table>
 
  </div>
  `;

}
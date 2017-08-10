// via https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes
console.log("checkcheckboxstate loading...");

// parts
var overall = document.querySelector('input[id="checkbox-01"]');
var parts = document.querySelectorAll('input[class="part"]');

overall.addEventListener('click', updateTopDown);

function updateTopDown() {
  //e.preventDefault();
  console.log("overall.checked: "+overall.checked);

  if(!overall.checked) {
    console.log("updateTopDown uncheck");
    for(var i = 0; i < parts.length; i++) {
      parts[i].checked = false;
    }
    overall.checked = false;
    overall.indeterminate = false;
  }
  else {
    console.log("updateTopDown check");
    for(var i = 0; i < parts.length; i++) {
      parts[i].checked = true;
    }
    overall.checked = true;
    overall.indeterminate = false;
  }
  updateBottomUp();
}

for(var i = 0; i < parts.length; i++) {
  parts[i].addEventListener('click', updateBottomUp);
}

function updateBottomUp() {
  var checkedCount = 0;
  for(var i = 0; i < parts.length; i++) {
    if(parts[i].checked) {
      checkedCount++;
    }
  }
  console.log("updateBottomUp checkedCount="+checkedCount);

  if(checkedCount === parts.length) {
    console.log("updateBottomUp checked");
    overall.checked = true;
    overall.indeterminate = false;
  } else if(checkedCount <= parts.length && checkedCount > 0) {
    console.log("updateBottomUp indeterminate");
    overall.checked = true;
    overall.indeterminate = true;
  } else {
    console.log("updateBottomUp unchecked");
    overall.checked = false;
    overall.indeterminate = false;
  }
}

// disabled: https://www.w3schools.com/jsref/prop_checkbox_disabled.asp

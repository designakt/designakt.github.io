// via https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes
console.log("checkcheckboxstate loading...");

// -----------------
// Double-Dependent
var overall = document.querySelector('input[id="checkbox-01"]');
var parts = document.querySelectorAll('input[class="part"]'); // id 2 & 3

overall.addEventListener('click', updateTopDown);
for(var i = 0; i < parts.length; i++) {
  parts[i].addEventListener('click', updateBottomUp);
}

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


// -----------------------
// Disable Sub (remember)
var cb_parent = document.querySelector('input[id="checkbox-04"]');
var cb_child = document.querySelector('input[id="checkbox-05"]');
var cb_childB = document.querySelector('input[id="checkbox-06"]');

cb_parent.addEventListener('click', updateChild);

// disabled: https://www.w3schools.com/jsref/prop_checkbox_disabled.asp
function updateChild() {
  console.log("parent.checked: "+cb_parent.checked);

  if(cb_parent.checked) {
    console.log("checked");
    cb_child.disabled = false;
    cb_childB.disabled = false;
  }
  else {
    console.log("unchecked");
    cb_child.disabled = true;
    cb_childB.disabled = true;
  }
}


// -----------------------
// Disable Sub (uncheck all sub)
var alluncheck_parent = document.querySelector('input[id="alluncheck_parent"]');
var alluncheck_childA = document.querySelector('input[id="alluncheck_childA"]');
var alluncheck_childB = document.querySelector('input[id="alluncheck_childB"]');
var state_alluncheck_childA = alluncheck_childA.checked;
var state_alluncheck_childB = alluncheck_childB.checked;

alluncheck_parent.addEventListener('click', alluncheck_updateChild);

function alluncheck_updateChild() {
  console.log("alluncheck_parent.checked: "+alluncheck_parent.checked);

  // if parent is checked, restore previous state
  if(alluncheck_parent.checked) {
    console.log("checked");
    // enable sub-elements
    alluncheck_childA.disabled = false;
    alluncheck_childB.disabled = false;
    // set previus state to sub-elements
    alluncheck_childA.checked = state_alluncheck_childA;
    alluncheck_childB.checked = state_alluncheck_childB;
  }
  // if parent is unchecked, record state and disable
  else {
    console.log("unchecked");
    // record state of sub-elements
    state_alluncheck_childA = alluncheck_childA.checked;
    state_alluncheck_childB = alluncheck_childB.checked;
    // remove state from sub-elements
    alluncheck_childA.checked = false;
    alluncheck_childB.checked = false;
    // disable sub-elements
    alluncheck_childA.disabled = true;
    alluncheck_childB.disabled = true;
  }
}


// -----------------------
// Hide Sub
var hidesub_parent = document.querySelector('input[id="hidesub_parent"]');
var hidesub_childA = document.querySelector('input[id="hidesub_childA"]');
var hidesub_childB = document.querySelector('input[id="hidesub_childB"]');

hidesub_parent.addEventListener('click', updateHideChild);

function updateHideChild() {
  console.log("hidesub_parent.checked: "+hidesub_parent.checked);

  if(hidesub_parent.checked) {
    console.log("checked");
    // show elements
    hidesub_childA.parentNode.style.display = "flex";
    hidesub_childB.parentNode.style.display = "flex";
  }
  else {
    console.log("unchecked");
    // hide elements
    hidesub_childA.parentNode.style.display = "none";
    hidesub_childB.parentNode.style.display = "none";
  }
}

// -----------------------
// Hide Sub
var hideResSub_parent = document.querySelector('input[id="hideResSub_parent"]');
var hideResSub_childA = document.querySelector('input[id="hideResSub_childA"]');
var hideResSub_childB = document.querySelector('input[id="hideResSub_childB"]');
// record and remember initial state
var state_hideResSub_childA = hideResSub_childA.checked;
var state_hideResSub_childB = hideResSub_childB.checked;

hideResSub_parent.addEventListener('click', updateHideResSub);

function updateHideResSub() {
  console.log("hideResSub_parent.checked: "+hideResSub_parent.checked);

  if(hideResSub_parent.checked) {
    console.log("checked");
    // set default state to elements
    hideResSub_childA.checked = state_hideResSub_childA;
    hideResSub_childB.checked = state_hideResSub_childB;
    // show elements
    hideResSub_childA.parentNode.style.display = "flex";
    hideResSub_childB.parentNode.style.display = "flex";
  }
  else {
    console.log("unchecked");
    // hide elements
    hideResSub_childA.parentNode.style.display = "none";
    hideResSub_childB.parentNode.style.display = "none";
  }
}

// Annotate

function annotateis() {
  window.hypothesisConfig=function(){
    return{
      showHighlights:true,
      appType:'bookmarklet'
    };
  };
  var d = document;
  var s = d.createElement('script');
  s.setAttribute('src','https://hypothes.is/embed.js');
  d.body.appendChild(s)
}

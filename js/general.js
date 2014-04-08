function hasClass(node, klass){
    var classList = node.className;
    if(classList.indexOf(klass)===-1){
        return false;
    } else {
        return true;
    }
}

function removeClass(node, classRemove){
    node.className = node.className.replace(classRemove,"");
}

function addClass(node, classAdd){
    node.className += ' ' + classAdd;
} 

var el = document.querySelector('.h-drp-actions');
var drp = document.querySelector('.h-dropdown');

el.addEventListener("click", function(){
    if ( !hasClass(drp, 'drp-open') ) { 
         addClass (drp, 'drp-open');
    }   else {
         removeClass (drp, 'drp-open');
    }

  return true;

});

drp.addEventListener("mouseleave", function(){
    if ( hasClass(drp, 'drp-open') ) { 
         removeClass (drp, 'drp-open');
    } 
  return true;
});
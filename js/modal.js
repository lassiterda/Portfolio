// using IIFE to wrap functions
(function() {
//  Constructor for Modal
  this.Modal = function () {
//  'hoisting' variables
    this.closeButton
    this.modal
    this.overlay
//   bind
    this.transitionEnd = transitionSelect()
    
    //default objects
    this.options = {
      className: 'fade-and-drop',
      closeButton: true,
      content: '',
      maxWidth: 800,
      minWidth: 280,
      overlay: true
    }

    if(arguments[0] && typeof(arguments[0]) === 'object') {
      Object.assign(this.options, arguments[0])  
    }
  }

//  function to create new Modal element 
  function create() {
    
    var content, contentHolder, docFrag

    docFrag = document.createDocumentFragment()

    //    create modal element 
    this.modal = document.createElement('div')
    this.modal.className = 'modal ' + this.options.className
    this.modal.style.minWidth = this.options.minWidth + 'px'
    this.modal.style.maxWidth = this.options.maxWidth + 'px'

    //    add Closebutton based on options
    if (this.options.closeButton) {
      this.closeButton = document.createElement('a')
      this.closeButton.className = 'fa fa-times close-button'
      this.closeButton.content = '.'
    }
    //    add overly layer based on options
    if (this.options.overlay) {
      this.overlay = document.createElement('div')
      this.overlay.className = 'modal-overlay ' + this.options.className
      docFrag.appendChild(this.overlay)
    }


//  Content is either a simple String OR DOM Node (for portfolio will always be DOM Node)
    content = typeof (this.options.content) === 'string'
      ? content = this.options.content
      : content = this.options.content.innerHTML

//  Create content area and append to modal
    contentHolder = document.createElement('div')
    contentHolder.className = 'modal-content'
    contentHolder.innerHTML = content
    this.modal.appendChild(contentHolder)

//  Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

//  Append DocumentFragment to body
    document.getElementsByClassName('site-container')[0].appendChild(docFrag);
  }


  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this))
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this))
    }

  }

  //  public method used to open the Modal (attached to Portfolio buttons)
  Modal.prototype.open = function() {
    create.call(this)
    initializeEvents.call(this)
    window.getComputedStyle(this.modal).height

    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        ' modal-open modal-anchored' : ' modal-open')
    this.overlay.className = this.overlay.className + ' modal-open'
  }

  Modal.prototype.close = function () {
//  Remove the model-open class name from the Modal and Overlay
    this.modal.className = this.modal.className.replace(' modal-open', '')
    this.overlay.className = this.overlay.className.replace(' modal-open', '')

//  Remove the Modal from the DOM oncetransition is complete
    this.modal.addEventListener(this.transitionEnd,() => {
      this.modal.parentNode.removeChild(this.modal)
    })
//  remove the Overlay from the DOM once transition is complete
    this.overlay.addEventListener(this.transitionEnd, () => {
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay)
      }
    })
  }

}())

//Helper function for determining Transitionend string
function transitionSelect() {
  var el = document.createElement("div");
  if (el.style.WebkitTransition) return "webkitTransitionEnd";
  if (el.style.OTransition) return "oTransitionEnd";
  return 'transitionend';
}


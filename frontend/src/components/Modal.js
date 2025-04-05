

class Modal {
    constructor(){
        this._modal = document.querySelector('#modal');
        this._modalBtn = document.querySelector('#modal-btn');
        this._addEvents();

    }

    _addEvents(){
        window.addEventListener('click', this._canClose.bind(this));
        document.addEventListener('closemodal', this._closeModal.bind(this));
        document.add
        this._modalBtn.addEventListener('click', this._openModal.bind(this));
    }

    _openModal = () =>{
        this._modal.style.display = 'block';
    }
    
    _closeModal = () => {
        this._modal.style.display = 'none';
    }
    
    _canClose = (event) => {
        if(event.target === this._modal){
            this._closeModal();
        }
    }
}

export default Modal;
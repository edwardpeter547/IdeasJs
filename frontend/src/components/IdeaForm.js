import IdeaApiService from '../services/IdeasApi';
import IdeaList from './IdeaList';

class IdeaForm{
    constructor(){
        this._modal = document.querySelector('#modal');
        this._ideaList = new IdeaList();
        this._render();
        this._form = document.querySelector('#idea-form');
        this._form.addEventListener('submit', this._submitForm.bind(this));
    }

    async _submitForm(event){
        event.preventDefault();
        const formData = new FormData(this._form);
        const username = formData.get('username');
        const text = formData.get('text');
        const tag = formData.get('tag');

        const values = [username, text, tag];

        for(const value of values){
            if(value === ''){
                alert("All fields must be filled.");
                break;
            }
        }

        const idea = { username, text, tag}
        if(!IdeaList.isUpdateMode()){
            const createdIdea = await IdeaApiService.createIdea(idea);
            this._ideaList.addToDom(createdIdea.data.result);
        }else{
            const ideaId = formData.get('idea-id');
            const updatedIdea = await IdeaApiService.updateIdea(ideaId, idea);
            this._ideaList.updateDom(updatedIdea.data.result);
        }
        document.dispatchEvent(new Event('closemodal'));
    }

    _render(){
        this._modal.innerHTML = `
        <div id="form-modal" class="modal-box">
            <form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="hidden" name="idea-id" id="idea-id" value="" />
                <input type="text" name="username" id="username">
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag">
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
            </form>
        </div>
        `;
    }
}

export default IdeaForm;
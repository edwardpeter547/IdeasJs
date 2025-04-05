
import IdeasApiService from '../services/IdeasApi';

class IdeaList {

    static _isUpdate = false;

    constructor(){
        this._ideaListEl = document.querySelector('#idea-list');
        this._modal = document.querySelector('#modal');
        this._ideas = [];
        this._getIdeas();
        this._validTags = this._setTags();
    }

    static isUpdateMode(){
        return IdeaList._isUpdate;
    }

    async _getIdeas(){
        try{
            const response = await IdeasApiService.getIdeas();
            this._ideas = response.data.result;
            this._render();
        }catch(error){
            console.log(error);
        }
    }

    async _removeIdea(event){
        if(confirm("Are you sure you want to delete")){
            const ideaId = event.target.closest('.card').getAttribute('data-id');
            const response = await IdeasApiService.removeIdea(ideaId);
            if(response.data.success){
                const index = this._ideas.findIndex((item) => item._id === ideaId);
                if(index !== -1){
                    this._ideas.splice(index, 1);
                    this._render();
                }
            }
        }
    }

    _openUpdateForm(event){
        this._modal.style.display = 'block';
        const card = event.target.parentElement
        const ideaId = card.getAttribute('data-id');
        const text = card.querySelector('h3').textContent;
        const tag = card.querySelector('.tag').textContent;
        const author = card.querySelector('.author').textContent;

        this._modal.querySelector('#username').value = author;
        this._modal.querySelector('#idea-text').value = text;
        this._modal.querySelector('#tag').value = tag;
        this._modal.querySelector('#idea-id').value = ideaId;
        this.constructor._isUpdate = true;
    }

    _setTags(){
        const validTags = new Set();
        validTags.add('technology');
        validTags.add('software');
        validTags.add('business');
        validTags.add('education');
        validTags.add('health');
        validTags.add('inventions');
        validTags.add('politics');
        return validTags;
    }

    _getTagClass(tagData){
        let tag = tagData.toLowerCase();
        let tagClass = '';
        if(this._validTags.has(tag)){
            tagClass = `tag-${tag}`;
        }
        return tagClass;
    }

    addToDom(idea){
        this._ideas.push(idea);
        this._render();
    }

    updateDom(idea){
        const index = this._ideas.findIndex((item) => item._id === idea._id);
        if(index !== -1){
            this._ideas[index].text = idea.text;
            this._ideas[index].tag = idea.tag;
            this._ideas[index].username = idea.username;
        }
        this._render();
    }

    _render(){
        this._ideaListEl.innerHTML = "";
        this._ideas.forEach(idea => {
            const tagClass = this._getTagClass(idea.tag);
            const ideaEl = document.createElement('div');
            ideaEl.classList.add('card');
            ideaEl.dataset.id = idea._id;
            ideaEl.innerHTML = `
                    <button class="delete"><i class="fas fa-times"></i></button>
                    <h3>${idea.text}</h3>
                    <p class="tag ${tagClass}">${idea.tag}</p>
                    <p>
                        Posted on <span class="date">${idea.date.slice(0, 10)}</span> by
                        <span class="author">${idea.username}</span>
                    </p>
                    <button id="btn-update" class="btn btn-danger">Update</button>`;
            
            this._btnDelete = ideaEl.querySelector('.delete');
            this._btnUpdate = ideaEl.querySelector('#btn-update');
            this._btnUpdate.addEventListener('click', this._openUpdateForm.bind(this));
            this._btnDelete.addEventListener('click', this._removeIdea.bind(this));
            this._ideaListEl.appendChild(ideaEl);

        });
    }
}


export default IdeaList;
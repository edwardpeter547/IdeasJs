// import '@fortawesome/fontawesome-free/css/all.css';
import './css/style.css';
import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import IdeasApiService from './services/IdeasApi'


console.log(IdeasApiService.getEndpoint());


const modal = new Modal();
const ideaForm = new IdeaForm();
const ideaList = new IdeaList();

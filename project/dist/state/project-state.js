import { Project, ProjectStatus } from '../models/project.js';
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerHandler) {
        this.listeners.push(listenerHandler);
    }
}
/* Project State Management
   -----------------------------------*/
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    ;
    moveProject(projectId, newStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    ;
    updateListeners() {
        for (const listenerHandler of this.listeners) {
            listenerHandler(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();

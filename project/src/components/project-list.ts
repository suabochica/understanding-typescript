import { Project, ProjectStatus } from '../models/project.js';
import { DragTarget } from '../models/drag-drop.js';
import { ProjectComponent } from './base-component.js';
import { ProjectItem } from './project-item.js';
import { autobind } from  '../decorators/autobind.js';
import { projectState } from  '../state/project-state.js';

export class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent) {
        event.preventDefault();
        const projectId = event.dataTransfer!.getData('text/plain');

        projectState.moveProject(
            projectId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }
}

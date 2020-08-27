/* Project Type
   -----------------------------------*/
enum ProjectStatus {
    Active,
    Finished,
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerHandler: Listener<T>) {
        this.listeners.push(listenerHandler);
    }
}

/* Project State Management
   -----------------------------------*/
class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();

        return this.instance;
    }


    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active,
        )
        this.projects.push(newProject);

        for (const listenerHandler of this.listeners) {
            listenerHandler(this.projects.slice());
        }
    };
}

const projectState = ProjectState.getInstance();

/* Validation
   -----------------------------------*/
interface Validatable {
    value: string | number;
    required?: boolean;
    minStringLength?: number;
    maxStringLength?: number;
    minNumberLength?: number;
    maxNumberLength?: number;
}

function isValidInput(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minStringLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minStringLength;
    }
    if (validatableInput.maxStringLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxStringLength;
    }
    if (validatableInput.minNumberLength != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.minNumberLength;
    }
    if (validatableInput.maxNumberLength != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.maxNumberLength;
    }

    return isValid;
}

/* Decorators
   -----------------------------------*/
function autobind(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);

            return boundFunction;
        }
    };

    return adjustedDescriptor;
}

/* Abstract classes
   -----------------------------------*/
abstract class ProjectComponent<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(
              templateId
            )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );

        this.element = importedNode.firstElementChild as U;

        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(insertAtStart)
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

/* Classes
   -----------------------------------*/
class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    configure() {
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
            const listItem = document.createElement('li');

            listItem.textContent = projectItem.title;
            listElement.appendChild(listItem);
        }
    }
}

class ProjectInput extends ProjectComponent<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minStringLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            minNumberLength: 1,
            maxNumberLength: 5,
        };

        if (
            !isValidInput(titleValidatable) ||
            !isValidInput(descriptionValidatable) ||
            !isValidInput(peopleValidatable)
        ) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value= '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people)
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

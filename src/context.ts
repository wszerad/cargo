import {Subsription} from "./subsription";
import {Action, Mutation} from "./definietions";

export class Context {
    private _subscribe = new Subsription<Mutation>();
    private _subscribeAction = new Subsription<Action>();

    public mutation = false;
    public getter = false;

    public instance: any = null;
    public getters = {};

	constructor(
        public name: string,
	) {}

	replaceState(state: any) {

	}

	sendAction(action: Action) {
        this._subscribeAction.next(action);
	}

    subscribeAction(cb) {
		this._subscribeAction.subscribe(cb);
	}

	sendMutation(mutation: Mutation) {
        this._subscribe.next(mutation);
	}

    subscribe(cb) {
		this._subscribe.subscribe(cb);
	}

	// commit(mutation: Mutation);
	// commit(type: string, payload?: any);
	// commit(mutationOrType, payload?) {
	// 	if (typeof mutationOrType === 'string') {
	// 		this.instance[mutationOrType](payload);
	// 	} else {
	// 		this.instance[mutationOrType.type](mutationOrType.payload);
	// 	}
	// }
	//
    // dispatch(action: Action);
    // dispatch(type: string, payload?: any);
	// dispatch(actionOrType, payload?) {
    //     if (typeof actionOrType === 'string') {
    //         this.instance[actionOrType](payload);
    //     } else {
    //         this.instance[actionOrType.type](actionOrType.payload);
    //     }
	// }
}

let context: Context = null;

export function setContext(name: string) {
	context = new Context(name);
	return context;
}

export function getContext() {
	return context;
}
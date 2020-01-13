import {Action, Subscription} from "./utils";
import {Mutation} from "./utils";
import {ComputedRef} from "@vue/reactivity";

export class Context {
    private _subscribe = new Subscription<Mutation>();
    private _subscribeAction = new Subscription<Action>();

    public mutation = false;
    public instance: any = null;
    public getters = new Map<string, ComputedRef<any>>();
    public mutations = new Map<string, Function>();

	constructor(
        public name: string,
	) {}

	get state() {
		return this.instance;
	}

	replaceState(state: any) {
		console.log(state);
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
}

let context: Context = null;

export function setContext(name: string) {
	context = new Context(name);
	return context;
}

export function getContext() {
	return context;
}
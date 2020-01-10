export class Subsription<P, T = (payload: P, state?: any) => any> {
    private subscribers: Set<T> = new Set();

    next(payload: P, state?: any): void {
        this.subscribers.forEach((subscription: any) => {
            subscription(payload, state);
        });
    }

    subscribe(cb: T) {
        this.subscribers.add(cb);
        return this.unsubscribe(cb);
    }

    private unsubscribe(cb: T) {
        return () => this.subscribers.delete(cb);
    }
}
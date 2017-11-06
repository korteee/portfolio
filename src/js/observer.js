/**ObserverList interface */
class Observer {
    constructor(method) {
        this.method = method;
    }
}

/**Subject Interface */

class Subject {
    constructor() {
        this.Observers = [];
    }

    addObserver(observer) {
        this.Observers.push(observer);
    }

    removeObserver(observer) {
        this.Observers.splice(this.Observers.indexOf(observer), 1);
    }

    notify() {
        this.Observers.forEach((observer) => {
            observer.method();
        })
    }
}
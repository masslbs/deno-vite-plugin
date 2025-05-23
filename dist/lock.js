export default class Lock {
    constructor() {
        this.locked = false;
        this.waitQueue = [];
    }
    acquire() {
        // If lock is not currently held, acquire it immediately
        if (!this.locked) {
            this.locked = true;
            return Promise.resolve();
        }
        // Otherwise, wait for the lock to be released
        return new Promise((resolve) => {
            this.waitQueue.push(resolve);
        });
    }
    release() {
        if (!this.locked) {
            throw new Error("Cannot release a lock that is not held");
        }
        // If there are waiters, resolve the next one in queue
        if (this.waitQueue.length > 0) {
            const nextResolver = this.waitQueue.shift();
            nextResolver();
        }
        else {
            // Otherwise, mark the lock as free
            this.locked = false;
        }
    }
}

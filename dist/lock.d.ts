export default class Lock {
    private locked;
    private waitQueue;
    acquire(): Promise<void>;
    release(): void;
}

import { EventEmitter } from 'events';

class ServiceEvents extends EventEmitter {}

const serviceEvents = new ServiceEvents();

export default serviceEvents;

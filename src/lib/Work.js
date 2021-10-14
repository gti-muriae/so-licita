import Queue from "bull";

import * as redis from '../config/redis.config';
import * as works from '../work';


const queues = Object.values(works).map(work => ({
    bull: new Queue(work.key, redis),
    name: work.key,
    handle: work.handle,
    options: work.options
}))
module.exports = {
    queues, add(name, data) {
        const queue = this.queues.find(queue => queue.name === name);
        return queue.bull.add(data, queue.options);
    }, process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('failed', (work, err) => {
                console.log('Work Falied', queue.key, work.data)
                console.log(err);
            });


        });
    }
}
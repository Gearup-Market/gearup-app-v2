import Queue, { Job, JobOptions } from "bull";

class JobQueue<T = any> {
	private queue: Queue.Queue<T>;

	constructor(name: string, redisUrl: string) {
		this.queue = new Queue<T>(name, redisUrl);

		this.queue.on("completed", (job, result) => {
			console.log(`Job ${job.id} completed with result:`, result);
		});

		this.queue.on("failed", (job, err) => {
			console.error(`Job ${job.id} failed with error:`, err);
		});
	}

	async addJob(data: T, options?: JobOptions): Promise<Job<T>> {
		return this.queue.add(data, options);
	}

	async processJobs(
		concurrency: number,
		processor: (job: Job<T>, done: Queue.DoneCallback) => Promise<void>
	): Promise<void> {
		this.queue.process(concurrency, processor);
	}

	async getJob(jobId: string | number): Promise<Job<T> | null> {
		return this.queue.getJob(jobId);
	}

	async removeJob(jobId: string | number): Promise<void> {
		const job = await this.getJob(jobId);
		if (job) {
			await job.remove();
		}
	}

	async pauseQueue(): Promise<void> {
		await this.queue.pause();
	}

	async resumeQueue(): Promise<void> {
		await this.queue.resume();
	}

	async closeQueue(): Promise<void> {
		await this.queue.close();
	}
}

export default JobQueue;

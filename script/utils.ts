import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

// 自定义每个task的name
export const withTaskName = (name: string, fn: any) => Object.assign(fn, { displayName: name });

// 删除文件
export const deleteFolderRecursive = (url: string) => {
	return new Promise<void>((resolve) => {
		let files: string[] = [];

		if (fs.existsSync(url)) {
			files = fs.readdirSync(url);

			files.forEach((file: string) => {
				const curPath: string = path.join(url, file);

				if (fs.statSync(curPath).isDirectory()) {
					deleteFolderRecursive(curPath);
				} else {
					fs.unlinkSync(curPath);
				}
			});

			fs.rmdirSync(url);

			resolve();
		} else {
			resolve();
			return;
		}
	});
};

// 在node中开启一个子进程来运行脚本
export const run = async (command: string, path: string) => {
	return new Promise((resolve) => {
		const [cmd, ...args] = command.split(' ');

		const app = spawn(cmd, args, {
			cwd: path,
			stdio: 'inherit',
			shell: true,
		});
		app.on('close', resolve);
	});
};

export const copyFile = (sourceDir: string, targetDir: string) => {
	return new Promise<void>((resolve) => {
		const copy = (copySrc: string, copyDest: string) => {
			fs.readdir(copySrc, (err, list) => {
				if (err) {
					throw err;
				}
				list.forEach((item) => {
					const ss = path.resolve(copySrc, item);
					fs.stat(ss, (err, stat) => {
						if (err) {
							throw err;
						} else {
							const curSrc = path.resolve(copySrc, item);
							const curDest = path.resolve(copyDest, item);
							if (stat.isFile()) {
								// 文件，直接复制
								fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest));
							} else if (stat.isDirectory()) {
								// 目录，进行递归
								fs.mkdirSync(curDest, { recursive: true });
								copy(curSrc, curDest);
							}
						}
					});
				});
			});
		};
		fs.stat(sourceDir, (err, stats) => {
			if (err) {
				throw err;
			}
			if (stats.isFile()) {
				fs.createReadStream(path.resolve(sourceDir)).pipe(fs.createWriteStream(path.resolve(targetDir)));
			} else {
				fs.access(targetDir, (err) => {
					if (err) {
						// 若目标目录不存在，则创建
						fs.mkdirSync(targetDir, { recursive: true });
					}
					copy(sourceDir, targetDir);
				});
			}
		});
		resolve();
	});
};

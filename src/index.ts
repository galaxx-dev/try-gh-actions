import app from "./app";

const PORT = 8000;

let server;
try {
	server = app.listen(PORT, (): void => {
		console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}

export default server;

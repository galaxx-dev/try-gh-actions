import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 8000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "Hello 213asdqweqwqwedzxc",
	});
});

try {
	app.listen(PORT, (): void => {
		console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
	});
} catch (error: any) {
	console.error(`Error occured: ${error.message}`);
}

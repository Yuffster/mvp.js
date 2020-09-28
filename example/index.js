import { App } from '../mvp.js';

const app = new App({
	title: 'MVP Example Sandbox',
	name: 'mvp_example'
});

app.get('/', (req) => {
	req.respond({body:'omg sweet.'});
});

app.get('/users', (req) => {
	req.respond({body:'there are no users.'});
});

app.listen(8000);
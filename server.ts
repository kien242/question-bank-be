import { app } from './src/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PORT: any = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Starting server with port', PORT);
});

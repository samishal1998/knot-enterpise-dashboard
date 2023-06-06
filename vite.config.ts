import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
	const config = {
		plugins: [commonjs(), react(), tsconfigPaths()],
		// define: {global:'window'} as any,
	};

	// if (mode === "development") {
	//     config.define.global = {};
	// }

	return config;
});

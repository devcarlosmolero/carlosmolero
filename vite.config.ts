import {
    vitePlugin as remix,
    cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { flatRoutes } from 'remix-flat-routes'

export default defineConfig({
    server: {
        port: 3000,
    },
    assetsInclude: ['**/*.md'],
    plugins: [
        remixCloudflareDevProxy(),
        remix({
            routes(defineRoutes) {
                return flatRoutes('routes', defineRoutes, {
                    ignoredRouteFiles: ['**/.*'],
                })
            },
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
    ],
})

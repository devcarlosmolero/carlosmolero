import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getSalesDatabaseRows } from '~/features/admin/api'
import AdminSalesPage from '~/features/admin/sales/components'
import { IChartData } from '~/features/admin/types'
import { fromNotionSalesToChartData } from '~/features/admin/utils'
import ServerUtils from '~/utils/server'

export const headers = ({ loaderHeaders }: { loaderHeaders: Headers }) => {
    return loaderHeaders
}

export async function loader({ request, context }: LoaderFunctionArgs) {
    const authResult = ServerUtils.isHTTPAuthorized(request, context)

    if (!authResult) {
        return new Response('Required Authentication', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Protected"',
                'Cache-Control': 'no-store, no-cache, must-revalidate',
            },
        })
    }

    const response = await getSalesDatabaseRows(context)
    return {
        chartData: fromNotionSalesToChartData(response),
        allowed: authResult,
    }
}

export default function Page() {
    const { chartData, allowed } = useLoaderData<any>()

    return (
        <AdminSalesPage
            chartData={chartData as IChartData[]}
            allowed={allowed}
        />
    )
}

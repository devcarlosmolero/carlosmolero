import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getSalesDatabaseRows } from '~/features/admin/api'
import AdminSalesPage from '~/features/admin/sales/components'
import { IChartData } from '~/features/admin/types'
import { fromNotionSalesToChartData } from '~/features/admin/utils'

export const headers = ({ loaderHeaders }: { loaderHeaders: Headers }) => {
    return loaderHeaders
}

export async function loader({ context }: LoaderFunctionArgs) {
    const response = await getSalesDatabaseRows(context)
    return {
        chartData: fromNotionSalesToChartData(response),
    }
}

export default function Page() {
    const { chartData } = useLoaderData<any>()

    return <AdminSalesPage chartData={chartData as IChartData[]} />
}

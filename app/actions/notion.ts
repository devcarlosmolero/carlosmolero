import { AppLoadContext } from '@remix-run/cloudflare'
import { INotionRowsResponse } from '~/types/notion'

const NOTION_DATABASE_ID = '105b14125e7480528094e8455347b20e'
const NOTION_API_BASE_URL = 'https://api.notion.com/v1'

async function getSalesDatabaseRows(context: AppLoadContext) {
    const notionToken = context.cloudflare.env.NOTION_SECRET

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${notionToken}`,
        'Notion-Version': '2022-06-28',
    }

    const endpoint = `${NOTION_API_BASE_URL}/databases/${NOTION_DATABASE_ID}/query`

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({}),
    })
    return response.json() as Promise<INotionRowsResponse>
}

const Notion = {
    getSalesDatabaseRows,
}

export default Notion

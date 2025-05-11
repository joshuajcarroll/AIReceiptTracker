// SchematicComponent.tsx (Server Component)
import { getTemporaryTokenAccess } from '@/actions/getTemporaryTokenAccess';
import SchematicEmbed from './SchematicEmbed';

async function SchematicComponent({ componentId }: { componentId?: string }) {
    if (!componentId) {
        return null;
    }

    // Fetching the access token server-side
    const accessToken = await getTemporaryTokenAccess();

    if (!accessToken) {
        throw new Error("No access token found for user");
    }

    // Passing the access token to the client component
    return <SchematicEmbed accessToken={accessToken} componentId={componentId} />;
}

export default SchematicComponent;

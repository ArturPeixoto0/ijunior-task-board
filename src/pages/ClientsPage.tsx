import { ClientsList } from "../components/ClientsList";
import { AddClient } from "../components/AddClient"
import { useState } from "react";

export function ClientsPage () {

    const [refreshKey, setRefreshKey] = useState(0);
    return(
        <div>
            <AddClient refreshKey={() => setRefreshKey(prev=>prev+1)} />
            <ClientsList refreshKey={refreshKey}/>
        </div>
    );
}
import { ServiceOrderList } from '../components/ServiceOrderList'
import { AddServiceOrder } from '../components/AddServiceOrder';
import { useState } from 'react';

export function ServiceOrderPage () {
    const [refreshKey, setRefreshKey] = useState(0);

    return(
        <div>
            <AddServiceOrder refreshKey={() => setRefreshKey(prev=>prev+1)}/>
            <ServiceOrderList refreshKey={refreshKey}/>
        </div>
    );
}
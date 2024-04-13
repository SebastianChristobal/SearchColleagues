
import { IUsers } from '@pnp/graph/users';
import { useState, useEffect } from 'react';

export const useFetch = (fetchUsersFn: any, context: any, initialValue: []): { fetchData: any[] } => {
  
    const [fetchData, setfetchData] = useState<IUsers[]>(initialValue);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const users = await fetchUsersFn({ context });
                setfetchData(users);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData().catch((err) => {
            console.error(err);
        });
    }, [fetchUsersFn]);

    return {
        fetchData
    };
};



import { useContext } from 'react';
import { ErrorContext } from '../contexts/ErrorContext';

export default function Error() {
    const {error} = useContext(ErrorContext);

    if(error){
        return (
            <div className="error-box">
                <p>{error.join('\n')}</p>
            </div>
        );
    }
}
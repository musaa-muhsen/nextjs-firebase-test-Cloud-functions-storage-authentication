import  {useEffect} from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({file, setFile, userName}) => {

    const {url,progress} = useStorage(file, userName);
    //console.log(url,progress);

    useEffect(() => {
        if (url) {
        setFile(null);
        }
    }, [url, setFile])

    return (
        <div className="progressBar" style={{width: progress + '%'}}></div>
    )
}

export default ProgressBar;

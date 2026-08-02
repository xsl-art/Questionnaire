import { getQuestionService } from '@/api';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';

export const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  /*const [questionData, setQuestionData] = useState<ResDataType>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = getQuestionService(id);
    setQuestionData(data);
    setLoading(false);
  }, [id]); */
  const load = async () => {
    const data = await getQuestionService(id);
    return data;
  };

  const { loading, data, error } = useRequest(load);

  return { data, loading, error };
};

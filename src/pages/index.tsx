import styles from './index.less';
import { useHistory } from 'umi';
import Header from '../component/Header';

interface IProps {
  children?: React.ReactNode;
}

export default function IndexPage(props: IProps) {
  const history = useHistory();

  return (
    <div>
      <Header />
      <div style={{ minHeight: '80vh' }}>{props?.children}</div>
    </div>
  );
}

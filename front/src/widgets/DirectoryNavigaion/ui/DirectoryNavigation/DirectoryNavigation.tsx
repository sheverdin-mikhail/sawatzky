import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getDirectoryNavigationPage } from 'widgets/DirectoryNavigaion/model/slice/directoryNavigationSlice';
import { DirectoryNavigationLinks } from '../DirectoryNavigationLinks/DirectoryNavigationLinks';

interface DirectoryNavigationProps {
	className?: string;
}

export const DirectoryNavigation: React.FC<DirectoryNavigationProps> = (props) => {
  const { className } = props;

  const links = useSelector(getDirectoryNavigationPage.selectAll);

  return (
    <div className={classNames('', {}, [className])}>
      <DirectoryNavigationLinks links={links} />
    </div>
  );
};

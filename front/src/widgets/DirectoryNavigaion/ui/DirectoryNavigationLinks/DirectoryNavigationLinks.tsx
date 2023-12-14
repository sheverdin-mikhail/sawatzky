import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { userIsSawatzky } from 'entities/User';
import cls from './DirectoryNavigationLinks.module.scss';
import { DirectoryLinkType } from '../../model/type/directoryNavigation';
import { DirectoryNavigationLinkItem } from '../DirectoryNavigationLinkItem/DirectoryNavigationLinkItem';

interface DirectoryNavigationLinksProps {
  className?: string;
  links?: DirectoryLinkType[];
}

export const DirectoryNavigationLinks: React.FC<DirectoryNavigationLinksProps> = (props) => {
  const { className, links } = props;
  const isSawatzky = useSelector(userIsSawatzky);

  return (
    <div className={classNames(cls.directoryNavigationLinks, {}, [className])}>
      {
        links && links.map((link) => {
          if (link.sawatzkyOnly) {
            if (isSawatzky) {
              return (
                <DirectoryNavigationLinkItem
                  className={cls.link}
                  link={link}
                  key={`directoryNavLink_${link.path}`}
                />
              );
            }
            return null;
          }
          return (
            <DirectoryNavigationLinkItem
              className={cls.link}
              link={link}
              key={`directoryNavLink_${link.path}`}
            />
          );
        })
      }
    </div>
  );
};

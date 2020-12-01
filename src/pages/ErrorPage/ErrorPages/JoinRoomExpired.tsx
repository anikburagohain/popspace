import React from 'react';
import { GenericErrorPage } from './GenericErrorPage';
import { RouteNames } from '../../../constants/RouteNames';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinkBrokenImg from '../images/Link_Broken.png';

interface IJoinRoomExpiredProps {
  errorMsg?: string;
}

export const JoinRoomExpired: React.FC<IJoinRoomExpiredProps> = (props) => {
  const { errorMsg } = props;
  const history = useHistory();
  const { t } = useTranslation();

  const onButtonClick = () => {
    history.push(RouteNames.ROOT);
  };

  return (
    <GenericErrorPage
      buttonText={t('errorPages.takeMeHomeBtn')}
      onClick={onButtonClick}
      quoteText={t('errorPages.joinRoomExpired.quoteText')}
      title={t('errorPages.joinRoomExpired.title')}
      body={t('errorPages.joinRoomExpired.body')}
      errorMessage={errorMsg}
      imgSrc={LinkBrokenImg}
      imgAltText={t('errorPages.joinRoomExpired.altImgText')}
    />
  );
};

import { MeetingTemplateName, templateMetadata } from '@src/constants/MeetingTypeMetadata';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@material-ui/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
export interface IMeetingTemplatePickerProps {
  onSelect: (templateName: MeetingTemplateName) => void;
  selected?: MeetingTemplateName | null;
  className?: string;
}

export const MeetingTemplatePicker: React.FC<IMeetingTemplatePickerProps> = ({ onSelect, selected, className }) => {
  return (
    <Box mt={2}>
      <Grid container spacing={2} style={{ width: '100%' }} className={className}>
        {Object.values(MeetingTemplateName).map((templateName) => (
          <Grid item key={templateName} xs={12} sm={6} md={6} lg={4}>
            <MeetingTemplateCard
              templateName={templateName}
              loading={selected === templateName}
              onClick={() => onSelect(templateName)}
              // all cards disable when one has been selected
              disabled={!!selected}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const MeetingTemplateCard: React.FC<{
  templateName: MeetingTemplateName;
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}> = ({ templateName, onClick, loading, disabled }) => {
  const { t } = useTranslation();

  return (
    <Card elevation={0}>
      <CardActionArea
        disabled={disabled}
        onClick={onClick}
        disableRipple
        disableTouchRipple
        style={{ opacity: loading ? 0.3 : 1 }}
        data-test-id={`meetingTemplate-${templateName}`}
      >
        <CardMedia style={{ position: 'relative' }}>
          <img
            src={templateMetadata[templateName].image}
            alt={t(`${templateMetadata[templateName].i18nKey}.imgAlt`)}
            style={{ width: '100%', paddingLeft: 5, paddingRight: 5, paddingTop: 5 }}
          />
          {loading && (
            <Box position="absolute" top="0" width="100%" height="100%" display="flex">
              <CircularProgress style={{ margin: 'auto' }} size="48px" />
            </Box>
          )}
        </CardMedia>
        <CardContent>
          <Box mb={1}>
            <Typography variant="h3">{t(`${templateMetadata[templateName].i18nKey}.title`)}</Typography>
          </Box>
          <Typography variant="body1">{t(`${templateMetadata[templateName].i18nKey}.description`)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

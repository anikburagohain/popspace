import { TFunction } from 'i18next';
import { WidgetType } from '../../../roomState/types/widgets';
import { isSmallScreen } from '../../../utils/environment';
import { parseYoutubeLink } from '../../../utils/youtube';
import { QuickAction, QuickActionKind } from '../types';

export function youtubeQuickActions(prompt: string, t: TFunction): QuickAction[] {
  // empty default actions are only on mobile right now
  if (!prompt && isSmallScreen()) {
    // this accessory shows a default option in the empty state
    return [
      {
        kind: QuickActionKind.AddAccessory,
        icon: WidgetType.YouTube,
        accessoryType: WidgetType.YouTube,
        displayName: t('widgets.youtube.quickActionTitle'),
        accessoryData: {
          videoId: null,
          mediaState: {
            playStartedTimestampUTC: null,
          },
        },
        confidence: 5,
      },
    ];
  } else {
    const parsed = parseYoutubeLink(prompt);

    if (parsed) {
      return [
        {
          kind: QuickActionKind.AddAccessory,
          icon: WidgetType.YouTube,
          accessoryType: WidgetType.YouTube,
          displayName: t('widgets.youtube.quickActionTitle'),
          accessoryData: {
            videoId: parsed.videoId,
            mediaState: {
              timestamp: parsed.timestamp || parsed.start || 0,
              isPlaying: true,
              playStartedTimestampUTC: new Date().toUTCString(),
            },
          },
          confidence: 10,
        },
      ];
    }
  }

  return [];
}

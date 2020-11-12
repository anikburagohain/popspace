import React from 'react';
import { render } from '@testing-library/react';
import LocalVideoPreview from './LocalVideoPreview';
import { useNamedPublication } from '../../hooks/useNamedPublication/useNamedPublication';
import useTrack from '../../hooks/useTrack/useTrack';
import { LocalTrackPublication, RemoteTrackPublication } from 'twilio-video';

jest.mock('../../hooks/useNamedPublication/useNamedPublication');
jest.mock('../../hooks/useTrack/useTrack');
jest.mock('../../hooks/useLocalParticipant/useLocalParticipant');
jest.mock('../../hooks/useSpatialAudioVolume/useSpatialAudioVolume');

const mockUseNamedTrack = useNamedPublication as jest.Mock<LocalTrackPublication | RemoteTrackPublication | null>;
const mockUseTrack = useTrack as jest.Mock<any>;

describe('the LocalVideoPreview component', () => {
  it('it should render a VideoTrack component when there is a "camera" track', () => {
    mockUseNamedTrack.mockReturnValue({} as LocalTrackPublication);
    mockUseTrack.mockReturnValue({ name: 'camera', kind: 'video', attach: jest.fn(), detach: jest.fn() });
    const { container } = render(<LocalVideoPreview />);
    expect(container.firstChild).toEqual(expect.any(window.HTMLVideoElement));
  });

  it('should render null when there are no "camera" tracks', () => {
    mockUseNamedTrack.mockReturnValue(null);
    const { container } = render(<LocalVideoPreview />);
    expect(container.firstChild).toEqual(null);
  });
});

import { formatTime } from "./formatTime";

const secondsFromTimeString = (timeString) => {
    const parts = timeString.split(':').map(Number);

    if (parts.length === 3) {            // H:MM:SS
        const [h, m, s] = parts;
        return h * 3600 + m * 60 + s;
    } else if (parts.length === 2) {     // M:SS
        const [m, s] = parts;
        return m * 60 + s;
    }

    return 0;
};

/**
 * Turn a total‑seconds integer back into “H:MM:SS” or “M:SS”,
 * so that formatTime can do its thing.
 */
const timeStringFromSeconds = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) {
        return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${m}:${String(s).padStart(2, '0')}`;
};

export const groupBySection = (videos, isCourseAccessPage) => {
    const grouped = {};
    let videoIndex = 0;

    videos.forEach((video) => {
        const section = video.videoSection;

        if (!grouped[section]) {
            grouped[section] = [];
        }
        

        const length = formatTime(video.videoLength)

        const videoWithOptionalIndex = {
            ...video,
            length,
            ...(isCourseAccessPage && { videoIndex })
        };

        grouped[section].push(videoWithOptionalIndex);
        if (isCourseAccessPage) videoIndex++;
    });

    return Object.entries(grouped).map(([section, vids]) => {
        const totalSeconds = vids.reduce(
          (sum, vid) => sum + secondsFromTimeString(vid.videoLength),
          0
        );
    
        // convert back to H:MM:SS or M:SS, then humanize
        const sectionDuration = formatTime(
          timeStringFromSeconds(totalSeconds)
        );
    
        return {
          section,
          videos: vids,
          sectionDuration,
        };
      });
};

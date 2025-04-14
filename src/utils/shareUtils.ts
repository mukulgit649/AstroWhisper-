
interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const shareReading = async (data: ShareData) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return { success: true };
    } catch (error) {
      console.error('Error sharing:', error);
      return { success: false, error };
    }
  }
  
  // Fallback to clipboard if Web Share API is not available
  try {
    const shareText = `${data.title}\n\n${data.text}\n${data.url || window.location.href}`;
    await navigator.clipboard.writeText(shareText);
    return { success: true, method: 'clipboard' };
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return { success: false, error };
  }
};

export const saveReading = (readingData: any) => {
  try {
    const savedReadings = JSON.parse(localStorage.getItem('saved_readings') || '[]');
    savedReadings.push({
      ...readingData,
      savedAt: new Date().toISOString()
    });
    localStorage.setItem('saved_readings', JSON.stringify(savedReadings));
    return { success: true };
  } catch (error) {
    console.error('Error saving reading:', error);
    return { success: false, error };
  }
};



interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const shareContent = async (data: ShareData) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return { success: true, method: 'native' };
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
  
  // Fallback to clipboard
  try {
    const shareText = `${data.title}\n\n${data.text}${data.url ? `\n\n${data.url}` : ''}`;
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
    const newReading = {
      ...readingData,
      id: Date.now(),
      savedAt: new Date().toISOString()
    };
    savedReadings.push(newReading);
    localStorage.setItem('saved_readings', JSON.stringify(savedReadings));
    return { success: true, reading: newReading };
  } catch (error) {
    console.error('Error saving reading:', error);
    return { success: false, error };
  }
};

export const getSavedReadings = () => {
  try {
    return JSON.parse(localStorage.getItem('saved_readings') || '[]');
  } catch {
    return [];
  }
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return '';
  }

  try {
    // Add time if not present
    const date = dateString.includes('T') 
      ? dateString 
      : `${dateString}T00:00:00`;

    const dateObj = new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  } catch {
    return '';
  }
};

import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import shortUrls from '@/app/data/short-urls.json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;
  
  // Type the shortUrls object properly
  const urls: Record<string, string> = shortUrls;
  
  // Check if the shortcode exists in our JSON
  const destinationUrl = urls[shortcode];
  
  if (!destinationUrl) {
    // Return 404 if shortcode not found
    return NextResponse.json(
      { error: 'Short URL not found' },
      { status: 404 }
    );
  }
  
  // Redirect to the destination URL
  redirect(destinationUrl);
}

import { NextRequest, NextResponse } from 'next/server'
import mail from '@sendgrid/mail' 

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {name, email, message, number} = body;

  mail.setApiKey(process.env.SENDGRID_API_KEY as string)
  
  const msg = {
    to: 'calebstevens@flomix.app', 
    from: 'calebstevens@flomix.app', 
    subject: body?.subject ?? 'New message from flomix contact page',
    text: message + '\n' + '\n' + '------' + '\n' + 'Name: ' + name + '\n' + 'Email: '+ email + '\n'+ 'Number: ' + number,
  }
  
  const [result] = await mail
    .send(msg)
    

  if (result.statusCode < 200 || result.statusCode >= 300 ) {
    return NextResponse.error()
  }

  return NextResponse.json({success: true, result}); 
  
} 
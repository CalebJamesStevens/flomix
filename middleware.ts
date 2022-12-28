import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();
